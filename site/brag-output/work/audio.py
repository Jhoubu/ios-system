import numpy as np, wave
SR=48000; DUR=23.0; N=int(SR*DUR)
t=np.arange(N)/SR
rng=np.random.default_rng(7)
def hz(m): return 440*2**((m-69)/12)
def env_adsr(n,a,r):
    e=np.ones(n); A=int(a*SR); R=int(r*SR)
    e[:A]=np.linspace(0,1,A)**2; e[-R:]*=np.linspace(1,0,R)**2; return e
def lp(x,fc):  # one-pole lowpass, twice
    a=np.exp(-2*np.pi*fc/SR)
    for _ in range(2):
        y=np.empty_like(x); s=0.0
        # vectorised via lfilter-like recursion in chunks is overkill; use loop on float
        for i in range(len(x)): s=(1-a)*x[i]+a*s; y[i]=s
        x=y
    return x
music=np.zeros((N,2)); sfx=np.zeros((N,2))
def add(buf,start,sig,pan=0.0,gain=1.0):
    i=int(start*SR); j=min(N,i+len(sig)); sig=sig[:j-i]*gain
    buf[i:j,0]+=sig*np.sqrt((1-pan)/2); buf[i:j,1]+=sig*np.sqrt((1+pan)/2)
# acordes (MIDI) — Ré maior
chords=[(0.0,[50,62,66,69,73,76]),(3.75,[47,59,62,66,69,73]),(7.0,[43,55,59,62,66,69]),
        (11.7,[40,52,55,59,62,66]),(16.25,[45,57,62,64,69,71]),(19.6,[38,50,62,66,69,73,76])]
ends=[c[0] for c in chords[1:]]+[DUR]
# pad: harmônicos suaves, levemente desafinados, ataque lento
for (st,notes),en in zip(chords,ends):
    L=en-st+0.8; n=int(L*SR); tt=np.arange(n)/SR
    e=env_adsr(n,0.9 if st>0 else 1.6,1.0)
    for k,m in enumerate(notes[1:]):
        f=hz(m); s=np.zeros(n)
        for d in (-0.08,0.08):
            for h,amp in ((1,1),(2,.32),(3,.12),(4,.05)):
                s+=amp*np.sin(2*np.pi*f*h*(1+d/100*h)*tt+rng.uniform(0,6.28))
        s*= (1+0.08*np.sin(2*np.pi*0.23*tt+k))
        add(music,st,s*e,pan=(-0.5+k/len(notes)),gain=0.022)
    # baixo (raiz) a partir da entrada do celular
    f=hz(notes[0]); sb=np.sin(2*np.pi*f*tt)+0.25*np.sin(2*np.pi*2*f*tt)
    add(music,st,sb*e,gain=0.10 if st>=3.7 else 0.05)
# arpejo em colcheias (~104 bpm) do celular até o fim
step=60/104/2
tt=np.arange(int(1.2*SR))/SR
for (st,notes),en in zip(chords,ends):
    if st<3.7: continue
    tones=sorted(set(notes[2:]))[:5]; seq=[0,2,1,3,2,4,3,1]
    k=0; x=max(st,3.75)
    stop=min(en,21.2)
    while x<stop-0.01:
        m=tones[seq[k%8]%len(tones)]+12; f=hz(m)
        s=(np.sin(2*np.pi*f*tt)+0.3*np.sin(2*np.pi*2*f*tt)*np.exp(-tt*30))*np.exp(-tt*7)*np.minimum(1,tt*400)
        acc=1.0 if k%4==0 else 0.7
        add(music,x,s,pan=0.35*np.sin(k*1.3),gain=0.05*acc*min(1,(x-3.75)/1.5+0.3))
        k+=1; x+=step
# sino final
for m,dl in ((74,0.0),(78,0.09),(81,0.18),(86,0.3)):
    n=int(3.2*SR); tt2=np.arange(n)/SR; f=hz(m)
    s=(np.sin(2*np.pi*f*tt2)+0.4*np.sin(2*np.pi*f*2.76*tt2)*np.exp(-tt2*6))*np.exp(-tt2*1.4)*np.minimum(1,tt2*300)
    add(music,19.6+dl,s,pan=(m-80)/14,gain=0.05)
# sfx: toques afinados, whooshes, envio
taps=[8.0,9.55,10.35,12.35,13.05,15.85]
tt=np.arange(int(0.25*SR))/SR
for i,x in enumerate(taps):
    f=hz([86,90,93,86,90,93][i])
    s=np.sin(2*np.pi*f*tt)*np.exp(-tt*38)*np.minimum(1,tt*2000)+0.25*np.sin(2*np.pi*f*0.5*tt)*np.exp(-tt*25)
    add(sfx,x-0.01,s,pan=0.15,gain=0.10)
for x in (3.55,6.85,11.55,16.1,19.35):
    n=int(0.7*SR); tt3=np.arange(n)/SR
    noise=rng.standard_normal(n); sw=np.sin(np.pi*tt3/0.7)**2
    s=lp(noise,1800)*sw
    add(sfx,x,s,pan=-0.2,gain=0.09)
for m,dl in ((81,0),(86,0.07)):
    s=np.sin(2*np.pi*hz(m)*tt)*np.exp(-tt*22)*np.minimum(1,tt*1500)
    add(sfx,17.75+dl,s,pan=0.2,gain=0.09)
for i in range(16):   # digitação, bem no fundo
    x=16.65+i*0.056; tt4=np.arange(int(0.02*SR))/SR
    s=rng.standard_normal(len(tt4))*np.exp(-tt4*400)
    add(sfx,x,lp(s,3000),pan=0.1,gain=0.025)
mix=music+sfx*0.9
# reverb: mesma sala para música e efeitos
L=int(2.4*SR); tir=np.arange(L)/SR
ir=np.stack([rng.standard_normal(L)*np.exp(-tir*2.6) for _ in range(2)],1)
ir[:int(0.012*SR)]=0
def conv(x,h):
    n=1<<int(np.ceil(np.log2(len(x)+len(h))))
    return np.fft.irfft(np.fft.rfft(x,n)*np.fft.rfft(h,n),n)[:len(x)]
wet=np.stack([conv(mix[:,c],ir[:,c]) for c in range(2)],1)
wet*=0.28/np.max(np.abs(wet))*np.max(np.abs(mix))
out=mix+wet
# fades + limiter suave
out*=np.minimum(1,t/0.25)[:,None]
out*=np.clip((DUR-t)/1.4,0,1)[:,None]**1.5
out=np.tanh(out/np.max(np.abs(out))*1.3)
out*=0.89/np.max(np.abs(out))
w=wave.open('audio.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype('<i2').tobytes()); w.close()
print('ok', out.shape)

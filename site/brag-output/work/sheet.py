import sys,glob,os
from PIL import Image, ImageDraw
files=sorted(glob.glob((sys.argv[1] if len(sys.argv)>1 else 'stills')+'/*.jpg'),key=lambda f:float(os.path.basename(f)[1:-4]))
cols=6; w,h=270,480
rows=(len(files)+cols-1)//cols
sheet=Image.new('RGB',(cols*w,rows*(h+24)),'white')
d=ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    im=Image.open(f).resize((w,h))
    x,y=(i%cols)*w,(i//cols)*(h+24)
    sheet.paste(im,(x,y+24)); d.text((x+6,y+5),os.path.basename(f),fill='black')
sheet.save('sheet.jpg',quality=85)

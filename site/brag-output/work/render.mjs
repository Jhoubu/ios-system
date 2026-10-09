import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const [mode, ...rest] = process.argv.slice(2);
const FPS = 30, DUR = 23.0;
const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-web-security', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => console.log('[err]', e.message));
await page.goto('http://127.0.0.1:8765/brag-output/work/comp.html', { waitUntil: 'load', timeout: 60000 });
console.log('prepare', await page.evaluate(() => window.prepare()));
if (mode === 'stills') {
  const times = rest.map(Number).sort((a, b) => a - b);
  for (const t of times) {
    // avança em passos de quadro até t para disparar os eventos na ordem
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: `${process.env.STILLS||'stills'}/t${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 85 });
  }
} else {
  const ff = spawn(process.env.FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', 'video.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round(DUR * FPS);
  for (let i = 0; i < N; i++) {
    const t = i / FPS;
    await page.evaluate((t) => window.seek(t), t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log('frame', i, '/', N);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
}
await browser.close();

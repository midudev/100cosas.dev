import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';

const OUTPUT_PATH = 'public/og-image.png';

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 1200px;
      height: 630px;
      display: flex;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      position: relative;
      overflow: hidden;
    }
    
    /* Grid pattern overlay */
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
    }
    
    /* Glowing orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
    }
    
    .orb-1 {
      width: 400px;
      height: 400px;
      background: rgba(56, 189, 248, 0.15);
      top: -100px;
      right: -100px;
    }
    
    .orb-2 {
      width: 300px;
      height: 300px;
      background: rgba(168, 85, 247, 0.1);
      bottom: -50px;
      left: -50px;
    }
    
    .content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      width: 100%;
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 30px;
      width: fit-content;
    }
    
    .title {
      font-size: 72px;
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1.1;
      margin-bottom: 20px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    .title span {
      background: linear-gradient(90deg, #38bdf8, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      font-size: 28px;
      color: #94a3b8;
      max-width: 700px;
      line-height: 1.4;
    }
    
    .footer {
      position: absolute;
      bottom: 40px;
      left: 80px;
      right: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .domain {
      font-size: 24px;
      font-weight: 700;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    
    .author {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #64748b;
      font-size: 18px;
    }
    
    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #38bdf8, #a855f7);
    }
    
    /* Code decoration */
    .code-block {
      position: absolute;
      right: 60px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 12px;
      padding: 24px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 14px;
      color: #94a3b8;
      width: 320px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    .code-block .line {
      margin: 4px 0;
    }
    
    .code-block .keyword { color: #c084fc; }
    .code-block .function { color: #38bdf8; }
    .code-block .string { color: #4ade80; }
    .code-block .number { color: #f472b6; }
    .code-block .comment { color: #64748b; }
  </style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  
  <div class="content">
    <div class="badge">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
      100 Consejos de Programación
    </div>
    
    <h1 class="title">
      Mejora tu código,<br>
      <span>un consejo a la vez.</span>
    </h1>
    
    <p class="subtitle">
      100 cosas que todo programador debería saber. Lee, aprende y marca tu progreso.
    </p>
  </div>
  
  <div class="code-block">
    <div class="line"><span class="comment">// Clean code tip #42</span></div>
    <div class="line"><span class="keyword">const</span> <span class="function">write</span> = (<span class="string">code</span>) => {</div>
    <div class="line">  <span class="keyword">return</span> code</div>
    <div class="line">    .<span class="function">readable</span>()</div>
    <div class="line">    .<span class="function">maintainable</span>()</div>
    <div class="line">    .<span class="function">testable</span>();</div>
    <div class="line">};</div>
  </div>
  
  <div class="footer">
    <span class="domain">100cosas.dev</span>
    <div class="author">
      <div class="author-avatar"></div>
      @midudev
    </div>
  </div>
</body>
</html>
`;

async function generateOGImage() {
  console.log('🎨 Generating OG image...');
  
  await fs.ensureDir(path.dirname(OUTPUT_PATH));
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  await page.screenshot({
    path: OUTPUT_PATH,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  
  await browser.close();
  
  console.log(`✓ OG image generated: ${OUTPUT_PATH}`);
}

generateOGImage().catch(console.error);

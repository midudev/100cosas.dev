import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import Epub from 'epub-gen';
import puppeteer from 'puppeteer';

const LANGUAGES = ['es', 'en'];
const CONTENT_PATH = 'src/content/tips';
const AUTHORS_PATH = 'src/content/authors';
const OUTPUT_DIR = 'dist/exports';

async function getAuthor(authorId) {
  try {
    const authorData = await fs.readJson(path.join(AUTHORS_PATH, `${authorId}.json`));
    return authorData;
  } catch (error) {
    console.warn(`Author ${authorId} not found`);
    return { name: authorId };
  }
}

async function imageToBase64(filePath) {
  try {
    const bitmap = await fs.readFile(filePath);
    const extension = path.extname(filePath).replace('.', '');
    const base64 = Buffer.from(bitmap).toString('base64');
    return `data:image/${extension === 'jpg' ? 'jpeg' : extension};base64,${base64}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${filePath}`, error);
    return null;
  }
}

async function generateFormats() {
  await fs.ensureDir(OUTPUT_DIR);

  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: [
      'javascript', 'typescript', 'jsx', 'tsx',
      'html', 'css', 'json', 'bash', 'sh',
      'python', 'rust', 'go', 'php', 'ruby',
      'sql', 'yaml', 'xml', 'markdown', 'astro',
      'svelte', 'c'
    ]
  });

  const loadedLangs = new Set(highlighter.getLoadedLanguages());

  marked.use({
    async: true,
    renderer: {
      code({ text, lang }) {
        const language = lang && loadedLangs.has(lang) ? lang : 'text';
        return highlighter.codeToHtml(text, {
          lang: language,
          theme: 'github-light'
        });
      }
    }
  });

  for (const lang of LANGUAGES) {
    console.log(`Processing language: ${lang}`);
    
    // Find all tips for this language
    const langDir = path.join(CONTENT_PATH, lang);
    let files = await glob(`${langDir}/*.md`);
    
    // If no files in lang directory, check root for 'es'
    if (files.length === 0 && lang === 'es') {
      files = await glob(`${CONTENT_PATH}/*.md`);
    }
    
    const tips = [];
    for (const file of files) {
      if ((await fs.stat(file)).isDirectory()) continue;
      const fileContent = await fs.readFile(file, 'utf-8');
      const { data, content: body } = matter(fileContent);
      const author = await getAuthor(data.author);
      
      const html = await marked.parse(body);
      const publicPath = path.join(process.cwd(), 'public');
      
      // Fix image paths: replace absolute paths starting with / with base64 data URLs
      let fixedHtml = html;
      const imgMatches = html.matchAll(/src="\/([^"]+)"/g);
      for (const match of imgMatches) {
        const relativePath = match[1];
        const absolutePath = path.join(publicPath, relativePath);
        const base64 = await imageToBase64(absolutePath);
        if (base64) {
          fixedHtml = fixedHtml.replace(match[0], `src="${base64}"`);
        }
      }

      tips.push({
        id: data.id,
        title: data.title,
        author: author.name,
        category: data.category,
        content: body,
        html: fixedHtml,
        slug: path.basename(file, '.md')
      });
    }

    // Sort tips by ID
    tips.sort((a, b) => a.id.localeCompare(b.id));

    if (tips.length === 0) {
      console.warn(`No tips found for language: ${lang}`);
      continue;
    }

    // 1. Generate EPUB
    const epubOptions = {
      title: lang === 'es' ? '100 Consejos Dev' : '100 Dev Tips',
      author: '100cosas.dev',
      publisher: '100cosas.dev',
      content: tips.map(tip => ({
        title: tip.title,
        data: `<h1>${tip.title}</h1><p><em>Por ${tip.author} - ${tip.category}</em></p>${tip.html}`
      }))
    };

    const epubPath = path.join(OUTPUT_DIR, `100cosas-${lang}.epub`);
    try {
      await new Epub(epubOptions, epubPath).promise;
      console.log(`✓ EPUB generated: ${epubPath}`);
    } catch (err) {
      console.error(`✗ Error generating EPUB for ${lang}:`, err);
    }

    // 2. Generate PDF using Puppeteer
    const pdfPath = path.join(OUTPUT_DIR, `100cosas-${lang}.pdf`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
          h1 { color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 40px; }
          h2 { color: #444; margin-top: 30px; }
          .tip-meta { color: #666; font-style: italic; margin-bottom: 20px; }
          .page-break { page-break-after: always; }
          pre { padding: 15px; border-radius: 5px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 14px; border: 1px solid #eee; }
          code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
          :not(pre) > code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-size: 0.9em; }
          blockquote { border-left: 4px solid #ddd; padding-left: 20px; margin-left: 0; color: #666; font-style: italic; }
          .tip { break-before: page; }
          .title-page { break-after: page; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
          img { max-width: 100%; height: auto; display: block; margin: 1rem auto; }
          @media print {
            .tip:first-of-type { break-before: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="title-page">
          <h1 style="border: none; font-size: 48px;">${lang === 'es' ? '100 Consejos Dev' : '100 Dev Tips'}</h1>
          <p style="font-size: 24px;">${lang === 'es' ? 'Una colección de sabiduría para desarrolladores' : 'A collection of wisdom for developers'}</p>
        </div>
        ${tips.map(tip => `
          <div class="tip">
            <h1>${tip.title}</h1>
            <div class="tip-meta">Por ${tip.author} - ${tip.category}</div>
            ${tip.html}
          </div>
        `).join('')}
      </body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });

    await browser.close();
    console.log(`✓ PDF generated: ${pdfPath}`);
  }
}

generateFormats().catch(console.error);

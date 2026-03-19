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

    const introHtml = lang === 'es'
      ? `
        <h2>¿Por qué este libro?</h2>
        <p>Este libro nace de la necesidad de recopilar y modernizar consejos fundamentales para programadores. Está inspirado en la obra colectiva <strong>"97 Things Every Programmer Should Know"</strong>, actualizando su espíritu con las lecciones más relevantes del desarrollo moderno.</p>
        <p>El objetivo es ofrecer una hoja de ruta de conocimientos que trascienden lenguajes de programación y frameworks específicos. Consejos que serán igual de válidos hoy que dentro de diez años.</p>

        <h2>¿Qué encontrarás aquí?</h2>
        <p>Esto no es solo una lista de consejos; es una herramienta para:</p>
        <ul>
          <li><strong>Reflexionar</strong> sobre la práctica diaria de la programación.</li>
          <li><strong>Descubrir</strong> principios de diseño y arquitectura que a menudo se pasan por alto.</li>
          <li><strong>Interiorizar</strong> conceptos que te harán mejor profesional, un consejo a la vez.</li>
        </ul>

        <h2>Programación en la era de la IA</h2>
        <p>Vivimos en una época donde la Inteligencia Artificial puede generar código en segundos. Sin embargo, esto hace que <strong>tener unas bases sólidas sea más importante que nunca</strong>.</p>
        <blockquote><p><em>¿Por qué? Porque la IA es una herramienta, no un sustituto del criterio profesional.</em></p></blockquote>
        <p>Entender el "por qué" detrás del código, saber cuándo una solución es escalable, detectar olores en el código y aplicar principios de diseño robustos es lo que permite a un programador guiar a la IA, en lugar de ser guiado por ella.</p>
        <p><strong>Las bases son el cimiento que te permite discernir si lo que la IA genera es realmente la mejor solución para tu problema.</strong></p>
      `
      : `
        <h2>Why this book?</h2>
        <p>This book was born out of the need to collect and modernize fundamental advice for programmers. It is inspired by the collective work <strong>"97 Things Every Programmer Should Know"</strong>, updating its spirit with the most relevant lessons from modern development.</p>
        <p>The goal is to offer a roadmap of knowledge that transcends specific programming languages and frameworks. Tips that will be just as valid today as they will be in ten years.</p>

        <h2>What will you find here?</h2>
        <p>This is not just a list of advice; it is a tool to:</p>
        <ul>
          <li><strong>Reflect</strong> on the daily practice of programming.</li>
          <li><strong>Discover</strong> design and architecture principles that are often overlooked.</li>
          <li><strong>Internalize</strong> concepts that will make you a better professional, one tip at a time.</li>
        </ul>

        <h2>Programming in the AI era</h2>
        <p>We live in an era where Artificial Intelligence can generate code in seconds. However, this makes <strong>having solid foundations more important than ever</strong>.</p>
        <blockquote><p><em>Why? Because AI is a tool, not a substitute for professional judgment.</em></p></blockquote>
        <p>Understanding the "why" behind the code, knowing when a solution is scalable, detecting code smells, and applying robust design principles is what allows a programmer to guide the AI, rather than being guided by it.</p>
        <p><strong>Foundations are the basis that allow you to discern if what the AI generates is really the best solution for your problem.</strong></p>
      `;

    const introTitle = lang === 'es' ? 'Introducción' : 'Introduction';

    // 1. Generate EPUB
    const epubOptions = {
      title: lang === 'es' ? '100 cosas que todo programador debería saber' : '100 things every programmer should know',
      author: '100cosas.dev',
      publisher: '100cosas.dev',
      content: [
        {
          title: introTitle,
          data: `<h1>${introTitle}</h1>${introHtml}`
        },
        ...tips.map(tip => ({
          title: tip.title,
          data: `<h1>${tip.title}</h1><p><em>${lang === 'es' ? 'Por' : 'By'} ${tip.author} - ${tip.category}</em></p>${tip.html}`
        }))
      ]
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
          <h1 style="border: none; font-size: 42px;">${lang === 'es' ? '100 cosas que todo programador debería saber' : '100 things every programmer should know'}</h1>
          <p style="font-size: 22px; color: #666;">${lang === 'es' ? 'Mejora en programación, un consejo a la vez' : 'Improve your programming, one tip at a time'}</p>
        </div>
        <div class="tip" style="break-before: page;">
          <h1 style="font-size: 32px;">${lang === 'es' ? 'Introducción' : 'Introduction'}</h1>
          ${introHtml}
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

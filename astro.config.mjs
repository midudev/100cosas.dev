// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { codeLangBadge } from './src/utils/code-lang-badge.mjs';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://100cosas.dev',
  prefetch: false,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
          pt: 'pt-BR',
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const pathname = new URL(page).pathname;

        if (pathname.includes('/404')) return false;
        if (pathname === '/infografias' || pathname === '/infografias/') return false;

        // Exclude legacy duplicated routes from sitemap.
        if (
          pathname === '/es' ||
          pathname === '/es/' ||
          pathname.startsWith('/es/consejo/') ||
          pathname.startsWith('/es/autor/') ||
          pathname === '/es/sobre-el-proyecto' ||
          pathname.startsWith('/en/consejo/') ||
          pathname === '/en/sobre-el-proyecto' ||
          pathname.startsWith('/pt/dica/') ||
          pathname.startsWith('/pt/autor/') ||
          pathname === '/pt/sobre-o-projeto'
        ) {
          return false;
        }

        return true;
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'tokyo-night',
      },
      defaultColor: false,
      transformers: [codeLangBadge()],
    },
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: cloudflare()
});

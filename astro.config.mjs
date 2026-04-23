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
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const pathname = new URL(page).pathname;

        if (pathname.includes('/404')) return false;

        // Exclude legacy duplicated routes from sitemap.
        if (
          pathname === '/es' ||
          pathname === '/es/' ||
          pathname.startsWith('/es/consejo/') ||
          pathname.startsWith('/es/autor/') ||
          pathname === '/es/sobre-el-proyecto' ||
          pathname.startsWith('/en/consejo/') ||
          pathname === '/en/sobre-el-proyecto'
        ) {
          return false;
        }

        return true;
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
      transformers: [codeLangBadge()],
    },
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: cloudflare()
});
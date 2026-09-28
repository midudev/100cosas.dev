// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { codeLangBadge } from './src/utils/code-lang-badge.mjs';
import { seoRedirects } from './src/data/seo-redirects.mjs';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://100cosas.dev',
  trailingSlash: 'always',
  // Astro 7 aplica por defecto reglas de espacios tipo JSX ('jsx'), que eliminan
  // los saltos de línea entre texto y elementos inline ("iniciativa de@midudev").
  // `true` comprime el HTML sin perder los espacios que afectan al render.
  compressHTML: true,
  // Prefetch en hover: la navegación con ClientRouter (view transitions) carga la
  // página siguiente antes del clic, haciendo las transiciones instantáneas.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },

  // Serif de lectura para títulos y cuerpo. Astro la descarga en build,
  // la sirve desde el propio dominio y genera fallbacks con métricas ajustadas (sin CLS).
  // Sin eje `opsz`: con él el archivo latin pasa de ~58 KB a ~130 KB.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      weights: ['400 600'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],

  // 301s for legacy locale prefixes, broken hreflang URLs, and renamed tips.
  redirects: {
    ...seoRedirects,
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

        // Non-indexable or utility routes
        if (pathname.includes('/404')) return false;
        if (pathname === '/infografias' || pathname === '/infografias/') return false;
        if (pathname.endsWith('search-index.json')) return false;
        if (pathname.endsWith('.json') || pathname.endsWith('.xml')) return false;

        // Legacy locale-prefixed Spanish routes (should only exist as redirects)
        if (pathname === '/es' || pathname === '/es/' || pathname.startsWith('/es/')) {
          return false;
        }

        // Legacy English paths
        if (pathname.startsWith('/en/consejo/')) return false;
        if (
          pathname === '/en/sobre-el-proyecto' ||
          pathname === '/en/sobre-el-proyecto/'
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
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: cloudflare(),
});

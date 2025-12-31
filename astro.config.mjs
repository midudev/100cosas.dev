// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://100cosas.dev',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import expressiveCode from 'astro-expressive-code'
import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'
import partytown from "@astrojs/partytown";

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
    build: {
      chunkSizeWarningLimit: 1200,
    },
  },

  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },

  integrations: [sitemap(
    {
      filter: (page) =>
        page !== 'https://simp1e-lab.com/privacy-policy/' &&
        page !== 'https://simp1e-lab.com/about/',
    } 
  ), robotsTxt(), react(), expressiveCode(), mdx(), partytown(
    {
      config: {
       forward: ["dataLayer.push"],
      },
    }
  )],

  adapter: netlify(),
})
// @ts-check
import { defineConfig } from 'astro/config'

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://lp-dwca.lmerkel.fr',
  base: '/',
  adapter: node({
    mode: 'standalone'
  })
})

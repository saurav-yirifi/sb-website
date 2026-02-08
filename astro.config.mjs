import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sauravbhatia.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

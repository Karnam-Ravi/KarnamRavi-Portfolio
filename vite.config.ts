import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Asset URLs depend on the path the host serves the site from.
 *
 * Vercel (and any root-domain host) serves from /, so that is the default and
 * what `dev` has always used. GitHub Pages serves this project from
 * /KarnamRavi-Portfolio/ instead, so the Pages workflow sets DEPLOY_TARGET=pages
 * and only then is that prefix baked into the build. Getting this wrong is
 * invisible until deploy: every asset 404s and you get a blank page.
 */
export default defineConfig(({ command, isPreview }) => {
  const isBuild = command === 'build' || isPreview;
  const forPages = process.env.DEPLOY_TARGET === 'pages';

  return {
    plugins: [react()],
    base: isBuild && forPages ? '/KarnamRavi-Portfolio/' : '/',
  };
});

// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');
import proxy from 'koa-proxies';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  // open: '/editor-emendas',
  watch: !hmr,
  // appIndex: 'index.html',
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  port: 8000,
  middleware: [
    // proxy('/api/', {
    //   target: 'http://localhost:8080/editor-emendas',
    // }),
    proxy('/api/', {
      target: 'https://www6ghml.senado.leg.br/',
      rewrite: path => path.replace(/^\/api/, '/editor-emendas/api'),
      logs: true,
      changeOrigin: true
    }),
  ],

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
  ],

  // See documentation for all available options
});

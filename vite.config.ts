import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueDevTools(),
    vue(),
    vueJsx(),

    // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'src/assets/styles/variables/_vuetify.scss',
      },
    }),
    Components({
      dirs: ['src/@core/components', 'src/components'],
      dts: true,
      resolvers: [
        componentName => {
          // Auto import `VueApexCharts`
          if (componentName === 'VueApexCharts')
            return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
        },
      ],
    }),

    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/math',
        'pinia',
        'vue-i18n',
      ],
      vueTemplate: true,

      // ℹ️ Disabled to avoid confusion & accidental usage
      ignore: ['useCookies', 'useStorage'],
    }),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png'],
      devOptions: {
        enabled: true, // Habilitar PWA en desarrollo para pruebas
      },
      manifest: {
        name: 'Materio - Vuetify Admin Template',
        short_name: 'Materio',
        description: 'Vuetify Vuejs Admin Template',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#9155FD',
        lang: 'es',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB máximo por archivo
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/assets/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/assets/styles/variables/_template.scss', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: [
      './src/**/*.vue',
    ],
  },
})

import path from 'path'
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',

  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ]
    }),
    eslintPlugin({
      cache: false
    })
  ],

  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },

    preprocessorOptions: {
      styl: {
        imports: [
          path.resolve(__dirname, './lib/style/index.styl')
        ]
      }
    }
  },

  server: {
    port: 8080,
    host: '0.0.0.0'
  },

  build: {
    assetsInlineLimit: 8192,
    lib: {
      entry: path.resolve(__dirname, './lib/index.tsx'),
      name: 'Lancet',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue'
      ],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        typescript({
          rootDir: path.resolve(__dirname, './lib'),
          declaration: true,
          declarationDir: path.resolve(__dirname, './dist'),
          exclude: path.resolve(__dirname, './node_modules/**'),
          allowSyntheticDefaultImports: true
        })
      ]
    }
  }
})

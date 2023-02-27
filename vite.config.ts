import { defineConfig } from 'vite'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  ...defineViteResolve(),
  // ...defineViteCSS(),
  ...defineVitePlugins([uni({ vueOptions: { reactivityTransform: true } })]),
})

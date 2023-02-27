import { defineConfig } from 'vite'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'
import uni from '@dcloudio/vite-plugin-uni'
import {
  attributifyToClass,
  defaultIgnoreNonValuedAttributes,
} from 'unplugin-attributify-to-class/vite'
import transformClass from 'unplugin-transform-class/vite'

export default defineConfig({
  ...defineViteResolve(),
  // ...defineViteCSS(),
  ...defineVitePlugins([
    uni({ vueOptions: { reactivityTransform: true } }),
    transformClass(),
    attributifyToClass({
      // open valueless attributify
      nonValuedAttribute: true,
      // ignore non-valued attributes
      ignoreNonValuedAttributes: [
        ...defaultIgnoreNonValuedAttributes,
        'my-prop',
        'is-top',
      ],
    }),
  ]),
})

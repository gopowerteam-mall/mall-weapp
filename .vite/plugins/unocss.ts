import unocss from 'unocss/vite'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
import presetWeapp from 'unocss-preset-weapp'

export default process.env.UNI_COMPILER !== 'nvue'
  ? unocss({
      presets: [presetWeapp()],
      extractors: [extractorPug(), extractorSplit],
      shortcuts: [['flex-center', 'flex justify-center items-center']],
      safelist: [
        ...Array.from({ length: 10 }, (_, i) => `space-x-${i + 1}`),
        ...Array.from({ length: 10 }, (_, i) => `space-y-${i + 1}`),
      ],
    })
  : undefined

import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    // presetAttributify(),
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: ['HarmonyOSHans-Regular'],
        mono: ['JetBrains Mono'],
      },
    }),
  ],
  cli: {
    entry: [
      {
        patterns: ['public/**/*.html'],
        outFile: 'public/css/uno.css',
      },
    ],
  },
})

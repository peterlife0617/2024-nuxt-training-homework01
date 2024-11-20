// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['@/assets/stylesheets/all.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/stylesheets/variables";`,
          // silent sass deprecations
          // https://github.com/twbs/bootstrap/issues/40962#issuecomment-2448214806
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
          // https://stackoverflow.com/a/79003101
          api: 'modern-compiler',
        },
      },
    },
  },

  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },
})

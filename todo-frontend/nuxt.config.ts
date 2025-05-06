// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api', // base URL for Laravel backend
    }
  }
})

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxthq/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],
  supabase: {
    redirect: true
  },
  colorMode: {
    preference: 'light',
    classSuffix: ''
  }
})

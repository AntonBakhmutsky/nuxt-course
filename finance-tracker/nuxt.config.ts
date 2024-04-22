export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxthq/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],
  supabase: {
    redirect: false
  },
  colorMode: {
    preference: 'light',
    classSuffix: ''
  }
})

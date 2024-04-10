<template>
  <div class="container mx-auto max-w-2xl">
    <AppHeader/>
    <main class="p-2">
      <slot/>
    </main>
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s - N\'Tano',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>

<style lang="sass">
body
  font-family: Roboto, sans-serif
</style>
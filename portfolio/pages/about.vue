<template>
  <div>
    This page about me.
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About Page',
  description: 'This is the main page',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'Main Page',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary'
})
</script>
<template>
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
</script>

<style lang="sass">
.page-enter-active,
.page-leave-active
  transition: all .4s

.page-enter-from,
.page-leave-active
  opacity: 0
  filter: grayscale(1)
</style>
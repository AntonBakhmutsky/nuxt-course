<template>
  <nav class="font-mono">
    <ul class="flex gap-x-4">
      <li>
        <NuxtLink to="/" class="link">Main</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="link">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/projects" class="link">Projects</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="sass" scoped>
.link
  @apply p-1 hover:bg-gray-200
</style>
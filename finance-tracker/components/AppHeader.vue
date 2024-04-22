<template>
  <header class="flex justify-between items-center pt-10">
    <NuxtLink to="/" class="text-xl font-bold">
      Finance Tracker
    </NuxtLink>
    <div class="flex items-center" @click="toggleColorMode">
        <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
        />
    </div>
  </header>
</template>

<script setup>
const colorMode = useColorMode()

const modes = [
  'dark',
  'light',
]

const modeIcons = {
  system: '🌓',
  light: '🌕',
  dark: '🌑'
}

const toggleColorMode = () => colorMode.preference === 'light' ? colorMode.preference = 'dark' : colorMode.preference = 'light'
</script>
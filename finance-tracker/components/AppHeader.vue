<template>
  <header class="flex justify-between items-center pt-10">
    <NuxtLink to="/" class="text-xl font-bold">
      <span @click="toggleColorMode">Finance Tracker</span>
    </NuxtLink>
    <div>
      <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="user">
        <UAvatar :src="url" alt="Avatar" />

        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user.email }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
    </div>
  </header>
</template>

<script setup>
import {useAvatarUrl} from "~/composables/useAvatarUrl.js";

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
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const {url} = useAvatarUrl()

const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    onClick: () => navigateTo('/settings/profile')
  }, {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    onClick: async () => {
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }]
]
</script>
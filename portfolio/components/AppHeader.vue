<template>
  <header class="flex justify-between items-center pt-5">
    <div class="flex items-center space-x-12">
      <div>
        <NuxtLink to="/" class="text-xl font-semibold p-2 hover:bg-gray-200">N'Tano</NuxtLink>
      </div>
      <Menu/>
    </div>
    <ClientOnly>
      <ColorModeSelector/>
    </ClientOnly>
  </header>
</template>
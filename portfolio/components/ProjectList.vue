<template>
  <p class="mb-10">Take a look at my GitHub projects!</p>
  <section v-if="pending">Loading...</section>
  <section v-else-if="error">Something went wrong...</section>
  <section v-else>
    <ul class="grid grid-cols-1 gap-4">
      <li
          class="border border-gray-200 rounded-sm p4 hover:bg-gray-100 font-mono p-4"
          v-for="repository in repos"
          :key="repository.id"
      >
        <a :href="repository.html_url" target="_blank">
          <div class="flex items-center justify-between text-sm">
            <div class="font-semibold">{{repository.name}}</div>
            <div>{{repository.stargazers_count}} ★</div>
          </div>
          <p class="text-sm">{{repository.description}}</p>
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const {error, pending, data} = await useFetch('https://api.github.com/users/piotr-jura-udemy/repos')

const repos = computed(() => data.value.filter(repo => repo.description).sort((a, b) => b.stargazers_count - a.stargazers_count))
</script>
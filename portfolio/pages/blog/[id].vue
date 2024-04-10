<template>
  <div>
    we are inside blog
  </div>
  <div>
    Post id is {{ route.params.id  }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
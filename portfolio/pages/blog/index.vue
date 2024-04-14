<template>
<div>
  All blog posts list
</div>
</template>

<script lang="ts" setup>
const result = await queryContent('/blog').find()
console.log(result)
</script>
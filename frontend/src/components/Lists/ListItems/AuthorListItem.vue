<script setup>
  const props = defineProps({
    field: { type: String, required: true },
    item: { type: Object, required: true}
  })
</script>

<template>
  <RouterLink
    v-if="field === 'author'"
    :to="`/authors/${item.author}`"
    class="list-link"
  >
    {{ item.author }}
  </RouterLink>
  <p v-else>{{ item[field] }}</p>
</template>
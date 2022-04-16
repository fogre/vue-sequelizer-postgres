<script setup>
  const props = defineProps({
    field: { type: String, required: true },
    item: { type: Object, required: true}
  })
</script>

<template>
  <p v-if="field === 'user'">{{ item.user.username }}</p>
  <p v-else>{{ item[field] }}</p>
</template>
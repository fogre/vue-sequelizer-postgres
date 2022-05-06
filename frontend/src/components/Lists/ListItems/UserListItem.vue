<script setup>
  const props = defineProps({
    field: { type: String, required: true },
    item: { type: Object, required: true}
  })
</script>

<template>
  <p v-if="field === 'averagelikes'">
    {{ props.item.likecount ? (props.item.likecount / props.item.blogcount) : '?' }}
  </p>
  <RouterLink
    v-else-if="field === 'username'"
    :to="`/users/${item.id}`"
    class="list-link"
  >
    {{ item.username }}
  </RouterLink>
  <p v-else>{{ item[field] }}</p>
</template>
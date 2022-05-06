<script setup>
  const props = defineProps({
    field: { type: String, required: true },
    item: { type: Object, required: true}
  })
  
  const dateOptions = {
    day: 'numeric',
    month: 'numeric'
  }
</script>

<template>
  <RouterLink
    v-if="field === 'user'"
    :to="`/users/${item.user.id}`"
    class="list-link"
  >
    {{ item.user.username }}
  </RouterLink>
  <RouterLink
    v-else-if="field === 'title'"
    :to="`/blogs/${item.id}`"
    class="list-link"
  >
    {{ item.title }}
  </RouterLink>
  <p v-else-if="field === 'createdAt'">
    {{ (new Date(item.createdAt).toLocaleDateString(undefined, dateOptions)) }}
  </p>
  <RouterLink
    v-else-if="field === 'author' && item.author"
    :to="'/'"
    class="list-link"
  >
    {{ item.author }}
  </RouterLink>
  <p v-else>{{ item[field] }}</p>
</template>
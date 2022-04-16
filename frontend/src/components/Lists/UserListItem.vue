<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    field: { type: String, required: true },
    item: { type: Object, required: true}
  })
  
  const blogLikes = computed(() =>
    props.item.blogLikes ? props.item.blogLikes : '0'
  )
  const averageLikes = computed(() =>
    props.item.averageLikes ? props.item.averageLikes.substring(0,4): '?'
  )
</script>

<template>
  <p v-if="field === 'averageLikes'">{{ averageLikes }}</p>
  <p v-else-if="field === 'blogLikes'">{{ blogLikes }}</p>
  <p v-else>{{ item[field] }}</p>
</template>
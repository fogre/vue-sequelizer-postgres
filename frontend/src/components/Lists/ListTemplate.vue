<script setup>
  import { computed } from 'vue'
  import BlogListItem from './ListItems/BlogListItem.vue'
  import UserListItem from './ListItems/UserListItem.vue'

  const props = defineProps({
    isLoading: { type: Boolean, required: true },
    sortedList: { type: Object, required: true },
    fields: { type: Array, required: true },
    cacheName: { type: [Array, String], required: true },
    gridColumns: { type: String, required: true }
  })

  //assign li child .list-item component based on the cacheName
  const listItemChildComponent = computed(() => {
    //check if cache is array or string. First index is the name of the type
    const cache = Array.isArray(props.cacheName) ? props.cacheName[0] : props.cacheName
    switch(cache) {
      case 'blogs': return BlogListItem
      default: return UserListItem
    }
  })
</script>

<template>
  <div>
    <p v-if="props.isLoading">Loading...</p>
    <ol v-else class="list-ol">
      <li
        v-for="item in props.sortedList.list"
        :key="item.id"
        class="list-grid-field list-grid-columns list-li"
        :style="{ gridTemplateColumns: props.gridColumns }"
      >
        <div
          v-for="field in props.fields"
          :key="field"
          class="list-item g-flex-centered"
        >
          <component
            :is="listItemChildComponent"
            :field="field"
            :item="item"
          />
        </div>
      </li>
    </ol>
  </div>
</template>
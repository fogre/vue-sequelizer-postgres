<script setup>
  import { useQuery } from "vue-query"
  import { apiGet } from "../../utils/apiService"
  import { useList } from '../../composables/useList'
  import { listSharedProps } from './listSharedProps'
  import ListLabels from './ListLabels.vue'
  import ListTemplate from './ListTemplate.vue'

  const props = defineProps(listSharedProps)

  //fetch data
  const { isLoading, isError, error, data } = useQuery(
    [props.cacheName, null], () => apiGet(props.resource)
  )
  //use list composable
 const {
    sortedList,
    handleSortList,
    gridTemplateColumns
  } = useList(data, props.cacheName, props.fields, props.gridColumns)
</script>

<template>
  <div class="toplist-wrapper">
    <ListLabels
      @sortList="handleSortList"
      :fields="fields"
      :fieldsAs="fieldsAs"
      :gridColumns="props.gridColumns"
    />
    <ListTemplate
      :isLoading="isLoading"
      :sortedList="sortedList"
      :fields="props.fields"
      :cacheName="props.cacheName"
      :gridColumns="props.gridColumns"
    />
  </div>
</template>

<style>
  .toplist-wrapper {
    background-color: var(--background-color);
    width: 100%;
    min-width: min(100vw, 600px);
    max-width: 600px;
    height: 400px;
    border: var(--border-large);
    border-radius: var(--radius-large);
    box-shadow: var(--shadow-main);
    overflow-x: hidden;
  }
</style>
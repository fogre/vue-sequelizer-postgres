<script setup>
  import { ref } from "vue"
  import { useQuery } from "vue-query"
  import { apiGetWithSearch } from "../../utils/apiService"
  import { useList } from '../../composables/useList'
  import { listSharedProps } from './listSharedProps'
  import ListSearch from '../Inputs/ListSearch.vue'
  import ListLabels from './ListLabels.vue'
  import ListTemplate from './ListTemplate.vue'

  const props = defineProps(listSharedProps)

  const searchParams = ref(null)

  //fetch data
  const { isLoading, isError, error, data } = useQuery(
    [props.cacheName, searchParams],
    () => apiGetWithSearch(props.resource, searchParams.value)
  )
  //use list composable
 const {
    sortedList,
    handleSortList,
    gridTemplateColumns
  } = useList(data, props.cacheName, props.fields, props.gridColumns)

  //set search params for data fetching
  const handleSearchParams = params => {
    if (params) {
      searchParams.value = { search: params }
    } else if (!params) {
      searchParams.value = null
    }
  }
</script>

<template>
  <div>
    <ListSearch @handleSearch="handleSearchParams" />
    <div class="searchlist-wrapper">
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
  </div>
</template>

<style>
  .searchlist-wrapper {
    min-height: 350px;
    border-top: 4px solid var(--background-transparent-primary);
    border-bottom: 5px solid var(--background-transparent-primary);
    border-radius: var(--radius-large);
    overflow-x: hidden;
  }
</style>
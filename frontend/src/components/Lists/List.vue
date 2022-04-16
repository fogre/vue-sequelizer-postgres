<script setup>
  import { ref, watch, computed } from 'vue'
  import { useQuery } from "vue-query";
  import { apiGet } from "../../utils/apiService"
  import { listSorter } from '../../utils/listSorter'
  import ListLabels from './ListLabels.vue'
  import BlogListItem from './BlogListItem.vue'
  import UserListItem from './UserListItem.vue'

  /*
    props:
    - cacheName: Name of the vue-query cache
    - resource: api resourse url i.e /blogs
    - fields: which object fields to show in the list
    - listType: which type list type child component to render
    - gridColumns: optional grid template columns layout (otherwise 1fr)
    - fieldsAs: change rendered list field names. Must have same length as fields.
  */
  const props = defineProps({
    cacheName: { type: [String, Array], required: true },
    resource: { type: String, required: true },
    fields: { type: Array, required: true },
    listType: { type: String, required: true },
    gridColumns: String,
    fieldsAs: Array
  })
  //fetch data
  const { isLoading, isError, error, data } = useQuery(
    props.cacheName, () => apiGet(props.resource)
  )
  /*
    object of 2 fields:
    - sortIndex (used to sort the list based on the index by field)
    - list: Object array of fetched data
  */
  const sortedList = ref({ sortIndex: -1, list: [] })

  //if data is fetched and no error, set sortedList
  watch(() => [isLoading.value, isError.value], ([loadingIs, errorIs], [old1, old2]) => {
    console.log(data.value)
    if (!loadingIs && !errorIs) {
      sortedList.value = {
        sortIndex: -1,
        list: data.value.data
      }
    }
  })

  const handleSortList = index => {
    sortedList.value = listSorter(sortedList.value, props.fields, index)
  }

  //assign li child .list-item component
  const listItemComponent = computed(() => {
    switch(props.listType) {
      case 'blog': return BlogListItem
      case 'user': return UserListItem
      default: throw new Error('Invalid list item component!')
    }
  })

  /*
    compute the list grid template columns based on optional prop gridColumns
    attached to styles in .list-grid-field
  */
  const gridTemplateColumns = computed(() => {
    if (props.gridColumns) {
      return props.gridColumns
    } else {
      let str = ''
      props.fields.forEach(l => str += '1fr ')
      return str
    }
  })
</script>

<template>
  <div class="list-wrapper">
    <ListLabels
      @sortList="handleSortList"
      :list="sortedList"
      :fields="props.fields"
      :fieldsAs="props.fieldsAs"
    />
    <p v-if="isLoading">Loading...</p>
    <ol v-else class="list-ol">
      <li
        v-for="item in sortedList.list"
        :key="item.id"
        class="list-grid-field list-li"
      >
        <div v-for="field in props.fields" :key="field" class="list-item g-flex-centered">
          <component
            :is="listItemComponent"
            :field="field"
            :item="item"
          />
        </div>
      </li>
    </ol>
  </div>
</template>

<style >
  .list-wrapper {
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

  .list-grid-field {
    display: grid;
    grid-template-columns: v-bind(gridTemplateColumns);
    height: max-content;
    text-align: center;
  }

  .list-labels-wrapper {
    position: sticky;
    left: 0;
    top:  0;
    background-color: inherit;
    box-shadow: 0px 7px 5px -6px rgba(0,0,0,0.4);
  }

  .list-label-button {
    font-weight: 700;
    color: var(--color-secondary);
    height: 40px;
  }

  .list-item {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-main);

    &:not(:first-child) {
      border-left: var(--border-small);
      border-left-style: dotted;
    }
  }

  .list-label, .list-item {
    padding: 6px 6px;
  }

  .list-ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list-li {
    padding: 6px 0;

    &:nth-child(2n) {
      background-color: var(--background-transparent-secondary);
      border-top: var(--border-small);
      border-bottom: var(--border-small);
      border-color: var(--background-transparent-primary);
    }
  }
</style>
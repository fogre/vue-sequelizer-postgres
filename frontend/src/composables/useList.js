import { computed, ref, watch } from 'vue'

import { listSorter } from '../utils/listSorter'

export const useList = (data, cacheType, fields, gridColumns) => {
  /*
    object of 2 fields:
    - sortIndex (used for sorting the list by fields array index)
    - list (the list of data objects)
  */
  const sortedList = ref({ sortIndex: -1, list: [] })

  //if data is fetched, set sortedList
  watch(() => data.value, dataValue => {
    if (dataValue && dataValue.data) {
      sortedList.value = {
        sortIndex: -1,
        list: dataValue.data
      }
    }
  })

  const handleSortList = index => {
    sortedList.value = listSorter(sortedList.value, fields, index)
  }
  /*
    compute the list grid template columns based on optional prop gridColumns
    attached to :style in ListLabels and ListTemplate components
  */
  const gridTemplateColumns = computed(() => {
    if (gridColumns) {
      return gridColumns
    } else {
      let str = ''
      fields.forEach(l => str += '1fr ')
      return str
    }
  })

  return {
    sortedList,
    handleSortList,
    gridTemplateColumns
  }
}
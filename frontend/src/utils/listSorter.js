const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

export const listSorter = (sortedList, fields, index) => {
  if (sortedList.sortIndex === index) {
    return {
      sortIndex: index,
      list: sortedList.list.reverse()
    }
  }

  const list = [ ...sortedList.list ]
  list.sort((a,b) => 
    collator.compare(a[fields[index]], b[fields[index]])
  )

  return {
    sortIndex: index,
    list
  }
}
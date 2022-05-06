/*
  props:
  - cacheName: Name of the vue-query cache
  - resource: api resourse url i.e /blogs
  - fields: which object fields to show in the list
  - gridColumns: optional grid template columns layout (otherwise 1fr)
  - fieldsAs: change rendered list field names. Must have same length as fields.
  - listType: which type list to render (change style)
*/
export const listSharedProps = {
  cacheName: { type: [String, Array], required: true },
  resource: { type: String, required: true },
  fields: { type: Array, required: true },
  gridColumns: String,
  fieldsAs: Array
}
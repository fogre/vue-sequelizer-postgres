export const addBlogSchema = [
  {
    $formkit: 'text',
    label: 'Title',
    name: 'title',
    validation: 'required|length:4,40'
  },
  {
    $formkit: 'text',
    label: 'Blog url',
    name: 'url',
    validation: 'required|url'
  },
  {
    $formkit: 'text',
    label: 'Author',
    name: 'author',
    validation: 'length:4,20'
  }
]
export const addBlogSchema = [
  {
    $formkit: 'text',
    label: 'Title',
    name: 'title',
    placeholder: 'Blog title',
    validation: 'required|length:4,40',
    labelClass: 'form-label',
    inputClass: 'form-input'
  },
  {
    $formkit: 'text',
    label: 'Blog url',
    name: 'url',
    placeholder: 'Full url address i.e http://someurl.com/2',
    validation: 'required|url',
    labelClass: 'form-label',
    inputClass: 'form-input'
  },
  {
    $formkit: 'text',
    label: 'Author',
    name: 'author',
    placeholder: 'Name of the author',
    validation: 'length:4,20',
    labelClass: 'form-label',
    inputClass: 'form-input'
  }
]
export const addTagSchema = [
  {
    $formkit: 'text',
    label: 'Tag name',
    name: 'name',
    placeholder: 'Enter tag name',
    validation: 'required|length:2,10',
    labelClass: 'form-label',
    inputClass: 'form-input'
  }
]
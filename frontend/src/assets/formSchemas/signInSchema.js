export const signInSchema = [
  {
    $el: 'h3',
    children: 'Sign in'
  },
  {
    $formkit: 'text',
    label: 'Username',
    name: 'username',
    validation: 'required',
    labelClass: 'form-label-white',
    inputClass: 'form-input'
  },
  {
    $formkit: 'password',
    label: 'Password',
    type: 'password',
    name: 'password',
    validation: 'required',
    labelClass: 'form-label-white',
    inputClass: 'form-input'
  }
]
export const signUpSchema = [
  {
    $el: 'h3',
    children: 'Sign up'
  },
  {
    $formkit: 'text',
    label: 'Username',
    name: 'username',
    validation: 'required|length:4',
    labelClass: 'form-label-white',
    inputClass: 'form-input'
  },
  {
    $formkit: 'text',
    label: 'Name',
    name: 'name',
    validation: 'required|length:4',
    labelClass: 'form-label-white',
    inputClass: 'form-input'
  },
  {
    $formkit: 'group',
    name: 'passgroup',
    children: [
      {
        $formkit: 'password',
        label: 'Password',
        type: 'password',
        name: 'password',
        validation: 'required|length:6',
        labelClass: 'form-label-white',
        inputClass: 'form-input'
      },
      {
        $formkit: 'password',
        label: 'Confirm password',
        type: 'password',
        name: 'password_confirm',
        validation: 'required|confirm',
        labelClass: 'form-label-white',
        inputClass: 'form-input'
      }
    ]  
  }  
]
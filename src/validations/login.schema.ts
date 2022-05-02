import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a correct email address.')
    .required('Please enter your email.'),
  password: Yup.string()
    .min(6, 'Please enter a correct password.')
    .required('Please enter your password.'),
})

export default LoginSchema

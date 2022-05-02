import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a correct email address.')
    .required('Please enter your email.'),
  profile_image: Yup.string().required('Please enter your profile image URL.'),
  name: Yup.string().required('Please enter your full name.'),
  date_of_birth: Yup.date().required('Please enter your date of birth.'),
  password: Yup.string()
    .min(6, 'Please enter a correct password.')
    .required('Please enter your password.'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('Please confirm your password.'),
})

export default RegisterSchema

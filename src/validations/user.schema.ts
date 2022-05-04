import * as Yup from 'yup'

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter a valid email.'),
  password: Yup.string()
    .min(8, 'Password should contain at least 8 characters.')
    .required('Please enter a valid password.'),
  date_of_birth: Yup.date().required('Please enter a valid date of birth.'),
  profile_image: Yup.string().required(
    'Please enter a valid profile image URL.'
  ),
  name: Yup.string().required('Please enter a valid name.'),
  is_admin: Yup.boolean().required('Please enter a valid user role status.'),
  is_active: Yup.boolean().required('Please enter a valid user active status.'),
})

export default UserSchema

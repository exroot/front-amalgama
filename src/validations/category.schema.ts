import * as Yup from 'yup'

const CategorySchema = Yup.object().shape({
  category: Yup.string().required('Please enter a valid category.'),
})

export default CategorySchema

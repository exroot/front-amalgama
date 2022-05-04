import * as Yup from 'yup'

const CurrencySchema = Yup.object().shape({
  symbol: Yup.string().required('Please enter a valid currency symbol.'),
  description: Yup.string().required('Please enter a valid description.'),
})

export default CurrencySchema

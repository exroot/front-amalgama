import * as Yup from "yup";

const RegistriesSchema = Yup.object().shape({
  title: Yup.string().required("Please enter a valid title."),
  registryType: Yup.string().required("Please enter a valid type."),
  category: Yup.string().required("Please enter a valid category."),
  currency: Yup.string().required("Please enter a valid currency."),
  description: Yup.string(),
  amount: Yup.string().required("Please enter a valid amount."),
});

export default RegistriesSchema;

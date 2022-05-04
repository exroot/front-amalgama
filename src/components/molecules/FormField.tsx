import { Field } from 'formik'

const SelectIcon = () => {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  )
}
const FormField = ({
  name,
  errors,
  touched,
  type = 'text',
  selected,
  label,
  formik,
  ...props
}: any) => {
  const fieldName = name.toLowerCase()

  if (!formik && type === 'select') {
    return (
      <div data-testid="form-field" className="relative">
        <select
          aria-label="Select input"
          className="block w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 font-medium leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          {...props}
        >
          {!selected && (
            <option selected>{label ? label : `Select ${name}`}</option>
          )}
          {props.options.map((option: any, i: any) => {
            return (
              <option
                key={option}
                value={props.optionsValue ? props.optionsValue[i] : option}
                selected={selected && selected === option}
              >
                {option}
              </option>
            )
          })}
        </select>
        <SelectIcon />
      </div>
    )
  }

  if (type === 'select') {
    return (
      <div data-testid="form-field" className="relative">
        <Field
          as="select"
          className="block w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 py-3 px-4 pr-8 font-medium leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          name={fieldName}
          type={type}
          touched={touched}
          {...props}
        >
          {!selected && (
            <option selected>{label ? label : `Select ${name}`}</option>
          )}
          {props.options.map((option: any) => {
            return (
              <option
                key={
                  props.optionValue ? option[`${props.optionValue}`] : option
                }
                value={
                  props.optionValue ? option[`${props.optionValue}`] : option
                }
                selected={selected && selected === option}
              >
                {props.optionLabel ? option[`${props.optionLabel}`] : option}
              </option>
            )
          })}
        </Field>
        <SelectIcon />
      </div>
    )
  }
  if (formik) {
    return <Field
            data-testid="form-field"
            name={fieldName}
            validate
            type={type}
            className={`hover:border-accent block w-full appearance-none rounded-lg border bg-gray-200 py-3 px-3 font-medium leading-tight 
            text-gray-700 duration-75 ease-in-out focus:outline-none`}
          />
  }
  return <input
  data-testid="form-field"
  name={fieldName}
  type={type}
  className={`hover:border-accent block w-full appearance-none rounded-lg border bg-gray-200 py-3 px-3 font-medium leading-tight 
  text-gray-700 duration-75 ease-in-out focus:outline-none`}
/>
 

  
  
}

export default FormField

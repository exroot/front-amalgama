import React from 'react'

const Label = ({ htmlFor, children }: any) => {
  return (
    <label
    data-testid="label"
      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500"
      htmlFor={htmlFor.toLowerCase()}
    >
      {children}
    </label>
  )
}

export default Label

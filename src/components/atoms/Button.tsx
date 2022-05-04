import React from 'react'

const Button = ({ type = 'button', children, ...props }: any) => {
  return (
    <button
      data-testid="button"
      type={type}
      className="block h-12 w-full rounded-lg border border-blue-800 bg-blue-800 px-4 py-2 font-bold uppercase tracking-wide text-white outline-none duration-200 ease-in-out hover:bg-blue-700
    focus:outline-none sm:w-56"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

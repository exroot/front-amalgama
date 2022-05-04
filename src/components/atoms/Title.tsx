import React from 'react'

const Title = ({ children }: any) => {
  return <h1 data-testid="title" className="text-4xl font-extrabold text-gray-800">{children}</h1>
}

export default Title

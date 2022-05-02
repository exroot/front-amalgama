import React, { useState } from 'react'

const SidebarLinkGroup = ({ children, activecondition }: any) => {
  const [open, setOpen] = useState(activecondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <li
      className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
        activecondition && 'bg-slate-900'
      }`}
    >
      {children(handleClick, open)}
    </li>
  )
}

export default SidebarLinkGroup

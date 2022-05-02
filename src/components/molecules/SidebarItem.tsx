import React from 'react'
import Link from 'next/link'
import SidebarLinkGroup from '@/components/atoms/SidebarLinkGroup'

const SidebarItem = ({
  label,
  route,
  pathname,
  childs,
  sidebarExpanded,
  setSidebarExpanded,
}: any) => {
  if (childs && childs.length) {
    return (
      <SidebarLinkGroup activecondition={pathname.includes('admin')}>
        {(handleClick: Function, open: boolean) => {
          return (
            <>
              <a
                href="#0"
                className={`block truncate text-slate-200 transition duration-150 hover:text-white ${
                  pathname.includes(label) && 'hover:text-slate-200'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes(route) && 'text-indigo-500'
                        }`}
                        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes(route) && 'text-indigo-300'
                        }`}
                        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      {label}
                    </span>
                  </div>
                  {/* Icon */}
                  <div className="ml-2 flex shrink-0">
                    <svg
                      className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${
                        open && 'rotate-180 transform'
                      }`}
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
                  {childs.map((child: any) => (
                    <li className="mb-1 last:mb-0" key={child.label}>
                      <Link href={child.route} passHref>
                        <a className="block truncate text-slate-400 transition duration-150 hover:text-slate-200">
                          <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                            {child.label}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )
        }}
      </SidebarLinkGroup>
    )
  }
  return (
    <li
      className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
        pathname.includes(route) && 'bg-slate-900'
      }`}
    >
      <Link href={route} passHref>
        <a
          className={`block truncate text-slate-200 transition duration-150 hover:text-white ${
            pathname.includes(route) && 'hover:text-slate-200'
          }`}
        >
          <div className="flex items-center">
            <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-600 ${
                  pathname.includes(route) && 'text-indigo-500'
                }`}
                d="M0 20h24v2H0z"
              />
              <path
                className={`fill-current text-slate-400 ${
                  pathname.includes(route) && 'text-indigo-300'
                }`}
                d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
              />
            </svg>
            <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
              {label}
            </span>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default SidebarItem

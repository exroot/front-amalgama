import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import SidebarItem from '@/components/molecules/SidebarItem'
import useSession from '@/hooks/useSession'

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const { pathname } = useRouter()
  const trigger = useRef(null)
  const sidebar = useRef(null)
  const { user } = useSession({})
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [items, _] = useState([
    {
      route: '/dashboard',
      label: 'Index',
    },
    {
      route: '/registries',
      label: 'Incomes/Expenses',
    },
    {
      route: '/reports',
      label: 'Reports',
    },
    {
      route: '/admin',
      label: 'Administration',
      childs: [
        {
          route: '/admin/categories',
          label: 'Categories',
        },
        { route: '/admin/currencies', label: 'Currencies' },
        {
          route: '/admin/clients',
          label: 'Clients',
        },
      ],
    },
  ])
  useEffect(() => {
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    setSidebarExpanded(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    )
  }, [])

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [])

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded)
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded')
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 transform flex-col overflow-y-scroll bg-slate-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="mb-10 flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="text-slate-500 hover:text-slate-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span
                className="lg:sidebar-expanded:hidden hidden w-6 text-center lg:block 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {items &&
                items.map((item) => {
                  if (item.label.includes('Admin') && user?.is_admin === true) {
                    return null
                  }
                  return (
                    <SidebarItem
                      key={item.label}
                      label={item.label}
                      route={item.route}
                      pathname={pathname}
                      childs={item.childs}
                      sidebarExpanded={sidebarExpanded}
                      setSidebarExpanded={setSidebarExpanded}
                    />
                  )
                })}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="sidebar-expanded:rotate-180 h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useSession from "src/hooks/useSession";
import redirectTo from "src/utils/redirectTo";

const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSession({});
  const UserAvatar =
    "https://raw.githubusercontent.com/cruip/tailwind-dashboard-template/main/src/images/user-avatar-32.png";
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdownOpen) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div className="relative inline-flex" data-testid="user-menu">
      <button
        ref={trigger}
        className="group inline-flex items-center justify-center"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="h-8 w-8 rounded-full"
          src={UserAvatar}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="ml-2 truncate text-sm font-medium group-hover:text-slate-800">
            {user?.name}
          </span>
          <svg
            className="ml-1 h-3 w-3 shrink-0 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      {dropdownOpen && (
        <div className="min-w-44 absolute top-full right-0 z-10 mt-1 origin-top-right overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg">
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="mb-1 border-b border-slate-200 px-3 pt-0.5 pb-2">
              <div className="font-medium text-slate-800">{user?.name}</div>
              <div className="text-xs italic text-slate-500">
                {user?.is_admin ? "Administrador" : "Cliente"}
              </div>
            </div>
            <ul>
              <li>
                <Link href="/" passHref>
                  <a className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600">
                    Configuración
                  </a>
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                  onClick={() => {
                    redirectTo("/login");
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

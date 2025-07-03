import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const menu = [
  { to: '/', label: 'Inicio' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/create-property', label: 'Tokenizar Propiedad' },
  { to: '/profile', label: 'Perfil' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const location = useLocation()

  return (
    <Disclosure as="nav" className="bg-primary-800 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-primary-400 tracking-tight">
                  BlockHommie
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {menu.map((item) => (
                    <Link
                      key={item.to}
                  to={item.to}
                      className={classNames(
                        location.pathname === item.to ? 'border-b-2 border-accent-500 text-white' : 'border-transparent text-primary-200 hover:border-gray-300 hover:text-white',
                        'px-1 pt-1 text-sm font-medium'
                      )}
                      aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                    </Link>
            ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <ConnectButton
                  accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                  showBalance={{ smallScreen: false, largeScreen: true }}
                />
              </div>
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary-200 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
        </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {menu.map((item) => (
                <Disclosure.Button
                  key={item.to}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    location.pathname === item.to ? 'bg-primary-700 text-white' : 'text-primary-200 hover:bg-primary-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Disclosure.Button>
            ))}
              <div className="border-t border-primary-700 pt-4 pb-3">
                <ConnectButton />
              </div>
        </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header 
'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useUser } from 'hooks/use-user';
import { signIn, signOut } from 'next-auth/react';

import { MainNavItem } from 'types';
import { dashboardConfig } from '@/config/dashboard';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';

interface NavbarProps {
  items?: MainNavItem[];
}

const Navbar3 = ({ items }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push('/login');
  };

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-b-slate-200 w-full"
    >
      {({ open }) => (
        <div className={`bg-white ${open ? 'rounded-b-lg' : 'rounded-b-none'}`}>
          <>
            <div className="mx-auto">
              <div className="relative flex h-16 justify-between">
                <div className="flex items-center mr-6 sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                  <span className="flex flex-shrink-0 items-center text-indigo-600">
                    <Image src="/logo.svg" alt="logo" width={32} height={32} />
                    {siteConfig.name}
                  </span>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {items?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          'inline-flex items-center border-b-2',
                          pathname === link.href
                            ? 'border-blue-600 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        )}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    className="text-white-0 rounded bg-blue-600 px-8 py-2.5 font-medium hover:bg-blue-700"
                    onClick={() => signIn()}
                  >
                    Login
                  </button>

                  {/* Profile dropdown */}
                  {/* <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {dashboardConfig.sidebarNav.map((link) => (
                          <Menu.Item key={link.href}>
                            {({ active }) => (
                              <Link
                                href={
                                  link.href === '/user'
                                    ? `/user/${user?.id}`
                                    : link.href || '/'
                                }
                                className={classNames(
                                  'block px-4 py-2 text-sm',
                                  pathname === link.href
                                    ? 'border-blue-600 bg-indigo-50 text-gray-900'
                                    : 'bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                                )}
                              >
                                {link.title}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                'block w-full px-4 py-2 text-left text-sm',
                                active
                                  ? 'active:border-red-500 active:bg-red-50 active:text-red-700'
                                  : 'bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                              )}
                              onClick={handleSignOut}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-4 pt-2">
                {dashboardConfig.mainNav.map((link) => (
                  <Disclosure.Button
                    as="a"
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                      pathname === link.href
                        ? 'border-blue-600 bg-indigo-50 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                    )}
                  >
                    {link.title}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar3;

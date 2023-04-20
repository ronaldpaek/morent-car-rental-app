'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/use-theme';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useUser } from 'hooks/use-user';
import { signIn, signOut } from 'next-auth/react';

import { MainNavItem, SidebarNavItem } from 'types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface NavbarProps {
  dashboardConfig: {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
  };
}

export const Navbar = ({ dashboardConfig }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push('/login');
  };

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <Disclosure as="nav" className="w-full">
      {({ open }) => (
        <div
          className={`bg-white border-b border-b-slate-200 ${
            open ? 'rounded-b-lg' : 'rounded-b-none'
          }`}
        >
          <>
            <div className="mx-auto max-w-7xl">
              <div className="flex h-16 justify-between sm:justify-start">
                <div className="flex gap-10">
                  <div className="flex flex-shrink-0 gap-2 items-center">
                    <Image src="/logo.svg" alt="logo" width={32} height={32} />
                    <span className="text-3xl text-indigo-600">
                      {siteConfig.name}
                    </span>
                  </div>
                  <div className="hidden sm:mx-auto sm:flex sm:space-x-6">
                    {dashboardConfig.mainNav?.map((link) => (
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
                <div className="hidden sm:ml-auto sm:flex sm:items-center">
                  {user ? (
                    <>
                      <button
                        type="button"
                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        onClick={toggleTheme}
                      >
                        <span className="sr-only">Toggle theme</span>
                        {theme === 'light' ? (
                          <MoonIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <SunIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt="User profile image"
                                className="h-8 w-8 rounded-full"
                                width={32}
                                height={32}
                              />
                            ) : null}
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
                          {dashboardConfig.sidebarNav?.length ? (
                            <Menu.Items className="bg-white absolute right-0 z-[1] mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {dashboardConfig.sidebarNav?.map((link) => (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      key={link.href}
                                      href={link.href ?? '#'}
                                      className={cn(
                                        'block px-4 py-2 text-sm',
                                        active
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
                                    className={cn(
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
                          ) : null}
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    // "text-white-0 rounded bg-blue-600 px-8 py-2.5 font-medium hover:bg-blue-700"
                    <button
                      className="text-primary-600 dark:text-primary-500 ml-1 lg:ml-3 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                      onClick={() => signIn()}
                    >
                      Login
                    </button>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
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
              {user ? (
                <>
                  <div className="space-y-1 pb-3 pt-2">
                    {dashboardConfig.mainNav?.map((link) => (
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
                  <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        {user?.image && (
                          <Image
                            className="h-10 w-10 rounded-full"
                            width={40}
                            height={40}
                            src={user.image ?? ''}
                            alt="User profile image"
                          />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user?.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user?.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        onClick={toggleTheme}
                      >
                        <span className="sr-only">Toggle theme</span>
                        {theme === 'light' ? (
                          <MoonIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <SunIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 space-y-1">
                      {dashboardConfig.sidebarNav?.map((link) => (
                        <Disclosure.Button
                          as="a"
                          key={link.href}
                          href={link.href}
                          className={clsx(
                            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                            pathname === link.href
                              ? 'border-blue-600 bg-indigo-50 text-blue-800'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                          )}
                        >
                          {link.title}
                        </Disclosure.Button>
                      ))}
                      <Disclosure.Button
                        className="block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 active:border-red-500 active:bg-red-50 active:text-red-700"
                        onClick={handleSignOut}
                      >
                        Logout
                      </Disclosure.Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pb-3 pt-2">
                  {/* // "w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 active:border-blue-600 active:bg-indigo-50 active:text-blue-800" */}
                  <Disclosure.Button
                    className="text-primary-600 dark:text-primary-500 ml-1 lg:ml-3 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    onClick={() => signIn()}
                  >
                    Login
                  </Disclosure.Button>
                </div>
              )}
            </Disclosure.Panel>
          </>
        </div>
      )}
    </Disclosure>
  );
};

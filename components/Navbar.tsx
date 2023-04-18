'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { mainNavLinks, userNavLinks } from 'data';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { useUser } from 'hooks';

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

function DesktopNavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      // @ts-ignore
      href={href}
      className={clsx(
        'inline-flex items-center border-b-2',
        isActive
          ? 'border-blue-500 text-blue-500'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Disclosure.Button
      as="a"
      href={href}
      className={clsx(
        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
        isActive
          ? 'border-blue-500 bg-indigo-50 text-blue-700'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
      )}
    >
      {children}
    </Disclosure.Button>
  );
}

function UserNavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          // @ts-ignore
          href={href}
          className={classNames(
            'block px-4 py-2 text-sm',
            isActive
              ? 'border-blue-500 bg-indigo-50 text-blue-700'
              : 'bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          )}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  if (pathname === '/register' || pathname === '/login') return null;

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div
          className={`bg-white px-4 shadow sm:px-6 lg:px-8 ${
            open ? 'rounded-b-lg' : 'rounded-b-none'
          }`}
        >
          <>
            <div className="mx-auto max-w-7xl">
              <div className="flex h-16 justify-between sm:justify-start">
                <div className="flex flex-1">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={141}
                      height={26}
                      className="mx-auto h-12 w-auto"
                    />
                  </div>
                  <div className="hidden sm:mx-auto sm:flex sm:space-x-8">
                    {mainNavLinks.map((link) => (
                      <DesktopNavItem
                        key={link.title}
                        // @ts-ignore
                        href={link.path}
                      >
                        {link.title}
                      </DesktopNavItem>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-auto sm:flex sm:items-center">
                  {user ? (
                    <>
                      <button
                        type="button"
                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            {user && (
                              <Image
                                className="h-8 w-8 rounded-full"
                                width={32}
                                height={32}
                                src={user?.image ?? ''}
                                alt="User profile image"
                              />
                            )}
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
                          <Menu.Items className="bg-white-0 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavLinks.map((link) => (
                              <UserNavItem
                                key={link.title}
                                // @ts-ignore
                                href={
                                  link.path === '/user'
                                    ? `/user/${user?.id}`
                                    : link.path
                                }
                              >
                                {link.title}
                              </UserNavItem>
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
                      </Menu>
                    </>
                  ) : (
                    <button
                      className="text-white-0 rounded bg-blue-500 px-8 py-2.5 font-medium hover:bg-blue-600"
                      onClick={() => signIn()}
                    >
                      Login
                    </button>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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
                    {mainNavLinks.map((link) => (
                      <MobileNavItem
                        key={link.title}
                        // @ts-ignore
                        href={link.path}
                      >
                        {link.title}
                      </MobileNavItem>
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
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1">
                      {userNavLinks.map((link) => (
                        <MobileNavItem
                          key={link.title}
                          // @ts-ignore
                          href={
                            link.path === '/user'
                              ? `/user/${user?.id}`
                              : link.path
                          }
                        >
                          {link.title}
                        </MobileNavItem>
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
                  <Disclosure.Button
                    className="w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 active:border-blue-500 active:bg-indigo-50 active:text-blue-700"
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
}

export default Navbar;

'use client';

import Image from 'next/image';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (pathname === '/register' || pathname === '/login') return null;

  return (
    <footer className="bg-[#F6F7F9] pb-6 md:bg-white md:pb-[60px] md:pt-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 font-medium text-gray-700 md:px-[60px]">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:border-b md:border-b-blue-50 md:pb-[60px]">
          <div>
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="logo"
                width={141}
                height={26}
                className="mx-auto h-12 w-auto"
              />
            </div>
            <p className="text-sx w-[216px] leading-6 md:w-[292px] md:text-base md:leading-8">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-[65px] gap-y-[48px] lg:grid-cols-3 lg:gap-x-[60px]">
            <ul className="grid gap-4 md:text-[16px]">
              <li>
                <h3 className="text-xl font-semibold text-gray-900 md:text-[20px] md:text-gray-800">
                  About
                </h3>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">How it works</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Featured</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Partnership</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#" className="whitespace-nowrap">
                  Business Relation
                </a>
              </li>
            </ul>

            <ul className="grid gap-4 md:order-3">
              <li>
                <h3 className="text-xl font-semibold text-gray-900 md:text-[20px] md:text-gray-800">
                  Socials
                </h3>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Discord</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Facebook</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Twitter</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Facebook</a>
              </li>
            </ul>

            <ul className="grid gap-4 md:order-2">
              <li>
                <h3 className="text-xl font-semibold text-gray-900 md:text-[20px] md:text-gray-800">
                  Community
                </h3>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Events</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Blog</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Podcast</a>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:scale-110 hover:text-blue-500">
                <a href="#">Invite a friend</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col text-sm font-semibold text-gray-900 md:flex-row md:justify-between md:text-gray-800">
          <div className="mb-8 flex justify-between md:order-2 md:gap-8">
            <h3>Privacy & Policy</h3>
            <h3>Terms & Condition</h3>
          </div>
          <h3>©2022 MORENT. All rights reserved</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

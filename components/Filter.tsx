'use client';

import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import TooltipSlider from './TooltipSlider';
// import { cars, Car } from 'data';
// import { CarCard, Button } from 'components';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

import { Tooltip } from '@/components/ui/tooltip';

import { getGetCarsQuery, useGetCarsQuery } from '@/services/supacars';

interface Car{
  id: Number,
  make: String,
  model: String,
  year: Number,
  color: String,
  bodyType: String,
  seatCapacity: Number,
  fuelCapacity: Number,
  rentPrice: Number,
  description: String,
  location: String,
  ownerId: Number,
  available: Boolean
}

type FilterOption = {
  value: string | number;
  label: string;
};

type FilterSection = {
  id: string;
  name: string;
  options: FilterOption[];
};

const filters: FilterSection[] = [
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'Sport', label: 'Sport' },
      { value: 'SUV', label: 'SUV' },
      { value: 'MPV', label: 'MPV' },
      { value: 'Sedan', label: 'Sedan' },
      { value: 'Coupe', label: 'Coupe' },
      { value: 'Hatchback', label: 'Hatchback' },
    ],
  },
  {
    id: 'capacity',
    name: 'Capacity',
    options: [
      { value: 2, label: '2 Person' },
      { value: 4, label: '4 Person' },
      { value: 5, label: '5 Person' },
      { value: 6, label: '6 Person' },
      { value: 7, label: '7 or More' },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [{ value: 80, label: 'Max: $100' }],
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export const Filter = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState<string[]>([]);
  const [capacity, setCapacity] = useState<number[]>([]);
  const [price, setPrice] = useState(80);

  const { data, isFetching, error } = useGetCarsQuery({searchText, price});

  if (isFetching) {
    return (
      <div>Loading... please wait :)</div>
    )
  }

  console.log(data);
  console.log(searchText);
  console.log(type);
  console.log(capacity);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setType([...type, value]);
    } else {
      setType(type.filter((item) => item !== value));
    }
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setCapacity([...capacity, value]);
    } else {
      setCapacity(capacity.filter((item) => item !== value));
    }
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
  };

  return (
    <div className="bg-white-0">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="bg-white-0 relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 pb-4 pt-4"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? '-rotate-180' : 'rotate-0',
                                      'h-5 w-5 transform'
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pb-2 pt-4">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className={
                                      section.id === 'price'
                                        ? 'block'
                                        : 'flex items-center'
                                    }
                                  >
                                    {/* {section.id === 'price' ? (
                                      <TooltipSlider
                                        id={`${section.id}-${optionIdx}`}
                                        name={`${section.id}`}
                                        value={price}
                                        min={0}
                                        max={100}
                                        step={1}
                                        className="h-4 w-full rounded-md bg-gray-100"
                                        onChange={handlePriceChange}
                                      />
                                    ) : ( */}
                                    <input
                                      id={`${section.id}-${optionIdx}`}
                                      name={`${section.id}`}
                                      defaultValue={option.value}
                                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                      type="checkbox"
                                      checked={
                                        section.id === 'type'
                                          ? type.includes(
                                              option.value as string
                                            )
                                          : capacity.includes(
                                              option.value as number
                                            )
                                      }
                                      onChange={
                                        section.id === 'type'
                                          ? handleTypeChange
                                          : handleCapacityChange
                                      }
                                    />
                                    {/* )} */}
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="bg-white-200 font-semibold text-gray-700">
          <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-4">
            <aside className="bg-white-0 px-6 pb-6 md:px-[60px] lg:col-span-1 lg:grid lg:p-6">
              <div className="flex w-full items-center gap-4 pt-0.5 lg:hidden">
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="simple-search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="block w-full rounded-[10px] border border-blue-50/40 p-3.5 pl-10 text-sm font-medium text-gray-700 focus:border-blue-500  focus:ring-blue-500"
                    placeholder="Search by make or model"
                    required
                  />
                </div>
                {/* <Button
                  type="button"
                  className="rounded-[10px] border border-blue-50/40 p-3"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <FilterIcon className="h-6 w-6" />
                </Button> */}
              </div>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-blue-50/40">
                  <fieldset>
                    <legend className="mb-6 block text-xs font-medium uppercase text-gray-500">
                      <label htmlFor="simple-search">Search</label>
                    </legend>

                    <div className="relative w-full">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="simple-search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="block w-full rounded-full border border-blue-50/40 p-2.5  pl-10 text-sm font-medium text-gray-700 focus:border-blue-500  focus:ring-blue-500"
                        placeholder="Search by make or model"
                        required
                      />
                    </div>
                  </fieldset>
                  {filters.map((section, sectionIdx) => (
                    <div key={section.name} className="pt-10">
                      <fieldset>
                        <legend className="block text-xs font-medium uppercase text-gray-500">
                          {section.name}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className={
                                section.id === 'price'
                                  ? 'block'
                                  : 'flex items-center'
                              }
                            >
                              {/* {section.id === 'price' ? (
                                <TooltipSlider
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}`}
                                  value={price}
                                  onChange={handlePriceChange}
                                  min={0}
                                  max={100}
                                  step={1}
                                  className="h-4 w-full rounded-md bg-gray-100"
                                />
                              ) : ( */}
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}`}
                                defaultValue={option.value}
                                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                type="checkbox"
                                checked={
                                  section.id === 'type'
                                    ? type.includes(option.value as string)
                                    : capacity.includes(option.value as number)
                                }
                                onChange={
                                  section.id === 'type'
                                    ? handleTypeChange
                                    : handleCapacityChange
                                }
                              />
                              {/* )} */}

                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-700"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            {/* <div className="grid-col-1 grid gap-6 p-6 md:grid-cols-2 lg:col-span-3 xl:grid-cols-3">
              {cars.map((car: Car) => (
                <CarCard key={car.id} car={car} showRentNowButton={true} />
              ))} */}
            {/* Your content */}
            {/* </div> */}
            <div>
              {data?.map((car: Car) => (
                <div>{car.make}</div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

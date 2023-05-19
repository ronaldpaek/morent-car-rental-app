type navLink = {
  path: string;
  title: string;
};

const mainNavLinks: navLink[] = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/search',
    title: 'Search Cars',
  },
  {
    path: '/add-car',
    title: 'Add Car',
  },
];

const userNavLinks: navLink[] = [
  {
    path: '/user',
    title: 'My Profile',
  },
  // {
  //   path: '/settings',
  //   title: 'Settings',
  // },
];

type carListing = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  seatCapacity: number;
  fuelCapacity: number;
  rentPrice: number;
  description: string;
  location: string;
  ownerId: number;
  available: boolean;
};

export interface ICar {
  id: number;
  make: string;
  model: string;
  bodyType: string;
  seatCapacity: number;
  fuelCapacity: number;
  rentPrice: number;
  location: string;
  ownerId: number;
}

const carListings: carListing[] = [
  {
    id: 1,
    make: 'Ford',
    model: 'Explorer',
    year: 2020,
    color: 'Blue',
    bodyType: 'suv',
    seatCapacity: 5,
    fuelCapacity: 18,
    rentPrice: 50.0,
    description: 'A comfortable and spacious SUV.',
    location: 'New York',
    ownerId: 1,
    available: true,
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2018,
    color: 'Red',
    bodyType: 'sedan',
    seatCapacity: 5,
    fuelCapacity: 12,
    rentPrice: 40.0,
    description: 'A fuel-efficient and reliable car.',
    location: 'Los Angeles',
    ownerId: 2,
    available: true,
  },
  {
    id: 3,
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    color: 'White',
    bodyType: 'sedan',
    seatCapacity: 5,
    fuelCapacity: 14,
    rentPrice: 45.0,
    description: 'A stylish and comfortable car.',
    location: 'Chicago',
    ownerId: 1,
    available: false,
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model 3',
    year: 2021,
    color: 'Black',
    bodyType: 'sedan',
    seatCapacity: 5,
    fuelCapacity: 0, // Electric vehicle
    rentPrice: 70.0,
    description: 'A high-tech electric car.',
    location: 'San Francisco',
    ownerId: 3,
    available: true,
  },
  {
    id: 5,
    make: 'Chevrolet',
    model: 'Tahoe',
    year: 2021,
    color: 'Black',
    bodyType: 'suv',
    seatCapacity: 8,
    fuelCapacity: 26,
    rentPrice: 80.0,
    description: 'A powerful and spacious full-size SUV.',
    location: 'Miami',
    ownerId: 4,
    available: true,
  },
  {
    id: 6,
    make: 'Subaru',
    model: 'Outback',
    year: 2020,
    color: 'Green',
    bodyType: 'wagon',
    seatCapacity: 5,
    fuelCapacity: 18,
    rentPrice: 55.0,
    description: 'A versatile and comfortable all-wheel drive wagon.',
    location: 'Seattle',
    ownerId: 2,
    available: true,
  },
  {
    id: 7,
    make: 'BMW',
    model: '3 Series',
    year: 2019,
    color: 'Gray',
    bodyType: 'sedan',
    seatCapacity: 5,
    fuelCapacity: 15,
    rentPrice: 65.0,
    description: 'A luxurious and sporty sedan.',
    location: 'Boston',
    ownerId: 5,
    available: true,
  },
  {
    id: 8,
    make: 'Mazda',
    model: 'CX-5',
    year: 2018,
    color: 'Red',
    bodyType: 'suv',
    seatCapacity: 5,
    fuelCapacity: 16,
    rentPrice: 50.0,
    description: 'A stylish and agile compact SUV.',
    location: 'Denver',
    ownerId: 3,
    available: false,
  },
  {
    id: 9,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2020,
    color: 'Yellow',
    bodyType: 'suv',
    seatCapacity: 4,
    fuelCapacity: 17,
    rentPrice: 60.0,
    description: 'A rugged and iconic off-road vehicle.',
    location: 'Las Vegas',
    ownerId: 4,
    available: true,
  },
];

export { mainNavLinks, userNavLinks, carListings };

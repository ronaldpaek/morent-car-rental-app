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

export { mainNavLinks, userNavLinks };

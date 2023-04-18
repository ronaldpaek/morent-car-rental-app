export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/add-car/:path*',
    '/user/:path*',
    '/api/cars/:path*',
    '/api/users/:path*',
  ],
};

// '/((?!_next/image|_next/static|favicon.ico|register|api|login).*)'

// export const config = {
//   matcher: ['/((?!register|api|login|^$).*)'],
// };

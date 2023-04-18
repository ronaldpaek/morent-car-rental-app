import { Plus_Jakarta_Sans } from 'next/font/google';
// import { getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]/route';

import { Providers } from 'contexts';
import { Navbar, Footer } from 'components';
import 'styles/globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata = {
  title: 'Jupiter Car Rent',
  description: 'Jupiter Car Rent',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions);
  // console.log('session', session);
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans`}>
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

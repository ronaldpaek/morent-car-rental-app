import { Plus_Jakarta_Sans } from 'next/font/google';
// import { getServerSession } from 'next-auth';
import { Providers } from 'contexts';
import { ReduxProviders } from './GlobalRedux/provider'
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

  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans`}>
      <body className="bg-gray-50">
        <ReduxProviders>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
};

export default RootLayout;

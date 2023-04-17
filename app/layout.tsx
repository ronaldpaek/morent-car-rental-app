import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from './providers';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

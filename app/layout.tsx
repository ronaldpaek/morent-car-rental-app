import { Inter as FontSans } from 'next/font/google';

import '@/styles/globals.css';
import { Providers } from '@/contexts/providers';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Analytics } from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
  ],
  authors: [
    {
      name: 'Ronald Paek',
      url: 'https://github.com/ronaldpaek',
    },
  ],
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'white' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white font-sans text-slate-900 antialiased',
        fontSans.variable
      )}
    >
      <Providers>
        <body className="min-h-screen">
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;

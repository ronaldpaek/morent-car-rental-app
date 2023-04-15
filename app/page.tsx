import { Inter } from 'next/font/google';

import { prisma } from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'] });

const Home = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: 'test@test.com',
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      Hello, {user?.name}
    </main>
  );
};

export default Home;

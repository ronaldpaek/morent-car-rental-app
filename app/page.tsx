import { getServerSession } from 'next-auth/next';

import { authOptions } from './api/auth/[...nextauth]/route';
import User from './user';

const Home = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <User />
    </main>
  );
};

export default Home;

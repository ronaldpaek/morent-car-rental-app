import { getServerSession } from 'next-auth/next';

import { authOptions } from './api/auth/[...nextauth]/route';

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center"></main>
  );
};

export default Home;

import { getServerSession } from 'next-auth/next';

import { authOptions } from './api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from './auth';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <LoginButton />
      <LogoutButton />
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
};

export default Home;

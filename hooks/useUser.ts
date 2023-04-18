'use client';

import { useSession } from 'next-auth/react';

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined; // Add the `id` property to the type definition
}

const useUser = () => {
  const { data: session } = useSession();

  // Type assertion
  const user = session?.user as User | undefined;

  return { user };
};

export default useUser;

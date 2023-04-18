'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined; // Add the `id` property to the type definition
}

const User = () => {
  const { data: session } = useSession();
  console.log('Client Session', session);

  const user = session?.user as User | undefined;
  return (
    <>
      <span>{user?.email}</span>
      <span>{user?.name}</span>
      {user?.image && (
        <Image
          src={user.image}
          alt="user Avatar"
          width={40}
          height={40}
          className="h-auto w-auto"
        />
      )}
      <span>{user?.id}</span>
    </>
  );
};

export default User;

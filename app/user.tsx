'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const User = () => {
  const { data: session } = useSession();
  console.log('Client Session', session);
  return (
    <>
      <span>{session?.user?.email}</span>
      <span>{session?.user?.name}</span>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="user Avatar"
          width={40}
          height={40}
          className="h-auto w-auto"
        />
      )}
    </>
  );
};

export default User;

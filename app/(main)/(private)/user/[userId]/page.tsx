import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import ProfileSection from './profile-section';

const User = async ({ params }: { params: { userId: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return (
    <main className="bg-white-[#F6F7F9] space-y-5 py-6 md:space-y-[52px] md:pb-[120px] md:pt-[68px]">
      <ProfileSection session={session} />
    </main>
  );
};

export default User;

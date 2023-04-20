import Image from 'next/image';
import { Session } from 'next-auth';

type ProfileSectionProps = {
  session: Session;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ session }) => {
  return (
    <section className="rounded-lg px-6 md:px-[64px]">
      <h2 className="mb-6 text-xl font-bold md:mb-[30px]">My Profile</h2>
      <div className="mt-4 flex h-[301px] w-full flex-col">
        <div className="relative h-1/2 overflow-hidden rounded-tl-[10px] rounded-tr-[10px] lg:h-[65%]">
          <Image
            src="/images/cover-mobile.png"
            alt="Cover photo"
            fill
            className="object-cover lg:hidden"
          />
          <Image
            src="/images/cover-desktop.png"
            alt="Cover photo"
            fill
            className="hidden object-cover lg:block"
          />
          <button className="absolute bottom-2.5 right-2.5 bg-transparent text-white lg:bottom-[23px] lg:right-[50px]">
            <span className="bg-white-0/[.40] inline-block rounded">
              <span className="inline-block px-5 py-2.5 text-[10px] text-white md:text-base">
                Edit Cover
              </span>
            </span>
          </button>
        </div>
        <div className="bg-white-0 relative flex h-1/2 flex-col justify-end rounded-bl-[10px] rounded-br-[10px] lg:h-[35%]">
          <div className="absolute bottom-[56px] ml-[13px] flex flex-col space-y-1.5 lg:bottom-[22px] lg:left-[31px] lg:flex-row lg:items-end">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="User avatar"
                width={70}
                height={70}
                className="lg:h-[160px] lg:w-[160px]"
              />
            )}

            <div className="lg:ml-8">
              <h3 className="mb-1.5 text-lg font-bold text-gray-900">
                {session?.user?.name}
              </h3>
              <p className="text-sm text-gray-900 lg:mb-2.5">Agent</p>
            </div>
          </div>

          <button className="text-white-0 mb-5 mr-2.5 self-end bg-blue-500 lg:mb-[35px] lg:mr-[50px]">
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProfileSection;

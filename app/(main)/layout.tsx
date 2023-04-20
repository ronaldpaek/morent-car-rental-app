import { dashboardConfig } from '@/config/dashboard';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

interface mainLayoutProps {
  children: React.ReactNode;
}

const mainLayout = ({ children }: mainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-[1] bg-white">
        <Navbar dashboardConfig={dashboardConfig} />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default mainLayout;

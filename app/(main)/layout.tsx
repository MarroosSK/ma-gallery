import Sidebar from "./_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex dark:bg-[#1F1F1F]">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;

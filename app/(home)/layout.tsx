import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-screen flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

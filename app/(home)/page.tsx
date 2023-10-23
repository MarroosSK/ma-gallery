import React from "react";
import Hero from "./_components/hero";

const HomePage = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
      <Hero />
    </div>
  );
};

export default HomePage;

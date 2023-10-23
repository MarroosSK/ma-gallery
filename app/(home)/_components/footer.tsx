import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex flex-row md:items-center w-full p-6  bg-background dark:bg-[#1F1F1F] border-t shadow-sm">
      <h2 className="text-1xl font-semibold text-slate-500">MAGallery</h2>
      <div className=" w-full justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;

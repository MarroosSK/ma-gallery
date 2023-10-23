"use client";

import { Button } from "@/components/ui/button";
import { useImage } from "@/hooks/use-image";

import Image from "next/image";
import { useState } from "react";
import { EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import { Toggle } from "@/components/ui/toggle";
import { usePreviewImage } from "@/hooks/use-preview-image";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { ImagePlus, Image as Imageicon, Projector, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "../../globals.css";

const SingleAlbum = ({ initialData }: any) => {
  const [switcher, setSwitcher] = useState("swiper");
  const imagePreview = usePreviewImage();
  const add = useImage();
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const handleDelete = async (id: string) => {
    setCurrentlyDeletingFile(id);

    const deletedFile = await axios.delete(`/api/albums/photo/${id}`);

    if (deletedFile) {
      toast.success("Succesfully deleted!");
      setCurrentlyDeletingFile(null);
      router.refresh();
    } else {
      toast.error("Error has occured!");
    }
  };

  //console.log(initialData.id);

  const handleAddToAlbum = () => {
    add.setAlbumId(initialData.id);
    add.onOpen();
  };

  const handlePreview = (url: string) => {
    imagePreview.setUrl(url);
    imagePreview.onOpen();
  };
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-4xl text-slate-500">
          {initialData.name}
        </h1>
        <Button
          variant="outline"
          onClick={handleAddToAlbum}
          className="flex items-center gap-x-2"
        >
          Add Photo <ImagePlus />
        </Button>
      </div>
      <div className="w-[75px] bg-transparent rounded-md">
        <Toggle
          size="sm"
          pressed={switcher === "swiper"}
          onPressedChange={() => setSwitcher("swiper")}
        >
          <Projector className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={switcher === ""}
          onPressedChange={() => setSwitcher("")}
        >
          <Imageicon className="h-4 w-4" />
        </Toggle>
      </div>
      {switcher === "swiper" ? (
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="mySwiper"
        >
          {initialData.photo &&
            initialData.photo.map((pic: any, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={pic.url}
                  alt="product preview"
                  width={400}
                  height={500}
                  quality={100}
                  className="rounded-md bg-white dark:bg-slate-800  p-4 shadow-2xl ring-1 ring-indigo-900/10"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          {initialData.photo &&
            initialData.photo.map((pic: any, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={pic.url}
                  alt="product preview"
                  width={250}
                  height={250}
                  quality={100}
                  className="rounded-md bg-white dark:bg-slate-800 p-4 shadow-2xl ring-1 ring-indigo-900/10 cursor-pointer"
                  onClick={() => handlePreview(pic.url)}
                />
                <Button
                  variant="outline"
                  onClick={() => handleDelete(pic.id)}
                  className=" absolute top-1 right-1"
                >
                  <Trash className="text-red-500 h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
      )}
      {initialData.photo && initialData.photo.length === 0 && (
        <h2 className="min-h-[27px] text-sm py-1 pr-3 w-full  flex items-center text-muted-foreground font-medium pl-[12px]">
          No photo, start by clicking on add photo button
        </h2>
      )}
    </main>
  );
};

export default SingleAlbum;

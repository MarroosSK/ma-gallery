"use client";

import { Button } from "@/components/ui/button";
import { useImage } from "@/hooks/use-image";

import Image from "next/image";
import { useState } from "react";
import { EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";

import { Toggle } from "@/components/ui/toggle";
import { usePreviewImage } from "@/hooks/use-preview-image";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { ImagePlus, Image as Imageicon, Projector, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "../../globals.css";
import { SkeletonImage } from "@/components/skeletons/skeleton-image";

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
    <main className="mx-auto max-w-7xl p-3 md:p-6">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-2xl md:text-4xl text-primary">
          {initialData.name}
        </h1>
        <Button
          onClick={handleAddToAlbum}
          size="sm"
          variant="ghost"
          className="border border-primary flex items-center gap-x-2"
        >
          Add Photo <ImagePlus />
        </Button>
      </div>
      <div className="flex gap-x-3 bg-transparent rounded-md">
        <div className="flex flex-col">
          <Toggle
            size="sm"
            pressed={switcher === "swiper"}
            onPressedChange={() => setSwitcher("swiper")}
          >
            <Imageicon className="h-4 w-4" />
          </Toggle>
          <p className="text-xs text-muted-foreground">Classic</p>
        </div>
        <div className="flex flex-col">
          <Toggle
            size="sm"
            pressed={switcher === ""}
            onPressedChange={() => setSwitcher("")}
          >
            <Projector className="h-4 w-4" />
          </Toggle>
          <p className="text-xs text-muted-foreground">Swiper</p>
        </div>
      </div>
      {switcher === "swiper" ? (
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          {!initialData.photos && Array(6).fill(<SkeletonImage />)}
          {initialData.photos &&
            initialData.photos.map((pic: any, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={pic.url}
                  alt="product preview"
                  width={400}
                  height={400}
                  quality={100}
                  className="h-[400px] rounded-md bg-white dark:bg-[#292524] p-4  cursor-pointer"
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
      ) : (
        <Swiper
          grabCursor={true}
          effect={"flip"}
          modules={[EffectFlip]}
          className="mySwiper"
        >
          {initialData.photos &&
            initialData.photos.map((pic: any, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={pic.url}
                  alt="product preview"
                  width={400}
                  height={500}
                  quality={100}
                  className="h-[400px] rounded-md bg-white dark:bg-slate-800   shadow-2xl"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {initialData.photos && initialData.photos.length === 0 && (
        <div className="mt-[220px] flex flex-col items-center gap-2">
          <Imageicon className="h-16 w-16 text-primary" />
          <h2 className=" text-lg py-1   text-muted-foreground font-medium ">
            0 photos in this album , start by clicking on add photo button
          </h2>
        </div>
      )}
    </main>
  );
};

export default SingleAlbum;

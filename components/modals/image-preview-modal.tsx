"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { usePreviewImage } from "@/hooks/use-preview-image";
import Image from "next/image";

export const ImagePreviewModal = () => {
  const image = usePreviewImage();

  return (
    <Dialog open={image.isOpen} onOpenChange={image.onClose}>
      <DialogContent className="w-1/2">
        {image.url && (
          <Image
            src={image.url}
            alt="product preview"
            width={250}
            height={250}
            quality={100}
            className="w-full h-full rounded-md bg-white p-4 shadow-2xl ring-1 ring-indigo-900/10"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

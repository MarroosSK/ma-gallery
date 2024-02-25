"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { usePreviewImage } from "@/hooks/use-preview-image";
import Image from "next/image";
import { SkeletonImage } from "../skeletons/skeleton-image";

export const ImagePreviewModal = () => {
  const image = usePreviewImage();

  return (
    <Dialog open={image.isOpen} onOpenChange={image.onClose}>
      <DialogContent className="mx-4">
        {!image.url && <SkeletonImage />}
        {image.url && (
          <Image
            src={image.url}
            alt="product preview"
            width={350}
            height={350}
            quality={100}
            className="w-full h-full rounded-md  p-4  "
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

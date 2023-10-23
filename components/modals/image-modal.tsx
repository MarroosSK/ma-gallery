"use client";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useImage } from "@/hooks/use-image";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ImageModal = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const image = useImage();
  const { edgestore } = useEdgeStore();
  //console.log(image.albumId);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    image.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: image.url,
        },
      });
      try {
        await axios.post("/api/albums/photo", {
          url: res.url,
          albumId: image.albumId,
        });
        toast.success("Photo has been added!");
        router.refresh();
      } catch (error) {
        toast.error("Could not add your photo!");
      } finally {
        onClose();
      }
    }
  };

  return (
    <Dialog open={image.isOpen} onOpenChange={image.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Add Picture</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Picture</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Add image in .jpg format
            </span>
          </div>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

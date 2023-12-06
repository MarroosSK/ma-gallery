"use client";

import { useEffect, useState } from "react";
import * as z from "zod";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// query client
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSidebarUpdate } from "@/hooks/use-sidebar-refresh";

//schema
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreateButton = () => {
  const { onUpdate } = useSidebarUpdate();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  //extract states from form
  const { isSubmitting, isValid } = form.formState;

  //ak posielam request na API, vyuzivam async
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await axios.post(`/api/albums/create`, values);
      if (data) {
        toast.success("Albums has been created!");
        setIsOpen(false);
        onUpdate();
        router.refresh();
      }
    } catch (error) {
      toast.error("Error has occured, could not create album!");
    }
  };

  // const mutation = useMutation({
  //   mutationFn: onSubmit,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["albums"] });
  //   },
  // });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button
          size="sm"
          variant="outline"
          className="mt-3 flex items-center g-x-2"
        >
          new album <ArrowRight />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g: 'Fishing, Family, Sport'"
                      {...field} //replaces value | onChange
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create album
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;

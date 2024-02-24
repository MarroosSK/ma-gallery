import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/providers/modal-provider";
import QueryClientProv from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAGallery app",
  description: "Create albums and save images.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProv>
            <EdgeStoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position="bottom-center" />
                <ModalProvider />
                {children}
              </ThemeProvider>
            </EdgeStoreProvider>
          </QueryClientProv>
        </body>
      </html>
    </ClerkProvider>
  );
}

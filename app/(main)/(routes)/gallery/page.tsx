import prisma from "@/lib/prismadb";
import Albums from "../../_components/albums";
import { currentUser } from "@clerk/nextjs";

const fetchResumes = async (userId: string) => {
  try {
    const albumData = await prisma.album.findMany({
      where: {
        userId: userId,
      },
      include: {
        photos: true,
      },
    });
    if (!albumData) {
      throw new Error("No data found");
    }
    if (albumData) {
      return albumData;
    }
  } catch (error) {
    console.error("[FETCH_ERROR]", error);
  }
};

const GalleryPage = async () => {
  const user = await currentUser();
  const albumData = await fetchResumes(user?.id as string);
  //console.log(albumData);

  return (
    <>
      <Albums myAlbums={albumData} />
    </>
  );
};
export default GalleryPage;

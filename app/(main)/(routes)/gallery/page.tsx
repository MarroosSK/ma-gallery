import prisma from "@/lib/prismadb";
import Albums from "../../_components/albums";

const fetchResumes = async () => {
  try {
    const albumData = await prisma.album.findMany({
      include: {
        photos: true,
      },
    });

    if (albumData) {
      return albumData;
    }
  } catch (error) {
    console.error("[FETCH_ERROR]", error);
  }
};

const GalleryPage = async () => {
  const albumData = await fetchResumes();
  //console.log(albumData);

  return (
    <>
      <Albums myAlbums={albumData} />
    </>
  );
};
export default GalleryPage;

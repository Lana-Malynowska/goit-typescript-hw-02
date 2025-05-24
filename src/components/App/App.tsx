import { useEffect, useRef, useState } from "react";
import { fetchPhotos } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import ImageModal from "../ImageModal/ImageModal";

import "./App.css";
import { Photo } from "../../services/api.types";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setLoading(true);
        const { photos: newPhotos, totalPages } = await fetchPhotos(
          query,
          page
        );
        setPhotos((prev) => (page === 1 ? newPhotos : [...prev, ...newPhotos]));

        setHasMore(page < totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  useEffect(() => {
    if (page === 1 || !galleryRef.current) return;

    galleryRef.current.scrollTo({
      top: galleryRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [photos, page]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ImageGallery
            photos={photos}
            onPhotoClick={handlePhotoClick}
            galleryRef={galleryRef}
          />
          {loading && (
            <RingLoader
              color="#646cff"
              size={50}
              cssOverride={{
                margin: "0 auto",
              }}
            />
          )}
          {photos.length > 0 && hasMore && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
      />
    </>
  );
}

export default App;

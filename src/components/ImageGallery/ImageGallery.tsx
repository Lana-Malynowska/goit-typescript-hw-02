import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { ImageGalleryProps } from "./ImageGallery.types";

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onPhotoClick,
  galleryRef,
}) => {
  if (!photos || photos.length === 0) return null;

  return (
    <ul className={s.gallery} ref={galleryRef}>
      {photos.map((photo) => (
        <li key={photo.id}>
          <ImageCard
            src={photo.urls.small}
            alt={photo.alt_description || "Image"}
            onClick={() => onPhotoClick(photo)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

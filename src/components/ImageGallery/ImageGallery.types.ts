import { Photo } from "../../services/api.types";

export interface ImageGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  galleryRef: React.RefObject<HTMLUListElement | null>;
}

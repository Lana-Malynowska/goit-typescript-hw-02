import { Photo } from "../../services/api.types";

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: Photo | null;
}

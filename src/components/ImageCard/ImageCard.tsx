import s from "./ImageCard.module.css";
import { ImageCardProps } from "./ImageCard.types";

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div className={s.card} onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;

import { LoadMoreBtnProps } from "./LoadMoreBtn.types";

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Load More</button>
    </div>
  );
};

export default LoadMoreBtn;

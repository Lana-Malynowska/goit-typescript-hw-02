export interface Photo {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

export interface FetchPhotoResponse {
  photos: Photo[];
  totalPages: number;
}

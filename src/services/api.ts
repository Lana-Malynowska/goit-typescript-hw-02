import axios from "axios";
import { FetchPhotoResponse } from "./api.types";

const ACCESS_KEY = "OSeuIjMbgAWay-G5vd_EUQMOjiT7fsZg9e82ZD6HoK0";

export const fetchPhotos = async (
  query: string,
  page: number = 1
): Promise<FetchPhotoResponse> => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
    params: {
      query,
      page,
      per_page: 12,
    },
  });

  return {
    photos: response.data.results,
    totalPages: response.data.total_pages,
  };
};

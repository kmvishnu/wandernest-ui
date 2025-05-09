import { HotelResponse } from "@/types/type";
import apiClient from "./apiClient";

export const getHotels = async (): Promise<HotelResponse> => {
  const response = await apiClient.post<HotelResponse>("/getHotels", {}, {
    headers: { 'Skip-Auth': 'true' }
  });
  return response.data;
};
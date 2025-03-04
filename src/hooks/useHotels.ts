import { useQuery } from "@tanstack/react-query";
import { HotelResponse } from "@/types/type";
import { getHotels } from "@/api/public";

export function useHotels() {
  return useQuery<HotelResponse>({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
}

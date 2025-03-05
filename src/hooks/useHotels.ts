import { useQuery } from "@tanstack/react-query";
import { HotelResponse } from "@/types/type";
import { getHotels } from "@/api/public";
import { BookingDetails, getBookedHotels } from "@/api/hotel";

export function useHotels() {
  return useQuery<HotelResponse>({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
}

export function useBookings() {
  return useQuery<BookingDetails>({
    queryKey: ["bookings"],
    queryFn: getBookedHotels,
  });
}


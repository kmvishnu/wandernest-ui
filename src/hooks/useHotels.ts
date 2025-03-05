import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HotelResponse } from "@/types/type";
import { getHotels } from "@/api/public";
import { BookingDetails, getBookedHotels } from "@/api/hotel";
import { createBookingApi, createCheckInApi } from "@/api/hotel";

interface Member {
  name: string;
  age: number;
  adhar: string | null;
}

interface CreateBookingData {
  members: Member[];
  checkinDate: string;
  checkoutDate: string;
}

interface CreateCheckInData {
  members: Member[];
}

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

export const useCreateBooking = () => {
  return useMutation<void, AxiosError, CreateBookingData>({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      console.log("Booking successful:", data);
      // Handle success (e.g., show success message, refetch bookings)
    },
    onError: (error) => {
      console.error("Booking failed:", error.message);
      // Handle error (e.g., show error message)
    },
  });
};

export const useCreateCheckIn = () => {
  return useMutation<void, AxiosError, CreateCheckInData>({
    mutationFn: createCheckInApi,
    onSuccess: (data) => {
      console.log("Check-in successful:", data);
      // Handle success (e.g., show success message, refetch bookings)
    },
    onError: (error) => {
      console.error("Check-in failed:", error.message);
      // Handle error (e.g., show error message)
    },
  });
};
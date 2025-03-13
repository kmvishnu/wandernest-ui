import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HotelResponse } from "@/types/type";
import { getHotels } from "@/api/public";
import { BookingDetails, BookingResponse, cancelBookingApi, CheckInResponse, getBookedHotels, MemberDetails } from "@/api/hotel";
import { createBookingApi, createCheckInApi } from "@/api/hotel";

interface CreateBookingData {
  members: MemberDetails[];
  checkIn: string;
  checkOut: string;
  hotelId: string;
  hotelName: string;
}

export interface CreateCheckInData {
  bookingId: string;
  members: MemberDetails[];
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
  return useMutation<BookingResponse, AxiosError, CreateBookingData>({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      console.log("Booking successful:", data);
    },
    onError: (error) => {
      console.error("Booking failed:", error.message);
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<BookingDetails, AxiosError, string>({
    mutationFn: cancelBookingApi,
    onSuccess: (data) => {
      console.log("Booking cancelled:", data);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error("Cancellation failed:", error.message);
    },
  });
};

export const useCreateCheckIn = () => {
  return useMutation<CheckInResponse, AxiosError, CreateCheckInData>({
    mutationFn: createCheckInApi,
    onSuccess: (data) => {
      console.log("Check-in successful:", data);
    },
    onError: (error) => {
      console.error("Check-in failed:", error.message);
    },
  });
};
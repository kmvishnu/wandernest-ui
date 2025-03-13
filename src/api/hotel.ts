import apiClient from "./apiClient";

export interface MemberDetails {
  name: string;
  age: number;
  aadhar: string | null;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  contact: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  imageUrls: string[];
  amenities: string[];
  policies: string[];
  reviews: string[];
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  members: MemberDetails[];
  bookedOn: string;
  isCheckedIn: boolean;
  hotel: Hotel;
}

export interface BookingDetails {
  status: string;
  bookings: Booking[];
}
export interface BookingResponse {
  status: string;
  bookings: Booking;
}

export const getBookedHotels = async (): Promise<BookingDetails> => {
  const response = await apiClient.get<BookingDetails>("/getBookings");
  return response.data;
};

export const createBookingApi = async (data: { hotelId: string, hotelName: string, members: MemberDetails[], checkIn: string, checkOut: string }): Promise<BookingResponse> => {
  const response = await apiClient.post<BookingResponse>("/bookHotel", data);
  return response.data;
};

export const cancelBookingApi = async (bookingId: string): Promise<BookingDetails> => {
  const response = await apiClient.delete<BookingDetails>(`/cancelBooking`, {
    params: { id: bookingId },
  });
  return response.data;
};

export const createCheckInApi = async (data: { members: MemberDetails[] }): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Check-in created:", data);
      resolve();
    }, 1000);
  });
};
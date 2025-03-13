import apiClient from "./apiClient";

export interface MemberDetails {
  name: string;
  age: number;
  aadhar: string | null;
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
}

export interface BookingDetails {
  status: string;
  bookings: Booking[];
}

export const getBookedHotels = async (): Promise<BookingDetails> => {
  const response = await apiClient.get<BookingDetails>("/getBookings");
  return response.data;
};

export const createBookingApi = async (data: {hotelId:string, hotelName:string, members: MemberDetails[], checkinDate: string, checkoutDate: string }): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Booking created:", data);
      resolve();
    }, 1000);
  });
};

export const createCheckInApi = async (data: { members: MemberDetails[] }): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Check-in created:", data);
      resolve();
    }, 1000);
  });
};
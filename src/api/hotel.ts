export interface MemberDetails {
    name: string;
    age: number;
    adhar: string | null;
  }
  
  export interface Booking {
    id: string;
    hotelId: string;
    hotelName: string;
    memberDetails: MemberDetails[];
    isCheckedIn: boolean;
    bookedOn: string;
    checkinDate: string;
    checkoutDate: string;
  }
  
  export interface BookingDetails {
    status: string;
    bookings: Booking[];
  }
  
  export const getBookedHotels = async (): Promise<BookingDetails> => {
    // const response = await api.get<BookingDetails>("/Bookings");
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          bookings: [
            {
              id: "1",
              hotelId: "1",
              hotelName: "Hotel Sunshine",
              memberDetails: [
                { name: "Alice", age: 30, adhar: null },
                { name: "John", age: 35, adhar: null },
              ],
              isCheckedIn: false,
              bookedOn: "2025-03-01",
              checkinDate: "2025-03-10",
              checkoutDate: "2025-03-15",
            },
            {
              id: "2",
              hotelId: "3",
              hotelName: "Hotel Moonlight",
              memberDetails: [
                { name: "Bob", age: 25, adhar: null },
                { name: "Jane", age: 28, adhar: null },
              ],
              isCheckedIn: false,
              bookedOn: "2025-03-02",
              checkinDate: "2025-03-12",
              checkoutDate: "2025-03-18",
            },
          ],
        });
        // reject({ message: "Invalid email or password" });
      }, 2000);
    });
  };
  
  export const createBookingApi = async (data: { members: MemberDetails[], checkinDate: string, checkoutDate: string }): Promise<void> => {
   console.log("ddd",data)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Booking createdd:", data);
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
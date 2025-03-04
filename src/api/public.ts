import { HotelResponse } from "@/types/type";

export const getHotels = async (): Promise<HotelResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          data: [
            {
              id: "1",
              name: "Sunset Resort",
              image: "/images/hotel1.jpg",
              location: "Maldives",
              price: 250,
            },
            {
              id: "2",
              name: "Mountain View Lodge",
              image: "/images/hotel2.jpg",
              location: "Switzerland",
              price: 180,
            },
            {
              id: "3",
              name: "City Lights Hotel",
              image: "/images/hotel3.jpg",
              location: "New York",
              price: 300,
            },
            {
                id: "4",
                name: "Treetop Hotel",
                image: "/images/hotel4.jpg",
                location: "Thailand",
                price: 300,
              }
          ],
        });
      }, 2000);
    });
  };
  
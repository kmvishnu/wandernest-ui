
export interface Hotel {
    id: string;
    name: string;
    image: string;
    location: string;
    price: number;
  }
  
  export interface HotelResponse {
    status: string;
    data: Hotel[];
  }
  
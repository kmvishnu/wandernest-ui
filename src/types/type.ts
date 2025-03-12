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

export interface HotelResponse {
  status: string;
  hotels: Hotel[];
}
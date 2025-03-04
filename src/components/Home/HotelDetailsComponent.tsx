import { useParams } from "react-router-dom";
import { useHotels } from "@/hooks/useHotels";

export default function HotelDetailsComponent() {
    const { id } = useParams();
    const { data } = useHotels();
  
    const hotel = data?.data.find((hotel) => hotel.id === id);
  
    if (!hotel) {
      return <p className="text-center text-lg">Hotel not found!</p>;
    }
  
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <img src={hotel.image} alt={hotel.name} className="w-full max-w-lg rounded-lg" />
        <p className="text-lg">📍 Location: {hotel.location}</p>
        <p className="text-lg">💰 Price: ${hotel.price} per night</p>
      </div>
    );
}

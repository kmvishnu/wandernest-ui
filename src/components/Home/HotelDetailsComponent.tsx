import { useParams } from "react-router-dom";
import { useHotels, useBookings } from "@/hooks/useHotels";
import { useEffect, useState } from "react";

export default function HotelDetailsComponent() {
  const { id } = useParams();
  const { data: hotelsData } = useHotels();
  const { data: bookingsData } = useBookings();
  const [isBooked, setIsBooked] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const hotel = hotelsData?.data.find((hotel) => hotel.id === id);

  useEffect(() => {
    if (bookingsData?.bookings) {
      const booking = bookingsData.bookings.find((booking) => booking.hotelId === id);
      if (booking) {
        setIsBooked(true);
        setIsCheckedIn(booking.isCheckedIn);
      }
    }
  }, [bookingsData, id]);

  if (!hotel) {
    return <p className="text-center text-lg">Hotel not found!</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 p-4">
      <div className="flex flex-col items-center lg:items-start lg:w-2/3">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <img src={hotel.image} alt={hotel.name} className="w-full max-w-lg rounded-lg" />
        <p className="text-lg">📍 Location: {hotel.location}</p>
        <p className="text-lg">💰 Price: ${hotel.price} per night</p>
        <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-8 w-full lg:w-auto hidden md:block">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full lg:w-auto"
            disabled={isBooked}
          >
            Book Now
          </button>
          <button
            className={`bg-green-500 text-white py-2 px-4 rounded-lg w-full lg:w-auto ${isBooked && !isCheckedIn ? '' : 'hidden'}`}
          >
            Check In
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center lg:items-start lg:w-1/3 lg:pl-4">
        <p className="text-lg mt-4 lg:mt-0">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec orci fermentum, a tincidunt nulla facilisis. Integer nec libero nec nulla facilisis tincidunt.</p>
        <p className="text-lg mt-4">Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec orci fermentum, a tincidunt nulla facilLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec orci fermentum, a tincidunt nulla facilisis. Integer nec libero nec nulla facilisis tincLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec orci fermentum, a tincidunt nulla facilisis. Integer nec libero nec nulla facilisis tincisis. Integer nec libero nec nulla facilisis tincidunt.</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around lg:hidden">
        <button
          className={` ${isBooked?"bg-slate-400 cursor-not-allowed":"bg-blue-500"} text-white py-2 px-4 rounded-lg w-full`}
          disabled={isBooked}
        >
          Book Now
        </button>
        <button
          className={`bg-green-500 text-white py-2 px-4 rounded-lg w-full ${isBooked && !isCheckedIn ? '' : 'hidden'}`}
        >
          Check In
        </button>
      </div>
    </div>
  );
}
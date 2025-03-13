import { useNavigate } from "react-router-dom";
import { useBookings } from "@/hooks/useHotels";

export default function BookingsComponent() {
  const { data: bookingsData } = useBookings();
  const navigate = useNavigate();

  const handleBookingClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  if (!bookingsData || bookingsData.bookings.length === 0) {
    return <p className="text-center text-lg">No bookings found!</p>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookingsData.bookings.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded-lg cursor-pointer"
            onClick={() => handleBookingClick(booking.hotelId)}
          >
            <img
              src={booking.hotel.imageUrls[0]}
              alt={booking.hotelName}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-bold">{booking.hotelName}</h2>
            <p className="text-gray-600">
              <span className="font-bold text-base">Check-in: </span>
              {formatDate(booking.checkInDate)}
            </p>
            <p className="text-gray-600">
            <span className="font-bold text-base">Check-out: </span>{formatDate(booking.checkOutDate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

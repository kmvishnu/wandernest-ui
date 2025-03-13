import { useParams } from "react-router-dom";
import {
  useHotels,
  useBookings,
  useCreateBooking,
  useCreateCheckIn,
  useCancelBooking,
} from "@/hooks/useHotels";
import { useEffect, useState } from "react";
import BookingModal from "../modals/BookingModal";
import CheckInModal from "../modals/CheckInModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";

export default function HotelDetailsComponent() {
  const { id } = useParams();
  const { data: hotelsData } = useHotels();
  const { data: bookingsData } = useBookings();
  const queryClient = useQueryClient();
  const createBooking = useCreateBooking();
  const createCheckIn = useCreateCheckIn();
  const cancelBooking = useCancelBooking();
  const [isBooked, setIsBooked] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const hotel = hotelsData?.hotels.find((hotel) => hotel.id === id);

  useEffect(() => {
    if (bookingsData?.bookings) {
      const booking = bookingsData.bookings.find(
        (booking) => booking.hotelId === id
      );
      if (booking) {
        setIsBooked(true);
        setIsCheckedIn(booking.isCheckedIn);
      }
    }
  }, [bookingsData, id]);

  const handleBookingSubmit = (members: any, checkIn: any, checkOut: any) => {
    createBooking.mutate(
      {
        members,
        checkIn,
        checkOut,
        hotelId: hotel?.id || "",
        hotelName: hotel?.name || "",
      },
      {
        onSuccess: () => {
          toast.success("Booking successful!");
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
          setShowBookingModal(false);
        },
        onError: () => {
          toast.error("Booking failed!");
        },
      }
    );
  };

  const handleCheckInSubmit = (members: any) => {
    createCheckIn.mutate(
      { members },
      {
        onSuccess: () => {
          toast.success("Check-in successful!");
          setShowCheckInModal(false);
        },
        onError: () => {
          toast.error("Check-in failed!");
        },
      }
    );
  };

  const handleCancelBooking = () => {
    const booking = bookingsData?.bookings.find(
      (booking) => booking.hotelId === id
    );
    if (booking) {
      cancelBooking.mutate(booking.id, {
        onSuccess: () => {
          toast.success("Booking cancelled successfully!");
          setIsBooked(false);
          setShowCancelDialog(false);
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: () => {
          toast.error("Failed to cancel booking!");
        },
      });
    }
  };

  if (!hotel) {
    return <p className="text-center text-lg">Hotel not found!</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 p-4">
      <ToastContainer />
      <div className="flex flex-col items-center lg:items-start lg:w-2/3">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full max-w-lg rounded-lg"
        />
        <p className="text-lg">📍 Location: {hotel.location}</p>
        <p className="text-lg">💰 Price: {hotel.price} per night</p>
        <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-8 w-full lg:w-auto hidden md:block">
          {!isBooked && (
            <button
              className="bg-black text-white py-2 px-4 rounded-lg w-full lg:w-auto"
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </button>
          )}

          {isBooked && (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg w-full lg:w-auto"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Booking
            </button>
          )}

          {isBooked && !isCheckedIn && (
            <button
              className="bg-black text-white py-2 px-4 rounded-lg w-full lg:w-auto"
              onClick={() => setShowCheckInModal(true)}
            >
              Check In
            </button>
          )}

        </div>
      </div>
      <div className="flex flex-col items-center lg:items-start lg:w-1/3 lg:pl-4">
        <p className="text-lg mt-4 lg:mt-0">Description: {hotel.description}</p>
        <p className="text-lg mt-4">
          Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam scelerisque leo nec orci fermentum, a tincidunt nulla
          facilLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo nec orci fermentum, a tincidunt nulla facilisis.
          Integer nec libero nec nulla facilisis tincLorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam scelerisque leo nec orci
          fermentum, a tincidunt nulla facilisis. Integer nec libero nec nulla
          facilisis tincisis. Integer nec libero nec nulla facilisis tincidunt.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around lg:hidden">
        {!isBooked && (
          <button
            className="bg-black text-white py-2 px-4 rounded-lg w-full lg:w-auto"
            onClick={() => setShowBookingModal(true)}
          >
            Book Now
          </button>
        )}

        {isBooked && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg w-full lg:w-auto"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel Booking
          </button>
        )}

        {isBooked && !isCheckedIn && (
          <button
            className="bg-black text-white py-2 px-4 rounded-lg w-full lg:w-auto"
            onClick={() => setShowCheckInModal(true)}
          >
            Check In
          </button>
        )}
      </div>
      {showBookingModal && (
        <BookingModal
          hotelName={hotel.name}
          price={hotel.price}
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
      {showCheckInModal && (
        <CheckInModal
          members={
            bookingsData?.bookings.find((booking) => booking.hotelId === id)
              ?.members || []
          }
          onClose={() => setShowCheckInModal(false)}
          onSubmit={handleCheckInSubmit}
        />
      )}
      {showCancelDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg mb-4">
              Are you sure you want to cancel the booking?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                onClick={() => setShowCancelDialog(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={handleCancelBooking}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface Member {
  name: string;
  age: number;
}

interface BookingModalProps {
  hotelName: string;
  price: number;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (members: Member[], checkinDate: string, checkoutDate: string) => void;
}

export default function BookingModal({ hotelName, price, onClose, onSubmit, isLoading }: BookingModalProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [newMember, setNewMember] = useState<Member>({ name: "", age: 0 });
  const [error, setError] = useState<string | null>(null);

  const handleAddMember = () => {
    if (newMember.name.length < 2 || newMember.name.length > 20) {
      setError("Name should be between 2 and 20 characters.");
      return;
    }
    if (newMember.age <= 0 || newMember.age > 120) {
      setError("Age should be between 1 and 120.");
      return;
    }
    setError(null);
    if (members.length < 10 && newMember.name && newMember.age) {
      setMembers([...members, newMember]);
      setNewMember({ name: "", age: 0 });
    }
  };

  const handleSubmit = () => {
    if (!checkinDate || !checkoutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(checkoutDate) < new Date(checkinDate)) {
      setError("Check-out date cannot be earlier than check-in date.");
      return;
    }
    if (members.length === 0) {
      setError("Please add at least one member.");
      return;
    }
    setError(null);
    const formattedCheckinDate = new Date(checkinDate).toISOString();
    const formattedCheckoutDate = new Date(checkoutDate).toISOString();
    onSubmit(members, formattedCheckinDate, formattedCheckoutDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center py-5">
      <div className="bg-white p-6 rounded-lg w-96 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">Book Now - {hotelName}</h2>
        <p className="mb-4 text-black">Price: ${price}</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        
        <div className="mb-4">
          <label className="block mb-2 text-black">Check-in Date</label>
          <input
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            className="border p-2 rounded w-full mb-2 text-black"
            min={today}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-black">Check-out Date</label>
          <input
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="border p-2 rounded w-full mb-2 text-black"
            min={today}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-black">Add Member</label>
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="border p-2 rounded w-full mb-2 text-black"
          />
          <input
            type="number"
            placeholder="Age"
            value={newMember.age}
            onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) })}
            className="border p-2 rounded w-full mb-2 text-black"
          />
          <button onClick={handleAddMember} className="bg-black text-white py-2 px-4 rounded-lg w-full">
            Add Member
          </button>
        </div>
        <div className="mb-4 max-h-40 overflow-y-auto">
          {members.map((member, index) => (
            <div key={index} className="border p-2 rounded mb-2 text-black">
              <p>Name: {member.name}</p>
              <p>Age: {member.age}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#000" loading={isLoading} size={35} />
          </div>
        ) : (
          <>
            <button onClick={handleSubmit} className="bg-black text-white py-2 px-4 rounded-lg w-full mb-2">
              Submit
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg w-full">
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
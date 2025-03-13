import { MemberDetails } from "@/api/hotel";
import { useState } from "react";

interface CheckInModalProps {
  members: MemberDetails[];
  onClose: () => void;
  onSubmit: (members: MemberDetails[]) => void;
}

export default function CheckInModal({
  members: initialMembers,
  onClose,
  onSubmit,
}: CheckInModalProps) {
  const [members, setMembers] = useState<MemberDetails[]>(initialMembers);

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index].aadhar = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = () => {
    onSubmit(members);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Check In</h2>
        {members.map((member, index) => (
          <div key={index} className="mb-2">
            <p className="mb-1">
              {member.name} (Age: {member.age})
            </p>
            <input
              type="text"
              placeholder="Adhar Number"
              value={member.aadhar || ""}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mb-2"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}

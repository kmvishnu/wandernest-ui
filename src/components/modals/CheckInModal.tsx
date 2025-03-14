import { MemberDetails } from "@/api/hotel";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface CheckInModalProps {
  members: MemberDetails[];
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (members: MemberDetails[]) => void;
}

export default function CheckInModal({
  members: initialMembers,
  onClose,
  onSubmit,
  isLoading
}: CheckInModalProps) {
  const [members, setMembers] = useState<MemberDetails[]>(initialMembers);
  const [errors, setErrors] = useState<string[]>(Array(initialMembers.length).fill(""));

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index].aadhar = value;
    setMembers(updatedMembers);

    const updatedErrors = [...errors];
    if (!/^\d{12}$/.test(value)) {
      updatedErrors[index] = "Aadhar number must be 12 digits";
    } else {
      updatedErrors[index] = "";
    }
    setErrors(updatedErrors);
  };

  const handleSubmit = () => {
    const hasErrors = errors.some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix the errors before submitting.");
      return;
    }
    onSubmit(members);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[70%] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Check In</h2>
        <div className="flex-1 overflow-y-auto mb-4">
          {members.map((member, index) => (
            <div key={index} className="mb-2">
              <p className="mb-1">
                {member.name} (Age: {member.age})
              </p>
              <input
                type="text"
                placeholder="Aadhar Number"
                value={member.aadhar || ""}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errors[index] && (
                <p className="text-red-500 text-sm mt-1">{errors[index]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#000" loading={isLoading} size={35} />
            </div>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="bg-black text-white py-2 px-4 rounded-lg w-full"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-black py-2 px-4 rounded-lg w-full"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
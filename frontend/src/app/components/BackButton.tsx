"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back(); // Go back if there's history
        } else {
          router.push("/"); // Go home if no history
        }
      }}
      className="flex cursor-pointer items-center text-sm text-green-500 hover:text-black gap-2 px-3 py-2"
    >
      <FaArrowLeft className="text-base" />
      <span>Back</span>
    </button>
  );
}

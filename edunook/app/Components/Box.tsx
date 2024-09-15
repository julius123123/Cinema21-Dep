"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Place } from "../Objects/Place";

interface BoxProps {
  placeName: string;
  openingHours: string;
  imageUrl: string;
  place?: Place;
}

const Box: React.FC<BoxProps> = ({ place, placeName, openingHours, imageUrl }) => {
  const router = useRouter();

  const handleClick = () => {
    if (place && place._id) {
      router.push(`/Pages/StudySpace/${place._id}`);
    } else {
      console.error("place._id is undefined");
    }
  };

  return (
    <button className="flex flex-col p-8 border-none overflow-hidden w-72 cursor-pointer items-center transition-colors duration-300 rounded-2xl bg-transparent hover:bg-gray-200" onClick={handleClick}>
      <img src={imageUrl} alt={placeName} className="w-full h-52 object-cover rounded-2xl shadow-md" />
      <div className="p-4 flex flex-col items-center">
        <div className="text-xl font-bold mb-2 text-black text-center">{placeName}</div>
        <div className="text-sm text-blue-400 text-center bottom-0">Open {openingHours}</div>
      </div>
    </button>
  );
};

export default Box;

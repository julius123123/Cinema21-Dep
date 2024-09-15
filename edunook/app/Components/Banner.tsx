import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Box from "@/app/Components/Box";
import { Place } from "../Objects/Place";
import { useRouter } from "next/navigation";


const Banner: React.FC = () => {
  const router = useRouter();
  const handleSeeAll = () => {
    router.push("/Pages/StudySpace");
  };
  return (
    <div className="bg-[#7d98c3] p-10 rounded-2xl flex justify-between items-center mb-5 shadow-md relative bg-[url('/assets1.png')] bg-no-repeat bg-cover bg-right w-[1100px]">
      <div className="flex flex-col z-10">
        <h2 className="text-white text-3xl font-bold mb-6">Find the nearest Study Space near you or your campus</h2>
        <button onClick={handleSeeAll} className="px-5 py-2 bg-[#2e2e2e] text-white rounded-full hover:text-blue-500 hover:bg-gray-200 transition-colors duration-250 w-1/5">See All</button>
      </div>
    </div>
  );
};

export default Banner;

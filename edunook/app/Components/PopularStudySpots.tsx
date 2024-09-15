"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Box from "@/app/Components/Box";
import { Place } from "../Objects/Place";
import { useRouter } from "next/navigation";

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/places";

const PopularStudySpots: React.FC = () => {
  const router = useRouter();
  const handleSeeAll = () => {
    router.push("/Pages/StudySpace");
  };
  const [places, setPlaces] = useState<Place[]>([]);
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterFacilities, setFilterFacilities] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&fasilitas=${filterFacilities.toString()}&search=${search}`;
        const { data } = await axios.get(url);

        console.log("Fetched places:", data.places); // Log the places array

        if (data && Array.isArray(data.places)) {
          setPlaces(data.places);
        } else {
          console.error("Data received is not an array:", data.places);
          setPlaces([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllPlaces();
  }, [sort, filterFacilities, page, search]);

  return (
    <div className="mb-5 bg-white p-5 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold">Popular Study Spots</h3>
        <button onClick={handleSeeAll} className="text-[#6482AD] hover:underline cursor-pointer">
          See all
        </button>
      </div>
      <div className="pl-14 flex gap-24">
        <div className="flex flex-wrap gap-8">
          {places.slice(0,3).map((place) => (
            <Box 
            key={ place._id } 
            place={place}
            placeName={place.nama} 
            openingHours={`${place.buka}.00 - ${place.tutup}.00`} 
            imageUrl={place.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularStudySpots;

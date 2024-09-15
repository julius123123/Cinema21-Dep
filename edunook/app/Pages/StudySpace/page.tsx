"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/Components/Sidebar";
import Search from "@/app/Components/Search";
import Bubble from "@/app/Components/Bubble";
import Box from "@/app/Components/Box";
import Fasilitas from "@/app/Components/Fasilitas";
import { Place } from "@/app/Objects/Place";
import Pagination from "@/app/Components/Pagination";
import ProfileButton from "@/app/Components/ProfileButton";

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/places";
const profile_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/user";

function StudySpace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterFacilities, setFilterFacilities] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const limit = 8;
  const [username, setUsername] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null); 

  useEffect(() => {
    const userData = localStorage.getItem("user");
    
    if (userData) {
      const { username } = JSON.parse(userData);
      setUsername(username);
    
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${profile_url}/profile/${username}`);
          if (response.status === 200) {
            setUserProfile(response.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, []);
  
  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const url = `${base_url}?page=${page}&limit=${limit}&sort=${sort.sort},${sort.order}&fasilitas=${filterFacilities.toString()}&search=${search}${selectedCampus ? `&kampus=${selectedCampus}` : ""}`;

        const { data } = await axios.get(url);

        console.log("Fetched places:", data.places);

        if (data && Array.isArray(data.places)) {
          setPlaces(data.places);
          setTotal(data.total || 0);
        } else {
          console.error("Data received is not an array:", data.places);
          setPlaces([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllPlaces();
  }, [sort, filterFacilities, page, search, selectedCampus]);

  const allFacilities = Array.from(new Set(places.flatMap((place) => place.fasilitas || [])));

  const filteredPlaces = filterFacilities.length === 0 ? places : places.filter((place) =>
    filterFacilities.every((facility) => place.fasilitas?.includes(facility))
  );

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5 h-screen">
        <div className="flex flex-row">
        <Search 
          setSearch={(search) => setSearch(search)} 
        />
        {username && <ProfileButton username={username} />}
        </div>
        <div className="flex gap-7 my-5 mt-5 ml-8">
          <Bubble placeholderText="near ITB Ganesha" onClick={() => setSelectedCampus("ganesha")} />
          <Bubble placeholderText="near ITB Jatinangor" onClick={() => setSelectedCampus("jatinangor")} />
          <Bubble placeholderText="near ITB Cirebon" onClick={() => setSelectedCampus("cirebon")} />
        </div>
        <div className="flex gap-8 overflow-y-auto">
          <div className="flex-1 w-77/100">
            <div className="flex flex-wrap gap-4">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <Box 
                    key={place._id} 
                    place={place}
                    placeName={place.nama} 
                    openingHours={`${place.buka}.00 - ${place.tutup}.00`} 
                    imageUrl={place.img} 
                  />
                ))
              ) : (
                <p className="text-3xl font-bold text-gray-400">No places match the selected facilities...</p>
              )}
            </div>
          </div>
          <div className="w-23/100 text-black font-bold">
            <Fasilitas 
              fasilitas={allFacilities} 
              filterFacilities={filterFacilities} 
              setFilterFacilities={setFilterFacilities} 
            />
          </div>
        </div>
        <div>
          <Pagination 
            page={page}
            limit={limit}
            total={total}
            setPage={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default StudySpace;

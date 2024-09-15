"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import Banner from "./Components/Banner";
import PopularStudySpots from "./Components/PopularStudySpots";
import Reviews from "./Components/Review";
import "./globals.css";
import Search from "./Components/Search";
import Box from "./Components/Box";
import { Place } from "./Objects/Place";
import ProfileButton from "./Components/ProfileButton";

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/places";
const profile_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/user";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterFacilities, setFilterFacilities] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&fasilitas=${filterFacilities.toString()}&search=${search}`;
        const { data } = await axios.get(url);

        console.log("Respons dari backend:", data.places);

        if (data && Array.isArray(data.places)) {
          setPlaces(data.places);
        } else {
          console.error("Data yang diterima bukan array:", data.places);
          setPlaces([]);
        }
      } catch (err) {
        console.log(err);
        
      }
    };

    getAllPlaces();
  }, [sort, filterFacilities, page, search]);

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setIsVisible(searchValue.trim() !== "");
  };

  return (
    <div className="flex bg-[#f3eaea] min-h-screen max-h-full max-w-full">
      <Sidebar />
      <div className="flex-1 p-5">
        <div className="flex flex-row">
          <Search setSearch={handleSearchChange} />
          {username && <ProfileButton username={username} />}
        </div>
        {isVisible && (
          <>
            <div className="flex gap-4 my-5 ml-6" />
            <div className="flex flex-wrap gap-8 z-10 ">
              {places.map((place) => (
                <Box
                  key={place._id}
                  place={place}
                  placeName={place.nama}
                  openingHours={`${place.buka} - ${place.tutup}`}
                  imageUrl={place.img}
                />
              ))}
            </div>
          </>
        )}
        <div className="flex mt-2 z-0 min-w-screen">
          <div className="flex-2 mx-2 mt-5">
            <Banner />
            <PopularStudySpots />
          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default App;

'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "@/app/Components/Sidebar";
import { Place } from '@/app/Objects/Place';
import Search from '@/app/Components/Search';
import Box from '@/app/Components/Box';  
import Map from '@/app/Components/Map';
import ProfileButton from '@/app/Components/ProfileButton';


const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/places";
const profile_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/user";

const Placedetail = () => {
  const { id } = useParams(); 
  const [place, setPlace] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
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
    if (id) {
      const fetchPlace = async () => {
        try {
          const response = await axios.get(`${base_url}/${id}`);
          console.log("Response data:", response.data);
          setPlace(response.data);
        } catch (error) {
          console.error("Failed to fetch details", error);
        }
      };
      fetchPlace();
    }
  }, [id]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const url = `${base_url}?search=${search}`;
        const { data } = await axios.get(url);

        console.log("Search response:", data.places);

        if (data && Array.isArray(data.places)) {
          setPlaces(data.places);
        } else {
          console.error("Data is not an array:", data.places);
          setPlaces([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (search.trim()) {
      fetchPlaces();
      setIsVisible(true); 
    } else {
      setIsVisible(false); 
    }
  }, [search]);

  if (!place) {
    return <div>Loading...</div>;
  }

  const [lat, lng] = place.lokasi.split(",").map(Number);

  return (
    <div className="flex bg-[#f3eaea] min-h-screen min-w-screen max-h-full max-w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5">
        <div className="flex flex-row">
        <Search setSearch={(search) => setSearch(search)} />
        {username && <ProfileButton username={username} />}
        </div>
        {isVisible ? (
          <div className="flex flex-wrap gap-8 z-10 mt-5">
            {places.map((place) => (
              <Box
                key={place._id}
                place={place}
                placeName={place.nama}
                openingHours={`${place.buka}.00 - ${place.tutup}.00`}
                imageUrl={place.img}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 p-5 mt-6 text-black">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <img 
                src={place.img} 
                alt={place.nama} 
                className="rounded-md w-[1200px] h-[369px] object-cover"
              />
              <div className="col-span-2 grid grid-cols-2 gap-2">
              </div>
            </div>
            <h1 className="text-4xl font-bold">{place.nama}</h1>
            <div className="grid grid-cols-3 mt-8 mb-16">
              <div className="flex flex-col mr-16">
                <h2 className="text-2xl font-bold">Facilities</h2>
                  <ul className="mt-5 text-lg font-bold">
                    {place.fasilitas?.filter(facility => facility).map((facility, index) => (
                      <li 
                      className="my-1 mx-1"
                      key={index}>• {facility}
                      </li>
                    ))}
                  </ul>
              </div>
              <div className="flex flex-col">
                <h2
                  className="text-2xl font-bold">
                    Opening Hours
                </h2> 
              <ul className="mt-5 text-lg font-bold">
                <li className="my-1 flex justify-between">
                  <span>Monday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Tuesday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Wednesday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Thursday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Friday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Saturday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span>Sunday</span> 
                  <span>{place.buka}.00 - {place.tutup}.00</span>
                </li>
              </ul>
              </div>  
            </div>
            <h2 className="text-2xl font-bold mb-5">Location</h2>
            <Map 
              lat={lat} 
              lng={lng}
              />
          </div>
        )}
      </div>
    </div>
  );
}

export default Placedetail;

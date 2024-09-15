'use client';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/Components/Sidebar";
import ProfileButton from "@/app/Components/ProfileButton";

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null); 
  const router = useRouter();
  const { username } = useParams(); 

  useEffect(() => {
    if (username) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${base_url}/profile/${username}`);
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          router.push("/login");
        }
      };

      fetchUserProfile(); 
    }
  }, [username, router]);

  if (!user) {
    return <h1 className="text-black">Loading Profile...</h1>;
  }

  return (
    <div className="flex bg-[#f3eaea] min-h-screen max-h-full max-w-full">
      <Sidebar />
      <div className="flex-1 p-5">
        <div className="absolute top-0 right-0 pr-8 pt-8">
          <ProfileButton username={user.username} />
        </div>
        <div className="pl-[85px] pt-[85px]">
          <h1 className="text-black font-bold text-[50px]">Profile</h1>
          <div className="flex flex-row items-center mt-6">
            <img 
              src="/avatar.jpg" 
              alt="profile picture" 
              className="rounded-full w-[200px] mr-8" 
            />
            <h2 className="text-black text-[40px] font-bold">{user.username}</h2>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;

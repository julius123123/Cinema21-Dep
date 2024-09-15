"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {  } from "../Objects/Place";

interface BoxProps {
  username: string;
}

const ProfileButton: React.FC<BoxProps> = ({username}) => {
  const router = useRouter();
  const handleClick = () => {
    if (username) {
      router.push(`/profile/${username}`);
    } else {
      console.error("place._id is undefined");
    }
  }

  return (
    <button onClick = {handleClick}>
        <div className="flex flex-row gap-5 ml-10 mb-3 items-center">
            <img 
            src="/avatar.jpg" 
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"/>
            <h1 className="text-black font-bold text-2xl transition-colors duration-150 relative hover:text-[#6482AD]">{username}</h1>
        </div>
    </button>
  )
};

export default ProfileButton
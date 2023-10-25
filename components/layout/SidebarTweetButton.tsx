import React from "react";
import {FaFeatherAlt} from 'react-icons/fa'

const SidebarTweetButton = () => {
  return (
      <div className="w-fit md:w-full md:py-2 max-md:p-3 h-fit rounded-full bg-blue-500 items-center justify-center gap-x-3 font-bold text-sm mt-6 flex flex-row duration-300">
        <p className="hidden md:block">Tweet</p>
        <FaFeatherAlt size={22}/>
      </div>
  );
};

export default SidebarTweetButton;

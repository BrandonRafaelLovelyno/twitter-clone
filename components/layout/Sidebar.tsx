"use client";

import React from "react";
import { IconType } from "react-icons";
import { HiHomeModern } from "react-icons/hi2";
import { PiBellSimpleFill } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import SideBarItem from "./SideBarItem";
import SidebarLogo from "./SidebarLogo";
import { usePathname } from "next/navigation";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut, useSession } from "next-auth/react";
import { motion as m } from "framer-motion";

interface SidebarItem {
  label: string;
  href: string;
  Icon: IconType;
}

const Sidebar = () => {
  const session = useSession();
  const pathname = usePathname();
  const items: SidebarItem[] = [
    {
      label: "Home",
      href: "/",
      Icon: HiHomeModern,
    },
    {
      label: "Notification",
      href: "/notification",
      Icon: PiBellSimpleFill,
    },
    {
      label: "Profile",
      href: "/profile",
      Icon: IoMdPerson,
    },
  ];
  return (
    <m.div
      className="flex lg:flex-col max-lg:flex-row max-lg:items-center lg:items-start lg:justify-start max-lg:pb-4 max-lg:border-t-2 max-lg:justify-center px-3 gap-y-5 max-lg:gap-x-5 font-bold pt-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SidebarLogo />
      {items.map((item) => (
        <SideBarItem
          isActive={pathname === item.href}
          {...item}
          key={`${item.label}-icon`}
          auth={true}
        />
      ))}
      {session.data?.user && (
        <SideBarItem
          isActive={false}
          label="Log out"
          key={"log out-icon"}
          Icon={BiLogOut}
          auth={true}
          onClick={() => {
            signOut();
          }}
        />
      )}
      <SidebarTweetButton />
    </m.div>
  );
};

export default Sidebar;

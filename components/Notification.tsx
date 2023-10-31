import React from "react";
import SidebarLogo from "./layout/SidebarLogo";

interface NotificationProps {
  body: string;
}

const Notification: React.FC<NotificationProps> = ({ body }) => {
  return (
    <div className="w-full h-fit py-3 px-5 flex flex-row gap-x-5">
      <SidebarLogo />
      <div>
        <p className="text-left text-white text-md">{body}</p>
      </div>
    </div>
  );
};

export default Notification;

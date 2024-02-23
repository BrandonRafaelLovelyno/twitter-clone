import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Followbar from "@/components/layout/Followbar";
import Sidebar from "@/components/layout/Sidebar";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { twMerge } from "tailwind-merge";
import LoginModal from "@/components/modal/LoginModal";
import RegisterModal from "@/components/modal/RegisterModal";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import EditModal from "@/components/modal/EditModal";
import options from "@/hooks/libs/nextAuthOption";
import AnimatePresence from "@/components/AnimatePresence";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Twitter",
  description: "Twitter Clone by Brandon Rafael Lovelyno",
  icons: {
    icon: ["/icon/favicon.ico?v=4"],
    apple: ["/icon/apple-touch-icon.png?v=4"],
    shortcut: ["/icon/apple-touch-icon.png"],
  },
  manifest: "/icon/site.webmanifest",
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body
        className={twMerge(
          lato.className,
          "h-screen w-full",
          "bg-black text-white"
        )}
      >
        <SessionProvider session={session}>
          <Toaster />
          <EditModal />
          <RegisterModal />
          <LoginModal />
          <AnimatePresence>
            <div className="container mx-auto grid grid-cols-4 h-screen">
              <Sidebar />
              <div
                className={twMerge(
                  "lg:col-span-2 col-span-3 border-neutral-800 border-x-[1px] overflow-auto"
                )}
              >
                {children}
              </div>
              <Followbar />
            </div>
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

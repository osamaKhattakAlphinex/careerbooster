import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfileCreationLayer from "@/components/dashboard/ProfileCreationLayer";
import Footer from "@/components/dashboard/Layout/Footer";
import Header from "@/components/dashboard/Layout/Header";
import SideBar from "@/components/dashboard/Layout/SideBar";
import "./dashboard.css";
import "./plugins.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TourContextProvider } from "@/context/TourContext";
import { AppContextsProvider } from "@/context/AppContext";
import { Metadata } from "next";
import { ColorContextProvider } from "@/context/ResumeColorContext";
import Onboard from "@/components/public-pages/layout/Onboard";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "CareerBooster.AI",
  description: "AI Resume Builder | Developed by NausalTech",
};

export default async function Privatelayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role: string } | undefined;

  const isAdmin = user?.role === "admin";
  const isDeo = user?.role === "deo";

  if (isAdmin) redirect("/admin");
  if (isDeo) redirect("/deo");
  if (!session?.user) {
    return (
        <Onboard/>
    );
  } else {
    return (
      <div className="dark:bg-gradient-to-bl from-[#340e53] via-[#000533] to-[#010111] bg-[#e4e9f7] w-screen h-screen overflow-y-scroll">
        <TourContextProvider>
          <AppContextsProvider>
            <ColorContextProvider>
              <ProfileCreationLayer>
                <Header />
                <SideBar />
                <div className="max-w-7xl mx-auto ">{children}</div>
                <Footer />
                {/* <ToastContainer /> */}
              </ProfileCreationLayer>
            </ColorContextProvider>
          </AppContextsProvider>
        </TourContextProvider>
      </div>
    );
  }
}

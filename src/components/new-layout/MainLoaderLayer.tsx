"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const MainLoaderLayer = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen  bg-gradient-to-b from-gray-900 to-gray-600 text-white  z-[9999] flex flex-col justify-center items-center">
      <Image
        src="/trans-icon1.png"
        alt="CareerBooster.ai Logo Icon"
        className="animate-ping"
        width={100}
        height={100}
      />
    </div>
  );
};

export default MainLoaderLayer;

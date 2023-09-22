"use client";
import { useSelector } from "react-redux";

const WelcomeCard = () => {
  const userData = useSelector((state: any) => state.userData);
  return (
    <h5 className="mb-3 text-4xl font-bold   md:text-4xl ">
      Welcome {userData?.firstName + " " + userData?.lastName}
    </h5>
  );
};
export default WelcomeCard;

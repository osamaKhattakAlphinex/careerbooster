"use client";
import { refreshBigIconRotating } from "@/helpers/iconsProvider";
import { useSelector } from "react-redux";
import DidYouKnowCard from "./DidYouKnowCard";

interface Props {
  children: React.ReactNode;
}

const ProfileCreationLayer: React.FC<Props> = ({ children }) => {
  const userData = useSelector((state: any) => state.userData);

  // if the user data is still loading
  if (userData.email === "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-center">Loading...</h2>
      </div>
    );
  }

  // if the user data is loaded and profile wizard is completed
  // return page content as it is
  if (userData.email && userData.wizardCompleted) {
    return <>{children}</>;
  } else {
    // if the user data is loaded and profile wizard is NOT completed
    return (
      <div className="flex flex-col items-center justify-center h-screen py-20 !pb-42">
        <h2 className="text-3xl font-bold text-center">
          Welcome {userData?.firstName + " " + userData?.lastName}
        </h2>
        <div className="my-10">{refreshBigIconRotating}</div>
        <p className="text-center mb-10">
          Please while we are getting your profile ready.
        </p>

        <div className="w-1/3">
          <DidYouKnowCard />
        </div>
      </div>
    );
  }
};
export default ProfileCreationLayer;

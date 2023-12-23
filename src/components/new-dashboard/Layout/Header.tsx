"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/Modal";
import { bellIcon } from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";
import { useSelector } from "react-redux";
import ThemeChanger from "@/components/themeSwitcher";
interface HeaderProps {
  children?: ReactNode;
}
const pagesArray = ["/subscribe"];
const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname: any = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userData = useSelector((state: any) => state.userData);
  const routeNamesToDisplayNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/resume-builder": "Generate New Resumes",
    "/cover-letter-generator": "Generate Cover Letter",
    "/linkedin-generator": "Keyword Optimized Linkedin",
    "/profile-review": "Review Your Profile",
    "/email-bot": "Generate Emails Using AI",
    "/consulting-bids-bot": "Generate Bids Using AI",
    "/subscribe": `Welcome, ${userData.firstName + " " + userData.lastName}`,
    "/career-coach": `Welcome to our latest Chat Bot`,
    "/linkedin-generator/headline": "Headline Generator",
    "/linkedin-generator/about": "About Generator",
    "/linkedin-generator/job-description": "Job Description Generator",
    "/linkedin-generator/keywords": "Keyword Generator",
    "/change-current-password": "Change Password",
    "/billing": "Billing Detail",
    "/review-resume-bot": "Review Your Resume By AI",

    // Add more routes as needed
  };

  const currentRouteDisplayName: string =
    routeNamesToDisplayNames[pathname] || "Unknown";

  return (
    <nav
      className={`dark:bg-gradient-to-l from-[#340e53] to-[#000533]  bg-[#e4e9f7] py-[12px] px-4 ml-0 sticky top-0   z-10     
      ${pagesArray?.includes(pathname) ? "m-5" : "lg:ml-[234px]"} 
      ${pathname === "/subscribed" && "hidden"} 
      `}
    >
      <div className="w-full rounded-lg flex justify-between sm:justify-between items-center">
        <h1 className="headText mb-0 rounded-[14px] text-[14px] dark:text-white text-gray-950 font-bold uppercase">
          {currentRouteDisplayName}
        </h1>
        <div className="flex">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className={` dark:text-gray-100 text-gray-950 flex justify-center mr-3 items-center  w-[40px] h-[40px] rounded-full capitalize  ${
              pathname === "/subscribe" ? "hidden" : ""
            } ${isModalOpen && "header-mode-btn-click"} `}
          >
            {bellIcon}
          </button>
          <div className="flex justify-center items-center ">
            <ThemeChanger />
          </div>
        </div>
      </div>

      {/* Render the Modal component */}
      {children}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Header;

"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/dashboard/Modal";
import { bellIcon } from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";
import { useSelector } from "react-redux";
import ThemeChanger from "@/components/common/themeSwitcher";
interface HeaderProps {
  children?: ReactNode;
}
const pagesArray = ["/subscribe"];
const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userData = useSelector((state: any) => state.userData);
  const routeNamesToDisplayNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/resume-builder": "Generate New Resumes",
    "/cover-letter-generator": "Generate Cover Letter",
    "/linkedin-optimizer": "LinkedIn Optimizer",
    "/profile-review": "Review Your Profile",
    "/email-bot": "Generate Emails Using AI",
    "/consulting-bids-bot": "Generate Bids Using AI",
    "/subscribe": `Welcome, ${userData.firstName + " " + userData.lastName}`,
    "/career-coach": `Welcome to our latest Chat Bot`,
    "/linkedin-optimizer/headline": "Headline Generator",
    "/linkedin-optimizer/about": "About Generator",
    "/linkedin-optimizer/job-description": "Job Description Generator",
    "/linkedin-optimizer/keywords": "Keyword Generator",
    "/billing": "Billing Detail",
    "/review-resume": "Get Your Resume Reviewed By AI",
    "/resume-builder/templates": "Choose Design of Your Choice",
    "/resume-builder/templates/template": "Let's start building resume",
    // Add more routes as needed
  };

  const currentRouteDisplayName: string =
    routeNamesToDisplayNames[pathname] || "";

  return (
    <nav
      className={`dark:bg-gradient-to-l from-[#340e53] to-[#000533]  bg-[#e4e9f7] py-[12px] px-4 ml-0 sticky top-0   z-20     
      ${pagesArray?.includes(pathname) ? "m-5" : "lg:ml-[234px]"} 
      ${pathname === "/subscribed" && "hidden"} 
      `}
    >
      <div className="flex items-center justify-between w-full rounded-lg sm:justify-between">
        <h1
          className={` mb-0   ${
            pathname === "/subscribe"
              ? " w-full flex  justify-center "
              : "headText"
          }  justify-center rounded-[14px] text-xs md:text-sm dark:text-white text-gray-950 font-bold uppercase`}
        >
          {currentRouteDisplayName}
        </h1>
        <div className="flex">
          {/* <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className={` dark:text-gray-100 text-gray-950 flex justify-center mr-3 items-center  w-[40px] h-[40px] rounded-full capitalize  ${
              pathname === "/subscribe" ? "hidden" : ""
            } ${isModalOpen && "header-mode-btn-click"} `}
          >
            {bellIcon}
          </button> */}
          <div
            className={`flex justify-center items-center  h-[40px] ${
              pathname === "/subscribe" && "hidden"
            }`}
          >
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

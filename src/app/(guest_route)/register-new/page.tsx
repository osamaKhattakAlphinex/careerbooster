import UploadPDFResume from "@/components/UploadPDFResume";

import RegistrationForm from "@/components/new-layout/Register/RegistraionForm";
import RegistrationImage from "@/components/new-layout/Register/RegistrationImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Register",
};
const UploadResumePage = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column justify-between min-h-full">
        <main className="flex-grow-1 pt-40">
          <div className="flex justify-center items-center">
            <div className="inline">
              <UploadPDFResume />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UploadResumePage;

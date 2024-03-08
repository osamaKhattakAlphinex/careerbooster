import RegistrationForm from "@/components/public-pages/Register/RegistraionForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.ai-Register",
};
const RegisterNew = () => {
  return (
    <>
      <div className=" flex flex-col justify-between ">
        <main className="flex-grow-1">
          <section className=" pb-10 pt-16 md:pt-32 dark:bg-gray-950 bg-gray-100">
            <div className=" px-3 lg:container ">
              <div className="flex ">
                <RegistrationForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default RegisterNew;

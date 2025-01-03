import RegistrationForm from "@/components/public-pages/Register/RegistraionForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register - CareerBooster.ai",
};
const RegisterNew = () => {
  return (
    <>
      <div className=" flex flex-col justify-between ">
        <main className="flex-grow-1">
          <section className=" pb-10 pt-20 md:pt-40 dark:bg-gray-950 bg-gray-100">
            <div className=" px-3 md:mx-auto md:container ">
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

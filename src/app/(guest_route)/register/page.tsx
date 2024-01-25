import RegistrationForm from "@/components/public-pages/Register/RegistraionForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Register",
};
const RegisterNew = () => {
  return (
    <>
      <div className=" d-flex flex-column justify-between ">
        <main className="flex-grow-1">
          <section className="account-section login-page pb-6 pt-40 ">
            <div className="container-fluid ">
              <div className="row ">
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

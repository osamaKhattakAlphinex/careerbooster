import RegistrationForm from "@/components/Register/RegistraionForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Register",
};
const RegisterNew = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column justify-between min-h-[1155px]">
        <main className="flex-grow-1">
          <section className="account-section login-page pb-6 pt-40 h-full">
            <div className="container-fluid h-full">
              <div className="row h-full">
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

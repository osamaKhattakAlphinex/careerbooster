import RegistrationForm from "@/components/new-layout/Register/RegistraionForm";
import RegistrationImage from "@/components/new-layout/Register/RegistrationImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.Ai-Register",
};
const RegisterNew = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column justify-between min-h-[1155px]">
        <main className="flex-grow-1">
          <section className="account-section login-page py-6 h-full">
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

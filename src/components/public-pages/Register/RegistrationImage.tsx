import Image from "next/image";

const RegistrationImage = () => {
  return (
    <div className="col-lg-6 d-none d-lg-block">
      <div className="bg-dark-blue-4 border-[1px] rounded-4  p-6 p-md-20 text-center d-flex flex-column justify-center">
        <h2 className="text-white mb-12">
          Unlock the Power of <br className="d-none d-xl-block" />
          <span className="text-primary-dark">Career Booster</span>{" "}
        </h2>
        <Image
          width={622}
          height={450}
          src="assets/images/screens/screen-5.png"
          alt=""
          className="img-fluid w-full"
        />
      </div>
    </div>
  );
};
export default RegistrationImage;

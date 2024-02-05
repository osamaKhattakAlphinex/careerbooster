import Image from "next/image";

const BrandsCard = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="container">
        <div className="flex justify-center">
          <div className="flex flex-col w-10/12">
            <div className="text-center">
              <h4 className="mb-10 text-[1.5rem] dark:text-gray-100 text-gray-950 font-semibold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58ebff] to-[#e6f85e]">
                  20,000+{" "}
                </span>
                Professionals & Teams Choose
                <span className="text-[#6a4dff] dark:text-[#e6f85e]">
                  {" "}
                  CareerBooster.AI
                </span>
              </h4>

              <div className="flex items-center justify-center  gap-6 lg:gap-10 xl:gap-20">
                <div className="flex flex-col w-3/12 md:w-5/12">
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/1.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="flex flex-col w-3/12 md:w-5/12">
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/2.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="flex flex-col w-3/12 md:w-5/12">
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/3.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="flex flex-col w-3/12 md:w-5/12">
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/4.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="flex flex-col w-3/12 md:w-5/12">
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/5.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BrandsCard;

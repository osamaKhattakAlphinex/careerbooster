import Image from "next/image";

const BrandsCard = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="row justify-center">
          <div className="col-lg-10">
            <div className="text-center">
              <h4 className="mb-10" data-aos="fade-up-sm" data-aos-delay="50">
                <span className="text-gradient-2">20,000+ </span>
                Professionals & Teams Choose
                <span className="theme-text"> CareerBooster.AI</span>
              </h4>

              <div className="row align-center justify-center row-cols-3 row-cols-md-5 g-6 g-lg-10 g-xl-20">
                <div
                  className="col"
                  data-aos="fade-up-sm"
                  data-aos-delay="100"
                  data-aos-offset="10"
                >
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/1.png"
                    alt=""
                    className="img-fluid brand-img"
                  />
                </div>
                <div
                  className="col"
                  data-aos="fade-up-sm"
                  data-aos-delay="150"
                  data-aos-offset="10"
                >
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/2.png"
                    alt=""
                    className="img-fluid brand-img"
                  />
                </div>
                <div
                  className="col"
                  data-aos="fade-up-sm"
                  data-aos-delay="200"
                  data-aos-offset="10"
                >
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/3.png"
                    alt=""
                    className="img-fluid brand-img"
                  />
                </div>
                <div
                  className="col"
                  data-aos="fade-up-sm"
                  data-aos-delay="250"
                  data-aos-offset="10"
                >
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/4.png"
                    alt=""
                    className="img-fluid brand-img"
                  />
                </div>
                <div
                  className="col"
                  data-aos="fade-up-sm"
                  data-aos-delay="300"
                  data-aos-offset="10"
                >
                  <Image
                    width={117}
                    height={28}
                    src="/assets/images/brands/5.png"
                    alt=""
                    className="img-fluid brand-img"
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

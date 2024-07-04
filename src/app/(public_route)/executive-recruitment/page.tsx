import Image from "next/image";
import React from "react";

function page() {
  return (
    <>
      <main className="flex-grow-1 overflow-x-hidden md:pt-40 xs:pt-[120px] xs:pb-[50px] pb-10  md:pb-18 px-20">
        <div className="conatiner">
          <div className="flex justify-center w-full gap-20">
            <div className="w-2/3 content mx-auto text-center">
              <p>
                At CareerBooster.ai, we specialize in identifying and connecting
                top-tier executive talent with organizations seeking
                transformative leaders. Our mission is to be your strategic
                partner, dedicated to elevating your organization through
                exceptional talent acquisition. We recognize the critical impact
                of effective leadership and are committed to delivering
                candidates who drive innovation and growth.
              </p>
              <br />
              <p>
                Our experienced team of recruiters leverages extensive industry
                knowledge and a vast network of professionals to provide
                comprehensive recruitment services. From middle management to
                C-suite roles, we ensure a precise match for your organizational
                needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;

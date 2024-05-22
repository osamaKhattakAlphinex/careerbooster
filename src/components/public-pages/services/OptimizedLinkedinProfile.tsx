import { Fjalla_One, Lato } from "next/font/google";
import React from "react";
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const lato_400 = Lato({
  weight: "400",
  subsets: ["latin"],
});
function OptimizedLinkedinProfile() {
  return (
    <div
      className={`mx-10 px-10 my-10 shadow-lg border-2 border-gray-100 rounded-xl  py-20`}
    >
      <h1
        className={`text-[54px] ${fjalla_One.className} text-center text-[#E1E361]`}
      >
        <strong>
          How much does it cost to keyword optimize my LinkedIn profile?
        </strong>
      </h1>
      <div className="flex flex-col gap-8 mt-20">
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          <strong>Good question!</strong>
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Investing in our services can yield{" "}
          <strong>higher returns than even Tesla or Apple stocks.</strong>
        </p>

        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Let me explain how.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          If you're currently unemployed, consider this: with our LinkedIn
          optimization, if you land a job sooner, wouldn't you agree that it's
          the best investment you could make, especially for just a few hundred
          dollars?
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Similarly, if you're employed but seeking better opportunities,
          investing a small amount in our services to find a job that pays more
          and aligns with your passions surely constitutes a smart investment,
          right?
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Of course, it does. That's why many service providers charge upwards
          of $2000 for this type of service.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Given the value we provide, it would be reasonable to charge $2000 for
          LinkedIn Keyword Optimization. However, we understand that our
          clients, particularly job seekers, may have budget constraints. We
          don't want financial challenges to be a barrier to accessing our
          services.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          That's why we offer this service at the exclusive price of just $494.
          This investment includes personalized keyword research and profile
          optimization, ensuring your LinkedIn stands out in recruiter searches.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          This not only boosts your visibility but significantly increases your
          chances of securing better job opportunities and forming meaningful
          professional connections.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          We stand by the quality of our services{" "}
          <strong>and offer a 100% satisfaction guarantee.</strong> If you're
          not satisfied with our LinkedIn Keyword Optimization for any reason,
          we'll provide a full refund, no questions asked.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          So, why wait to advance your career? Invest in your professional
          future today by enrolling in our LinkedIn Keyword Optimization service
          for only $494.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          So, why wait to advance your career? Invest in your professional
          future today by enrolling in our LinkedIn Keyword Optimization service
          for only $494.
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          This is an offer designed to help you achieve your career goals. Don't
          miss out!
        </p>
      </div>
      <h1
        className={`text-[54px] ${fjalla_One.className} text-center text-[#6350C8] py-10`}
      >
        <strong>
          Here Are Our Exclusive Bonuses, Which You Only Get When You Sign Up
          For LinkedIn Keyword Optimization Today
        </strong>
      </h1>
    </div>
  );
}

export default OptimizedLinkedinProfile;

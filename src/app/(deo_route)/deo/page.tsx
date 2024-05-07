import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="card flex items-center gap-6 dark:bg-black rounded-md py-8 px-10 dark:text-white dark:border bg-white text-gray-950 shadow-md">
        <div className="image w-1/3 ">
          <Image
            src="/data-entry-operator.png"
            width={314}
            height={190}
            alt="DEO"
          />
        </div>
        <div className="content w-2/3 flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Welcome Back</h2>
          <h1 className="text-4xl font-bold text-yellow-500">
            Data Entry Operator
          </h1>
          <p className="text-base ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
            dicta! Quaerat totam quos nulla illum quidem eligendi beatae
            incidunt provident ex qui nesciunt exercitationem in voluptatem
            saepe voluptatibus, esse quas?
          </p>
        </div>
      </div>
      <div className="mt-8 footer flex items-center justify-center gap-4 dark:bg-black rounded-md py-4 px-10 dark:text-white dark:border bg-white text-gray-950 shadow-md text-lg font-bold">
        CareerBooster.ai
      </div>
    </>
  );
};

export default page;

"use client";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const RewardsSection = () => {
  return (
    <section className="dark:bg-gray-950 bg-gray-100 pb-10 xs:pb-0  md:pt-14 xs:pt-10">
      <Fade duration={2000}>
        <div className="flex gap-6 lg:gap-14 xl:gap-20 mx-auto md:container items-center  w-[100%]">
          <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2 ">
            <div className="reward-content text-center">
              <h1 className=" md:text-3xl text-[24px]  dark:text-gray-100 text-gray-950 font-[600]">
                Hire Top Talent Faster and More Efficiently
              </h1>
              <h4 className="py-3  px-2 dark:text-gray-100 text-gray-950 font-normal md:text-xl xs:text-[1rem]">
                Utilize our executive recruitment services and exclusive job
                board to find vetted executive-level candidates who can drive
                your business forward.
              </h4>
              {/* <h4 className="lg:py-3 md:py-3 xs:py-1  px-2 dark:text-gray-100 text-gray-950 font-normal md:text-xl xs:text-[1rem]">
                Why CareerBooster is better than GPT and Other Tools?
              </h4> */}
              {/* <h4 className=" px-2 dark:text-gray-100 text-gray-950 font-normal md:text-xl xs:text-[1rem]">
                At CareerBooster, we understand the value of AI, including GPT,
                in crafting exceptional resumes. However, here{"'"}s why our AI
                stands out
              </h4> */}
            </div>
            {/* <div className="flex flex-col md:w-12/12 xs:w-full  px-2 md:mx-auto">
              <ul className="flex flex-col mb-8 xs:mb-4 mt-10 md:px-0 px-2 xs:px-0">
                <li className="flex flex-col text-[20px] mb-5 dark:text-gray-100 text-gray-950">
                  <div className="flex  justify-start items-start gap-6">
                    <div className="w-20 xs:pt-2">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                        className=" text-[#0000ff9c] dark:text-[#e6f85e] xs:w-[18px]"
                      >
                        <g>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m3.75 9 3.75 3.75 7.5-7.5"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="xs:text-base md:text-[18px]">
                        Tailored for Senior Level Resumes: We{"'"}ve developed
                        our model through extensive research and in
                        collaboration with top executive resume writers. It{"'"}
                        s laser-focused on senior-level resumes, following a
                        research-based framework.
                      </span>
                    </div>
                  </div>
                </li>

                <li className="flex flex-col text-[20px] mb-5 dark:text-gray-100 text-gray-950">
                  <div className="flex  justify-start items-start gap-6">
                    <div className="w-20 xs:pt-2">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                        className=" text-[#0000ff9c] dark:text-[#e6f85e] xs:w-[18px]"
                      >
                        <g>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m3.75 9 3.75 3.75 7.5-7.5"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="xs:text-base md:text-[18px]">
                        No Expertise Required: With GPT, you need to be an AI
                        expert and use precise prompts to achieve results. In
                        our system, you simply press a button and get instant
                        results without the need for intricate prompts.
                      </span>
                    </div>
                  </div>
                </li>

                <li className="flex flex-col text-[20px] mb-5 dark:text-gray-100 text-gray-950">
                  <div className="flex  justify-start items-start gap-6">
                    <div className="w-20 xs:pt-2">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                        className=" text-[#0000ff9c] dark:text-[#e6f85e] xs:w-[18px]"
                      >
                        <g>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m3.75 9 3.75 3.75 7.5-7.5"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="xs:text-base md:text-[18px]">
                        Speed and Efficiency: Unlike GPT and other tools that
                        often require manual input for each section, our system
                        delivers results with a single click. It{"'"}s faster
                        and more efficient, saving you valuable time.
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <p className="text-center md:px-0 lg:px-5 text-[20px] xs:text-base md:text-[18px] xs:mx-auto dark:text-gray-100 text-gray-950">
                Choose CareerBooster for AI-powered resume excellence tailored
                to your senior-level career goals. Say goodbye to complex
                prompts and slow processes—experience efficiency and quality
                with us.
              </p>
            </div>
            <div className="flex w-[100%]  text-center my-10">
              <Link
                href="/register"
                className="no-underline px-6 font-[500] text-[1rem] py-[.85rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c] mx-auto"
              >
                Get started
              </Link>
            </div> */}
          </div>
        </div>
      </Fade>
    </section>
  );
};
export default RewardsSection;

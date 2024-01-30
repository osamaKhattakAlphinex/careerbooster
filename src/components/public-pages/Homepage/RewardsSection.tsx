import Link from "next/link";

const RewardsSection = () => {
  return (
    <section className="dark:bg-[#11121C] bg-gray-100 pb-10">
      <div
        className="row g-6 gx-lg-14 gx-xl-20 align-center pt-5"
        style={{ width: "100%" }}
      >
        <div className="col-md-10 mx-auto">
          <div className="reward-content text-center">
            <h1 className=" md:text-[40px] text-[24px] px-5 dark:text-gray-100 text-gray-950">
              Get Ready for a $10k Reward - Prove Us Wrong!
            </h1>
            <h4 className="py-3 md:px-0 px-5 dark:text-gray-100 text-gray-950">
              We{"'"}re so confident in our AI tool that we dare you to find a
              better one. If you do, We{"'"}ll hand you $10,000. Challenge
              accepted?
            </h4>
            <h4 className="pb-3 md:px-0 px-5 dark:text-gray-100 text-gray-950">
              Why CareerBooster is better than GPT and Other Tools?
            </h4>
            <h4 className="md:px-0 px-5 dark:text-gray-100 text-gray-950">
              At CareerBooster, we understand the value of AI, including GPT, in
              crafting exceptional resumes. However, here{"'"}s why our AI
              stands out
            </h4>
          </div>
          <div className="reward-list col-md-10 mx-auto">
            <ul className="list-unstyled list-check mb-8 mt-10 md:px-0 px-5">
              <li className="font-16 mb-5 dark:text-gray-100 text-gray-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="icon text-[#0000ff9c] dark:text-[#e6f85e]"
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
                <span>
                  Tailored for Senior Level Resumes: We{"'"}ve developed our
                  model through extensive research and in collaboration with top
                  executive resume writers. It{"'"}s laser-focused on
                  senior-level resumes, following a research-based framework.
                </span>
              </li>
              <li className="font-16 mb-5 dark:text-gray-100 text-gray-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="icon text-[#0000ff9c] dark:text-[#e6f85e]"
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
                <span>
                  No Expertise Required: With GPT, you need to be an AI expert
                  and use precise prompts to achieve results. In our system, you
                  simply press a button and get instant results without the need
                  for intricate prompts.
                </span>
              </li>
              <li className="font-16 mb-5 dark:text-gray-100 text-gray-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="icon text-[#0000ff9c] dark:text-[#e6f85e]"
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
                <span>
                  Speed and Efficiency: Unlike GPT and other tools that often
                  require manual input for each section, our system delivers
                  results with a single click. It{"'"}s faster and more
                  efficient, saving you valuable time.
                </span>
              </li>
            </ul>
            <p className="text-center md:px-0 px-5 font-16 dark:text-gray-100 text-gray-950">
              Choose CareerBooster for AI-powered resume excellence tailored to
              your senior-level career goals. Say goodbye to complex prompts and
              slow processes—experience efficiency and quality with us.
            </p>
          </div>
          <div className="col-md-12 text-center my-10">
            <Link
              href="/register"
              className="no-underline px-5 py-3 rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c] "
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RewardsSection;

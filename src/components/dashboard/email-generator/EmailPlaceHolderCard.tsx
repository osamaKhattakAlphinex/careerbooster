type EmailButtonProps = {
  msgLoading: boolean;
  jobDescription?: string;
  selectedOption?: string;
  selectedFile?: string;
  handleGenerate: any;
  generateButtonText: string;
};

const GenerateEmailsButton = ({
  jobDescription,
  msgLoading,
  selectedFile,
  selectedOption,
  handleGenerate,
  generateButtonText,
}: EmailButtonProps) => {
  return (
    <button
      type="button"
      disabled={
        msgLoading ||
        selectedOption === "" ||
        (selectedOption === "file" && selectedFile === "") ||
        (generateButtonText === "Generate Email" && jobDescription === "")
      }
      onClick={handleGenerate}
      className={`dark:bg-gradient-to-r absolute z-10 hover:from-purple-800 hover:to-pink-600 top-[45%] left-1/2  -translate-x-1/2 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
        (msgLoading ||
          selectedOption === "" ||
          (selectedOption === "file" && selectedFile === "") ||
          jobDescription === "") &&
        "cursor-not-allowed" // Apply these styles when the button is disabled
      }`}
    >
      <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
        {msgLoading ? (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Please wait...
          </div>
        ) : (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 dark:text-gray-100 text-gray-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <span
              className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
            >
              {generateButtonText}
            </span>
          </div>
        )}
      </span>
    </button>
  );
};

type EmailPlaceHolderCardProps = {
  generateButtonText: string;
  handleGenerate: any;
  selectedFile: string;
  selectedOption: string;
  jobDescription: string;
  msgLoading: boolean;
};

export const EmailPlaceHolderCard = (props: EmailPlaceHolderCardProps) => {
  return (
    <div className="relative py-4 bg-white shadow-md card_1 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
      <GenerateEmailsButton {...props} />
      <div className="flex flex-col text-gray-950 blur">
        <div className="flex">
          <h2 className="mb-2 text-xl">
            <strong>Generate Email</strong>
          </h2>
          <div className="text-[#000]  group relative rounded-full h-8  flex  items-center px-[16px] py-[6px]  ml-auto xs:text-[10px] md:text-[12px]  font-bold ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>

            <div className="w-44  bg-white font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-40  xs:-top-12 md:-top-18  hidden group-hover:block  xs:rounded-br-none    mb-6 shadow-xl rounded-xl py-2  transition-all">
              This Email Will Follow Your Application Directly
            </div>
          </div>
        </div>

        <h4 className="mb-4 capitalize">dear hiring manager,</h4>
        <p>
          I am writing to apply for the Web Developer position at [Company
          Name]. With [X years] of experience in web development and expertise
          in languages such as HTML, CSS, JavaScript, and frameworks like React.
          I am drawn to your company{"'"}s commitment to innovation and look
          forward to the possibility of contributing to your projects.
        </p>
        <p className="my-4">
          Thank you for considering my application. I have attached my resume
          for your review and am available for further discussion at your
          convenience.
        </p>
        <h4 className="">Best Regards,</h4>
        <h4>[Person Name]</h4>
      </div>
    </div>
  );
};

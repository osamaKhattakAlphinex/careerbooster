import DownloadService from "@/helpers/downloadFile";

type EmailCardProps = {
    componentRef: any;
    msgLoading: boolean;
    isEditing: boolean;
    streamedData: string;
    handleGenerate: any;
    show: boolean;
    isEmailCopied: boolean;
    copyEmail: any;
    handleClick: any;
    handleSave: any;
    editorId: string;
    cardHeading: string;
    cardInstructions: string;
  };
  
export  const EmailCard = (props: EmailCardProps) => {
    return (
      <div className="py-4 bg-gray-200 shadow-md card_1 text-gray-950 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
        <div className="flex">
          <h2 className="mb-2 text-xl">
            <strong>{props.cardHeading}</strong>
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
            </svg>{" "}
            <div className="w-44  bg-white font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-40  xs:-top-12 md:-top-18  hidden group-hover:block  xs:rounded-br-none    mb-6 shadow-xl rounded-xl py-2  transition-all">
            {props.cardInstructions}
            </div>
          </div>
        </div>
  
        <div
          className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 ${
            props.msgLoading ? "animate-pulse" : ""
          }`}
        >
          <div ref={props.componentRef}>
            {props.isEditing ? (
              <div
                className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-[10px]"
                id={props.editorId}
                contentEditable="true"
              ></div>
            ) : (
              <div>
                <div
                  className=" text-gray-950"
                  dangerouslySetInnerHTML={{
                    __html: props.streamedData,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5 buttons md:flex-row">
          <button
            disabled={props.msgLoading}
            onClick={props.handleGenerate}
            className={` flex gap-2 items-center lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
              props.msgLoading && "cursor-not-allowed" // Add this class when the button is disabled
            }`}
          >
            <span className="text-sm dark:text-gray-300 text-gray-950">
              {props.msgLoading ? (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 mr-3 ${
                      props.msgLoading ? "animate-spin" : ""
                    }`}
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
                    className={`dark:text-gray-300 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                  >
                    Re-generate
                  </span>
                </div>
              )}
            </span>
          </button>
  
          <DownloadService
            componentRef={props.componentRef}
            type="onPage"
            fileName="ai-email"
          />
          {props.show && (
            <div>
              <button
                disabled={props.msgLoading || !props.show || props.isEmailCopied}
                onClick={() => props.copyEmail(props.streamedData)}
                className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                  props.msgLoading || !props.show || props.isEmailCopied
                    ? "  cursor-not-allowed"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 dark:text-gray-100 text-gray-950"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
  
                <span className="text-sm dark:text-gray-100 text-gray-950">
                  {props.msgLoading
                    ? "Please wait..."
                    : props.isEmailCopied
                    ? "Copied"
                    : "Copy to clipboard"}
                </span>
              </button>
            </div>
          )}
          {props.show && (
            <div>
              <button
                type="button"
                disabled={!props.show || props.msgLoading}
                onClick={props.handleClick}
                className={` xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                  !props.show || props.msgLoading ? "  cursor-not-allowed" : ""
                } `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 dark:text-gray-300 text-gray-950  `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
                <span className={`dark:text-gray-300 text-gray-950 text-sm `}>
                  Edit
                </span>
              </button>
            </div>
          )}
          {props.isEditing && (
            <button
              type="button"
              onClick={props.handleSave}
              className="flex flex-row justify-center ml-auto items-center gap-2 py-3 px-3 border-[#312E37] border-[1px] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 dark:text-gray-100 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };
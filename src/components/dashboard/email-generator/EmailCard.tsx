import DownloadService from "@/helpers/downloadFile";
import { EditIcon } from "@/helpers/iconsProvider";

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

export const EmailCard = (props: EmailCardProps) => {
  return (
    <div className="py-4 min-h-[308px] w-full bg-white shadow-md card_1 text-gray-950 rounded-2xl md:px-8 xs:px-3 md:text-base flex flex-col gap-2 xs:text-sm">
      <div className="flex">
        <h2 className="mb-2 text-base md:text-lg">
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
              onBlur={props.handleSave}
              className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-2.5"
              id={props.editorId}
              contentEditable="true"
            ></div>
          ) : (
            <div
              className="text-xs text-justify break-words text-gray-950 md:text-sm"
              dangerouslySetInnerHTML={{
                __html: props.streamedData,
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-3 mt-5 buttons sm:flex-row">
        <button
          disabled={props.msgLoading}
          onClick={props.handleGenerate}
          className={`w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
            props.msgLoading && "cursor-not-allowed" // Add this class when the button is disabled
          }`}
        >
          {props.msgLoading ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-3 h-3 md:w-4 md:h-4 text-sm dark:text-gray-300 text-gray-950 ${
                  props.msgLoading ? "animate-spin" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                Please wait...
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 text-sm md:w-4 md:h-4 dark:text-gray-300 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span className="text-xs capitalize dark:text-gray-300 text-gray-950 md:text-sm group-hover:dark:text-gray-200 group-hover:font-semibold">
                Re-generate
              </span>
            </div>
          )}
        </button>

        <DownloadService
          componentRef={props.componentRef}
          type="onPage"
          fileName="ai-email"
        />
        {props.show && (
          <button
            disabled={props.msgLoading || !props.show || props.isEmailCopied}
            onClick={() => props.copyEmail(props.streamedData)}
            className={`w-full sm:max-w-max sm:w-48 lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80  hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
              props.msgLoading || !props.show || props.isEmailCopied
                ? "  cursor-not-allowed"
                : ""
            }`}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
              <span className="text-xs capitalize dark:text-gray-300 text-gray-950 md:text-sm group-hover:dark:text-gray-200 group-hover:font-semibold">
                {props.msgLoading
                  ? "Please wait..."
                  : props.isEmailCopied
                  ? "Copied"
                  : "Copy to clipboard"}
              </span>
            </div>
          </button>
        )}
        {props.show && (
          <button
            type="button"
            disabled={!props.show || props.msgLoading}
            onClick={props.handleClick}
            className={`w-full sm:max-w-max sm:w-48 lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300  group ${
              !props.show || props.msgLoading ? "  cursor-not-allowed" : ""
            } `}
          >
            <div className="flex flex-row items-center justify-center gap-2 dark:text-gray-300 text-gray-950">
              {EditIcon}
              <span className="text-xs capitalize dark:text-gray-300 text-gray-950 md:text-sm group-hover:dark:text-gray-200 group-hover:font-semibold">
                Edit
              </span>
            </div>
          </button>
        )}
        {props.isEditing && (
          <button
            type="button"
            onClick={props.handleSave}
            className="w-full sm:max-w-max sm:w-48 lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group"
          >
            <div className="flex flex-row items-center justify-center gap-2 dark:text-gray-300 text-gray-950">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 24"
                stroke="currentColor"
                fill="none"
                className="w-3 h-3 text-sm md:w-4 md:h-4 dark:text-gray-300 text-gray-950"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7895 21H4.15512C3.71432 21 3.29157 20.7893 2.97988 20.4142C2.66818 20.0391 2.49307 19.5304 2.49307 19V5C2.49307 4.46957 2.66818 3.96086 2.97988 3.58579C3.29157 3.21071 3.71432 3 4.15512 3H13.2964L17.4515 8V19C17.4515 19.5304 17.2764 20.0391 16.9647 20.4142C16.653 20.7893 16.2303 21 15.7895 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.1274 21V13H5.81717V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.81717 3V8H12.4654"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs capitalize dark:text-gray-300 text-gray-950 md:text-sm group-hover:dark:text-gray-200 group-hover:font-semibold">
                Save
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

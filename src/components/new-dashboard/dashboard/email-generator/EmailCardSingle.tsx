"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Html2Pdf from "js-html2pdf";

import { eyeIcon, trashIcon } from "@/helpers/iconsProvider";
import { useRouter, usePathname } from "next/navigation";
import { resetEmail, setEmail } from "@/store/emailSlice";

type EmailType = {
  card?: any;
  componentRef?: any;
  source?: string;
};

const EmailCardSingle = ({ card, componentRef, source }: EmailType) => {
  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const router = useRouter();
  const pathname: any = usePathname();
  const handleOnView = async (card: any) => {
    if (source !== "") {
      router.replace("/email-bot");
    }
    return dispatch(setEmail(card));
  };

  const handleOnDelete = async (card: any) => {
    const c = confirm("Are you sure you want to delete this Emails?");
    if (c) {
      try {
        await axios.delete(`/api/emailBot/${card.id}`);
        dispatch(resetEmail());
        // updated cover letters
        const updatedEmails = userData.emails.filter(
          (email: any) => email.id !== card.id
        );

        const updatedObject = {
          ...userData,
          emails: updatedEmails,
        };

        dispatch(setUserData({ ...userData, ...updatedObject }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!card) return <h1>Loading </h1>;

  return (
    <div>
      <div className="flex flex-col   dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-95 rounded-xl mt-[20px] py-[20px] px-[14px] ">
        <div className="">
          <div className="mx-3 border-gray-600 leading-6 w-full">
            <h2
              title={card.jobDescription}
              className="w-full pr-3 truncate lg:text-[15px] text-[13px] capitalize dark:text-gray-100 text-gray-950 font-semibold  "
            >
              {card.jobDescription}
              {/* {card.jobDescription.length < 20
                ? card.jobDescription
                : card.jobDescription.slice(0, 20) + "..."} */}
            </h2>
            <h4 className="uppercase text-[#959595] font-medium  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]">
              Generated on {getFormattedDate(card.generatedOnDate)}
            </h4>
          </div>
        </div>
        <div className="flex gap-3 ">
          <button
            type="button"
            onClick={() => handleOnView(card)}
            className="px-2 flex justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border dark:border-[#27272a] bg-transparent border-[#22c55e]"
          >
            {eyeIcon}
            {pathname == "/dashboard" ? (
              <span className="text-[13px] mx-2 text-neutral-400">View</span>
            ) : (
              ""
            )}
          </button>
          <button
            type="button"
            onClick={() => handleOnDelete(card)}
            className="px-2 flex justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border dark:border-[#27272a] bg-transparent border-[#22c55e]"
          >
            {trashIcon}
            {pathname == "/dashboard" ? (
              <span className="text-[13px] mx-2 text-neutral-400">Delete</span>
            ) : (
              ""
            )}
          </button>
          {pathname == "/dashboard"
            ? ""
            : card && (
                <>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        // disabled={
                        //   resume.state.jobPosition === "" ||
                        //   resume.state.resumeLoading ||
                        //   !session?.user?.email ||
                        //   !resume?.name
                        // }
                        className="lg:text-[14px] text-[12px] lg:px-[32px] px-[22px] lg:py-2 py-0 rounded-full card-download-btn  text-green-500 border border-green-500"
                      >
                        Download
                        {/* <span>
                              To download choose destination "save as PDF"
                            </span> */}
                      </button>
                    )}
                    onBeforeGetContent={async () => await handleOnView(card)}
                    content={() => componentRef.current}
                    print={async (printIframe: HTMLIFrameElement) => {
                      const document = componentRef.current;
                      let doc: any = document?.querySelector(".text-white");
                      const clonedDoc = doc.cloneNode(true);
                      clonedDoc.style.color = "black";

                      if (document) {
                        const exporter = new Html2Pdf(clonedDoc);
                        exporter
                          .getPdf(false)
                          .then(async (pdf: any) => {
                            await pdf.save("email.pdf");
                          })
                          .catch((error: any) => console.log(error));
                      }
                    }}
                  />
                </>
              )}
        </div>
      </div>
    </div>
  );
};

export default EmailCardSingle;

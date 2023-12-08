import { eyeIcon, rocketLaunch, trashIcon } from "@/helpers/iconsProvider";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { Resume, emptyResume, setResume } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { usePathname, useRouter } from "next/navigation";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useSession } from "next-auth/react";
import Html2Pdf from "js-html2pdf";
import {} from "@/../public/icon/Vector.png";
const SingleRecentResumeCard = ({
  resume,
  source,
  componentRef,
}: {
  resume: Resume;
  source?: string;
  componentRef: any;
}) => {
  const userData = useSelector((state: any) => state.userData);
  const { data: session } = useSession();
  const { email, resumes } = userData;
  const router = useRouter();
  const pathname: any = usePathname();
  const dispatch = useDispatch();
  const handleOnView = async () => {
    if (source != "") {
      router.replace("/resume-builder");
    }
    return dispatch(setResume(resume));
  };
  const handleOnDelete = () => {
    // ask for confirmation
    const c = confirm("Are you sure you want to delete this resume?");
    if (c) {
      // delete resume
      const updatedResumes = resumes.filter((r: Resume) => r.id !== resume.id);
      updateUser(updatedResumes);
      dispatch(emptyResume());

      console.log(updatedResumes);
    }
  };

  const updateUser = (updatedResumes: any) => {
    if (email) {
      return axios
        .post("/api/users/updateUserResumes", {
          email,
          resumes: updatedResumes,
        })
        .then(async (res: any) => {
          if (res.data.success) {
            // update user in redux
            // resumeCardDeleteHandler();
            const res = await fetch(`/api/users/getOneByEmail?email=${email}`);

            const response = await res.json();
            dispatch(setUserData(response.result));
          }
        });
    }
  };
  return (
    <div className="flex flex-col lg:w-[100%]   bg-[#222027] rounded-xl mt-[20px] py-[20px] px-[14px] ">
      <div className="">
        <div className="mx-3 border-gray-600 leading-6">
          <h2 className="lg:text-[15px] text-[13px]  capitalize text-white font-medium  ">
            {resume?.state?.jobPosition}
          </h2>
          {/* <h2
            className="lg:text-[13px] text-[10px] truncate uppercase font-semibold text-[#959595] flex items-center pt-[8px] "
            title={resume?.jobTitle}
          >
            {" "}
            <i className="mr-2">{rocketLaunch}</i> {resume?.jobTitle}
          </h2> */}
          <h4 className="uppercase text-[#959595] font-medium  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]">
            Created on: {getFormattedDate(resume?.dateTime)}
          </h4>
        </div>
      </div>
      <div className="flex gap-3 ">
        <button
          onClick={handleOnView}
          className="flex px-2 text-[16px] justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800"
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
          onClick={handleOnDelete}
          className="flex px-2 justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800"
        >
          {trashIcon}{" "}
          {pathname == "/dashboard" ? (
            <span className="text-[13px] mx-2 text-neutral-400">Delete</span>
          ) : (
            ""
          )}
        </button>
        {pathname == "/dashboard"
          ? ""
          : resume && (
              <>
                <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      disabled={
                        resume.state.jobPosition === "" ||
                        resume.state.resumeLoading ||
                        !session?.user?.email ||
                        !resume?.name
                      }
                      className="lg:text-[14px] text-[12px] lg:px-[32px] px-[22px] lg:py-2 py-0 rounded-full bg-zinc-900 text-green-500 border border-green-500"
                    >
                      Download
                    </button>
                  )}
                  onBeforeGetContent={async () => await handleOnView()}
                  content={() => componentRef.current}
                  print={async (printIframe: HTMLIFrameElement) => {
                    const document = printIframe.contentDocument;
                    if (document) {
                      const exporter = new Html2Pdf(componentRef.current, {
                        filename: `${resume.name}-${resume.jobTitle}.pdf`,
                      });
                      exporter.getPdf(true);
                    }
                  }}
                />
              </>
            )}
      </div>
    </div>
  );
};
export default SingleRecentResumeCard;

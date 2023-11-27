"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import BiograpyFileUploader from "@/components/dashboard/biography-writer/BiograpyFileUploader";
import Button from "@/components/utilities/form-elements/Button";

const BiographyWriter = () => {
  const componentRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [streamedData, setStreamedData] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<string>("");

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const handleGenerate = async () => {
    await getUserDataIfNotExists();
    if (session?.user?.email) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        type: selectedOption,
      };
      if (selectedOption === "file") {
        obj.file = selectedFile;
      } else {
        obj.userData = aiInputUserData;
      }
      // Fetch keywords
      fetch("/api/biographyBot/bioGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      }).then(async (resp: any) => {
        if (resp.ok) {
          const reader = resp.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = new TextDecoder().decode(value);
            setStreamedData((prev) => prev + text);
          }
        } else {
          setStreamedData("Error! Something went wrong");
        }
        setMsgLoading(false);
      });
    }
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const response = await res.json();
        console.log(
          "first response here: " + response.result,
          typeof response.result
        );
        dispatch(setUserData(response.result));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.contact,
        email: userData?.contact,
        experience: userData?.contact,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);
  return (
    <>
      <div className="my-5 ml-10 pt-30">
        <Script type="text/javascript">
          {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
        </Script>
        {/* Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
        />
        <Script>
          {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
        </Script>
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex flex-col p-4  border border-gray-200 rounded-lg shadow sm:p-6 ">
          <h2 className="text-2xl mr-10 mb-6">Biography Generator</h2>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="profile"
                name="default-radio"
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                use my profile date to write biography
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value="file"
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium   cursor-pointer"
              >
                Upload File and use that to write biography
              </label>
            </div>
          </div>
          {selectedOption === "file" && (
            <BiograpyFileUploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}

          <div className="flex flex-row gap-4">
            <div>
              <Button
                type="button"
                disabled={
                  msgLoading ||
                  !session?.user?.email ||
                  !aiInputUserData ||
                  selectedOption === "" ||
                  (selectedOption === "file" && selectedFile === "")
                }
                onClick={() => handleGenerate()}
                className="btn theme-outline-btn"
              >
                <div className="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 ${msgLoading ? "animate-spin" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span>{msgLoading ? "Please wait..." : "Generate"}</span>
                </div>
              </Button>
            </div>
            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  disabled={!show || msgLoading || !session?.user?.email}
                  className="btn theme-outline-btn"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    <span>Print / Download in PDF</span>
                    {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                  </div>
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {/* <div className="">Download PDF</div> */}
        </div>
      </div>

      {show && (
        <div
          className={`w-[95%]  bg-white border border-gray-200 rounded-lg shadow  m-10 ${
            msgLoading ? "animate-pulse" : ""
          }`}
        >
          <div className="p-12" ref={componentRef}>
            <div dangerouslySetInnerHTML={{ __html: streamedData }}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default BiographyWriter;

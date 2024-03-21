import EditableField from "@/components/dashboard/EditableField";
import React from "react";

const page = () => {
  return (
    <>
      <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-[20px] px-4 lg:px-[30px] py-6  flex flex-col gap-3 ">
        {/* header */}
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className=" text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
            Generate Cover Letter 111
          </h3>
          {/* <div className="text-sm font-bold uppercase dark:text-gray-100 text-gray-950"></div> */}
        </div>

        {/* option */}

        <div className="text-sm text-[#615DFF] self-start">
          <span className="uppercase text-[11px] md:text-sm font-bold block gro">
            select options
          </span>
        </div>

        {/* <div className="flex flex-col gap-3 lg:px-0 ">
        <label
          htmlFor="default-radio-1"
          className={`flex gap-3 items-center rounded-full   cursor-pointer lg:text-[15px] text-[11px]  w-fit ${
            selectedOption === "profile"
              ? "dark:text-[#f0f0f0] text-gray-950"
              : "dark:text-[#959595] text-[#acabab]"
          }`}
        >
          <input
            style={{
              color: "#B324D7",
              background: "#B324D7",
              border: "1px solid #B324D7",
            }}
            id="default-radio-1"
            type="radio"
            value="profile"
            name="default-radio"
            onChange={(e) => setSelectedOption(e.target.value)}
            // onChange={(e) => {
            //   setUploadPdfFile(e.target.value);
            // }}
            checked={selectedOption === "profile"}
            className="h-4 w-fit"
          />
          Use my existing resume/data
        </label>
        <label
          htmlFor="default-radio-2"
          className={`flex gap-3 items-center rounded-full    cursor-pointer lg:text-[15px] text-[11px]  w-fit ${
            selectedOption === "file"
              ? "dark:text-[#f0f0f0] text-gray-950"
              : "dark:text-[#959595] text-[#acabab]"
          } `}
        >
          <input
            id="default-radio-2"
            type="radio"
            value="file"
            onChange={(e) => {
              setSelectedFile("");
              setSelectedOption(e.target.value);
            }}
            name="default-radio"
            className="w-fit h-4 border-[1px] "
            checked={selectedOption === "file"}
          />
          Upload a new resume
        </label>
        {selectedOption == "file" ? (
          <CoverLetterFileUploader
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        ) : (
          ""
        )}
      </div> */}

        {/* form */}
        <div className="flex flex-col items-start justify-between gap-5">
          <div className="flex flex-col w-full">
            <label className="mb-1 xs:font-semibold md:font-bold flex justify-between  items-center text-[14px] md:text-[24px] dark:text-gray-100 text-gray-950  lg:pb-[16px] gap-[3px]">
              <div>
                Paste Job Description
                <span className="text-[#F04248] text-[14px]"> *</span>
              </div>
              {/* <div
              className={`text-[#000]  group relative rounded-full xs:h-7 md:h-8 md:ml-3 flex  items-center xs:px-[12px] md:px-[16px] py-[6px]  bg-[#FEB602] text-[12px]  font-bold `}
            >
              {creditLimits?.cover_letter_generation}
              <div className="pl-1"> Credits</div>
              <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 xs:-top-12  md:-top-14  hidden group-hover:block  xs:rounded-br-none  text-gray-100 xs:mb-7 md:mb-6 shadow-xl rounded-xl py-2  transition-all">
                {creditLimits?.cover_letter_generation} credits will be
                used for Cover Letter Generation
              </div>
            </div> */}
            </label>
            <textarea
              id="job-title"
              name="jobTitle"
              rows={6}
              // onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
              className="w-full px-3 lg:px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
            />
          </div>

          <button
            type="button"
            //   disabled={
            //     selectedOption === "" ||
            //     (selectedOption === "file" && selectedFile === "") ||
            //     jobDescription === ""
            //   }
            //   onClick={handleGenerate}
            //   className={`w-max flex flex-row transition-all duration-300  group justify-center sm:justify-start lg:px-6 px-4 py-2 rounded-full dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1.5px] border-gray-950 bg-transparent ${
            //     (selectedOption === "" ||
            //       (selectedOption === "file" && selectedFile === "") ||
            //       jobDescription === "") &&
            //     "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
            //   }`}
          >
            {false ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  // className={`w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950 ${
                  //   msgLoading ? "animate-spin" : ""
                  // }`}
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
                  className="w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>

                <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                  Generate Cover Letter
                </span>
              </div>
            )}
          </button>
        </div>
        {/* show */}
        {true && (
          <div
            //   ref={componentRef}
            className="w-full px-4 py-6 text-justify whitespace-normal bg-white sm:px-8 rounded-2xl"
          >
            <div className="pb-2 text-center border-b border-gray-950">
              <h1 className="flex justify-center text-base font-bold uppercase sm:text-xl md:text-2xl text-gray-950">
                {/* <EditableField
                value={
                  coverLetter?.name
                    ? coverLetter.name
                    : userData.firstName + " " + userData.lastName
                }
                onSave={(value: string) => {
                  dispatch(
                    setCoverLetter({ ...coverLetter, name: value })
                  );
                  handleSingleSave({ name: value });
                }}
              /> */}
              </h1>
              <div className="flex flex-col text-sm text-gray-950">
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row flex-wrap justify-center gap-2 mt-2">
                    {/* <h2 className=" text-xs sm:text-sm font-semibold before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-3 before:h-3 flex before:mr-2">
                    <EditableField
                      value={
                        coverLetter?.phone
                          ? coverLetter.phone
                          : userData.phone
                      }
                      onSave={(value: string) => {
                        dispatch(
                          setCoverLetter({
                            ...coverLetter,
                            phone: value,
                          })
                        );
                        handleSingleSave({ phone: value });
                      }}
                    />
                  </h2> */}
                    {/* <h2 className="font-semibold text-xs sm:text-sm before:w-3 before:h-3 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAgMS0yLjI1IDIuMjVoLTE1YTIuMjUgMi4yNSAwIDAgMS0yLjI1LTIuMjVWNi43NW0xOS41IDBBMi4yNSAyLjI1IDAgMCAwIDE5LjUgNC41aC0xNWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1bTE5LjUgMHYuMjQzYTIuMjUgMi4yNSAwIDAgMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMCAxLTIuMzYgMEwzLjMyIDguOTFhMi4yNSAyLjI1IDAgMCAxLTEuMDctMS45MTZWNi43NSIgLz4KPC9zdmc+Cg==')] flex before:mr-2">
                    <EditableField
                      value={
                        coverLetter?.email
                          ? coverLetter.email
                          : userData.email
                      }
                      onSave={(value: string) => {
                        dispatch(
                          setCoverLetter({
                            ...coverLetter,
                            email: value,
                          })
                        );
                        handleSingleSave({ email: value });
                      }}
                    />
                  </h2> */}
                  </li>

                  <li>
                    {/* <span className="flex justify-center text-xs font-semibold sm:text-sm ">
                    <EditableField
                      value={
                        coverLetter?.address
                          ? coverLetter.address
                          : userData.contact.street +
                            " " +
                            userData.contact.cityState +
                            " " +
                            userData.contact.country +
                            " " +
                            userData.contact.postalCode
                      }
                      onSave={(value: string) => {
                        dispatch(
                          setCoverLetter({
                            ...coverLetter,
                            address: value,
                          })
                        );
                        handleSingleSave({ address: value });
                      }}
                    />
                    {}
                  </span> */}
                  </li>
                </ul>
              </div>
            </div>

            <br />
            <div className="mt-4">
              {/* <span className="text-xs font-semibold sm:text-sm text-gray-950">
              <EditableField
                value={
                  coverLetter?.date
                    ? coverLetter.date
                    : getFormattedDate(date, "MM DD, YYYY")
                }
                onSave={(value: string) => {
                  dispatch(
                    setCoverLetter({ ...coverLetter, date: value })
                  );
                  handleSingleSave({ date: value });
                }}
              />
            </span> */}
            </div>
            <br />
            <br />

            <div
            // className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4  ${
            //   msgLoading ? "animate-pulse" : ""
            // }`}
            >
              {/* <div className="text-xs sm:text-sm ">
              {isEditing ? (
                <div
                  id="editor"
                  contentEditable={isEditing}
                  className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-1 sm:p-[10px] "
                  onBlur={() => {
                    setIsEditing(false);
                    handleSave();
                  }}
                ></div>
              ) : (
                <div
                  className=" text-gray-950"
                  dangerouslySetInnerHTML={{ __html: streamedData }}
                ></div>
              )}
            </div> */}
            </div>
            <div className="flex flex-col flex-wrap gap-3 mt-5 buttons md:flex-row">
              {/* <DownloadService
              componentRef={componentRef}
              type="onPage"
              fileName="ai-cover-letter"
            /> */}
              {/* {show && (
              <button
                disabled={
                  msgLoading ||
                  !session?.user?.email ||
                  !aiInputUserData ||
                  selectedOption === "" ||
                  (selectedOption === "file" && selectedFile === "") ||
                  (selectedOption === "aiResume" &&
                    setSelectedResumeId === "") ||
                  !show ||
                  isCoverLetterCopied
                }
                onClick={() => copyCoverLetter(streamedData)}
                className={`w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
                  msgLoading ||
                  !session?.user?.email ||
                  !aiInputUserData ||
                  selectedOption === "" ||
                  (selectedOption === "file" && selectedFile === "") ||
                  (selectedOption === "aiResume" &&
                    setSelectedResumeId === "") ||
                  !show ||
                  isCoverLetterCopied
                    ? " cursor-not-allowed"
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
                    className="w-3 h-3 text-sm md:w-4 md:h-4 dark:text-gray-300 text-gray-950"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>

                  <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                    {msgLoading
                      ? "Please wait..."
                      : isCoverLetterCopied
                      ? "Copied"
                      : "Copy to clipboard"}
                  </span>
                </div>
              </button>
            )} */}
              {/* {show && (
              <button
                type="button"
                disabled={!show || msgLoading || !session?.user?.email}
                onClick={handleClick}
                className={`w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
                  !show || msgLoading || !session?.user?.email
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } `}
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {EditIcon}
                  <span
                    className={`text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm ${
                      !show || msgLoading || !session?.user?.email
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } `}
                  >
                    Edit
                  </span>
                </div>
              </button>
            )} */}
              {/* {isEditing && (
              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group"
              >
                <div className="flex flex-row items-center justify-center gap-2">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1274 21V13H5.81717V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.81717 3V8H12.4654"
                      stroke="currentColor"
                      strokeWidth="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                    Save
                  </span>
                </div>
              </button>
            )} */}
            </div>
          </div>
        )}
        {/* {showPopup && (
        <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
        
          Credit Limit Reached !
        </div>
      )} */}
      </div>
    </>
  );
};

export default page;

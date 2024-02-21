"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";

import copy from "clipboard-copy";
import CoverLetterFileUploader from "@/components/dashboard/cover-letter-generator/CoverLetterFileUploader";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import { resetEmail, setEmail } from "@/store/emailSlice";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import EmailCardSingle from "@/components/dashboard/email-generator/EmailCardSingle";
import DownloadService from "@/helpers/downloadFile";
import { useAppContext } from "@/context/AppContext";
//
const PersonalizedEmailBot = () => {
  const componentRef = useRef<any>(null);
  const componentFirstRef = useRef<any>(null);
  const componentSecondRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [firstShow, setFirstShow] = useState<boolean>(false);
  const [secondShow, setSecondShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("profile"); // type
  const [streamedData, setStreamedData] = useState<string>("");
  const [streamedFirstFollowUpEmailText, setStreamedFirstFollowUpEmailText] =
    useState<string>("");
  const [streamedSecondFollowUpEmailText, setStreamedSecondFollowUpEmailText] =
    useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstEditing, setIsFirstEditing] = useState(false);
  const [isSecondEditing, setIsSecondEditing] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits } = useAppContext();

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const email = useSelector((state: any) => state.email);

  const creditLimits = useSelector((state: any) => state.creditLimits);

  const { resumes } = userData;
  const copyEmail = async (text: string) => {
    try {
      const coverLetterData = htmlToPlainText(text);
      await copy(coverLetterData);
      setIsEmailCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsEmailCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  const handleClick = (type: string) => {
    // setEditedContent(streamedData);
    if (type === "email") {
      setIsEditing(true);
    } else if (type === "firstFollowUp") {
      setIsFirstEditing(true);
    } else if (type === "secondFollowUp") {
      setIsSecondEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailText;
        }
      }
    } else if (isFirstEditing) {
      if (componentFirstRef.current) {
        const editorElement =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailText;
        }
      }
    } else if (isSecondEditing) {
      if (componentSecondRef.current) {
        const editorElement =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailText;
        }
      }
    }
    //  else {
    //   dispatch(resetEmail());
    // }
  }, [isEditing]);

  const handleGenerate = async (emailType: string = "email") => {
    // await getUserDataIfNotExists();

    if (emailType === "email") {
      if (session?.user?.email && aiInputUserData) {
        setMsgLoading(true);
        setShow(true);
        setStreamedData("");
        const obj: any = {
          type: selectedOption,
          email: session?.user?.email,
          generationType: "email",
          creditsUsed: creditLimits.email_generation,
          jobDescription,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
        };
        if (selectedOption === "file") {
          obj.file = selectedFile;
        } else if (selectedOption === "aiResume") {
          const foundResume = resumes.find(
            (resume: any) => resume.id === setSelectedResumeId
          );
          obj.userData = {
            jobTitle: foundResume.jobTitle,
            name: foundResume.name,
            primarySkills: foundResume.primarySkills,
            professionalSkills: foundResume.professionalSkills,
            secondarySkills: foundResume.secondarySkills,
            education: foundResume.secondarySkills,
            workExperienceArray: foundResume.workExperienceArray,
          };
        } else {
          obj.userData = aiInputUserData;
        }
        // Fetch keywords
        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
        })
          .then(async (resp: any) => {
            if (resp.ok) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedData((prev: any) => prev + text);
                tempText += text;
              }

              const emailsResponse = await axios.get("/api/emailBot/getAllEmails");

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(
                  setEmail(
                    emailsResponse.data.result.emails[
                      emailsResponse.data.result.emails.length - 1
                    ]
                  )
                );
              }
            } else {
              const res = await resp.json();
              setStreamedData(res.result + "! You ran out of Credits");
            }
          })
          .finally(() => {
            setMsgLoading(false);
          });
      } else {
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } else if (emailType === "firstFollowUp") {
      if (session?.user?.email && aiInputUserData) {
        setMsgLoading(true);
        setFirstShow( true);
        setStreamedFirstFollowUpEmailText("");
        const obj: any = {
          emailId: email.id,
          type: selectedOption,
          email: session?.user?.email,
          generationType: "firstFollowUp",
          emailText: htmlToPlainText(streamedData),
          creditsUsed: creditLimits.email_generation,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
        };
        obj.userData = aiInputUserData;

        // Fetch keywords
        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
        })
          .then(async (resp: any) => {
            if (resp.ok) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedFirstFollowUpEmailText((prev: any) => prev + text);
                tempText += text;
              }

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails"
                // payload
              );

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(
                  setEmail(
                    emailsResponse.data.result.emails[
                      emailsResponse.data.result.emails.length - 1
                    ]
                  )
                );
              }
            } else {
              const res = await resp.json();
              setStreamedFirstFollowUpEmailText(
                res.result + "! You ran out of Credits"
              );
            }
          })
          .finally(() => {
            setMsgLoading(false);
          });
      } else {
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } else if (emailType === "secondFollowUp") {
      if (session?.user?.email && aiInputUserData) {
        setMsgLoading(true);
        setSecondShow(true);
        setStreamedSecondFollowUpEmailText("");
        const obj: any = {
          emailId: email.id,
          type: selectedOption,
          email: session?.user?.email,
          generationType: "secondFollowUp",
          emailText: htmlToPlainText(streamedData),
          firstFollowUpText: htmlToPlainText(streamedFirstFollowUpEmailText),
          creditsUsed: creditLimits.email_generation,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
        };
        obj.userData = aiInputUserData;

        // Fetch keywords
        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
        })
          .then(async (resp: any) => {
            if (resp.ok) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedSecondFollowUpEmailText((prev: any) => prev + text);
                tempText += text;
              }

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails"
                // payload
              );

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(
                  setEmail(
                    emailsResponse.data.result.emails[
                      emailsResponse.data.result.emails.length - 1
                    ]
                  )
                );
              }
            } else {
              const res = await resp.json();
              setStreamedSecondFollowUpEmailText(
                res.result + "! You ran out of Credits"
              );
            }
          })
          .finally(() => {
            setMsgLoading(false);
          });
      } else {
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    }
  };

  const handleSave = async (type: string) => {
    let _emailText = "";

    if (type === "email") {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          _emailText = editorElement.innerHTML;
          editorElement.innerHTML = "";
        }
      }

      // setStreamedData(editedContent);
      setIsEditing(false);
      const payLoad = {
        emailText: _emailText, //editedContent,
        emailFirstFollowUpText: email.emailFirstFollowUpText,
        emailSecondFollowUpText: email.emailSecondFollowUpText,
        generatedOnDate: email.generatedOnDate,
        generatedViaOption: email.generatedViaOption,
        id: email.id,
        jobDescription: email.jobDescription,
        userEmail: email.userEmail,
      };

      const updatedEmails = await axios.put(
        `/api/emailBot/${email.id}`,
        payLoad,
        { headers: { "Content-Type": "application/json" } }
      );

      const updatedObject = {
        ...userData,
        emails: updatedEmails.data.results,
      };
      dispatch(setUserData({ ...updatedObject }));
      dispatch(setEmail(payLoad));
    } else if (type === "firstFollowUp") {
      if (componentFirstRef.current) {
        const editorElement =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          _emailText = editorElement.innerHTML;
          editorElement.innerHTML = "";
        }
      }

      // setStreamedData(editedContent);
      setIsEditing(false);
      const payLoad = {
        emailText: email.emailText,
        emailFirstFollowUpText: _emailText, //editedContent,
        emailSecondFollowUpText: email.emailSecondFollowUpText,
        generatedOnDate: email.generatedOnDate,
        generatedViaOption: email.generatedViaOption,
        id: email.id,
        jobDescription: email.jobDescription,
        userEmail: email.userEmail,
      };

      const updatedEmails = await axios.put(
        `/api/emailBot/${email.id}`,
        payLoad,
        { headers: { "Content-Type": "application/json" } }
      );

      const updatedObject = {
        ...userData,
        emails: updatedEmails.data.results,
      };
      dispatch(setUserData({ ...updatedObject }));
      dispatch(setEmail(payLoad));
    } else if (type === "secondFollowUp") {
      if (componentSecondRef.current) {
        const editorElement =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          _emailText = editorElement.innerHTML;
          editorElement.innerHTML = "";
        }
      }

      // setStreamedData(editedContent);
      setIsEditing(false);
      const payLoad = {
        emailText: email.emailText,
        emailFirstFollowUpText: email.emailFirstFollowUpText,
        emailSecondFollowUpText: _emailText, //editedContent,
        generatedOnDate: email.generatedOnDate,
        generatedViaOption: email.generatedViaOption,
        id: email.id,
        jobDescription: email.jobDescription,
        userEmail: email.userEmail,
      };

      const updatedEmails = await axios.put(
        `/api/emailBot/${email.id}`,
        payLoad,
        { headers: { "Content-Type": "application/json" } }
      );

      const updatedObject = {
        ...userData,
        emails: updatedEmails.data.results,
      };
      dispatch(setUserData({ ...updatedObject }));
      dispatch(setEmail(payLoad));
    }
  };

  const resetStatesAndRedux = () => {
    dispatch(resetEmail());
    setStreamedData("");
    setStreamedFirstFollowUpEmailText("");
    setStreamedSecondFollowUpEmailText("");
    setShow(false);
    setFirstShow(false);
    setSecondShow(false);
  };
  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }

    if (!streamedData) {
      setStreamedData(email.emailText);
      setStreamedFirstFollowUpEmailText(email.emailFirstFollowUpText);
      setStreamedSecondFollowUpEmailText(email.emailSecondFollowUpText);
    }
  }, [userData]);

  useEffect(() => {
    if (email.id !== "") {
      setShow(true);
      if (email.emailFirstFollowUpText && email.emailFirstFollowUpText !== "") {
        setFirstShow(true);
      }
      if (
        email.emailSecondFollowUpText &&
        email.emailSecondFollowUpText !== ""
      ) {
        setSecondShow(true);
      }
    } else {
      setShow(false);
      setFirstShow(false);
      setSecondShow(false);
    }
  }, [email]);

  useEffect(() => {
    if (email.emailText !== "") {
      console.log("insert");
      setStreamedData(email.emailText);
    }
    if (email.emailFirstFollowUpText && email.emailFirstFollowUpText !== "") {
      setStreamedFirstFollowUpEmailText(email.emailFirstFollowUpText);
    }
    if (email.emailSecondFollowUpText && email.emailSecondFollowUpText !== "") {
      setStreamedSecondFollowUpEmailText(email.emailSecondFollowUpText);
    }
  }, [
    email.emailText,
    email.emailFirstFollowUpText,
    email.emailSecondFollowUpText,
  ]);
  const historyProps = {
    dataSource: "emails",
    Component: (card: any) => (
      <EmailCardSingle card={card} componentRef={componentRef} source="" />
    ),
  };

  return (
    <>
      <div className="w-full sm:w-full ">
        <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
          <PreviouslyGeneratedList {...historyProps} />
          <>
            <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  rounded-[20px] px-4 lg:px-[30px] py-[41px] flex flex-col gap-5 ">
              {/* header */}
              <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <h3 className="text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
                  Generate Emails
                </h3>
                <div className="text-sm font-bold uppercase dark:text-gray-100 text-gray-950"></div>
              </div>

              {/* option */}

              <div className="text-sm text-[#615DFF] self-start">
                <span className="uppercase text-[11px] md:text-sm font-bold block gro">
                  select options
                </span>
              </div>

              <div className="flex flex-col gap-5 lg:px-0 ">
                <label
                  htmlFor="default-radio-1"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-[290px] lg:w-[400px] ${
                    selectedOption === "profile"
                      ? "border-[1px] border-[#615DFF]"
                      : ""
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
                    checked={selectedOption === "profile"}
                    className="w-5 h-4"
                  />
                  Use My Persona to write Email
                </label>
                <label
                  htmlFor="default-radio-2"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-[220px] lg:w-[290px] ${
                    selectedOption === "file"
                      ? "border-[1px] border-[#615DFF]"
                      : ""
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
                    className="w-4 h-4 border-[1px]"
                    checked={selectedOption === "file"}
                  />
                  Upload a new PDF Resume
                </label>
                {selectedOption == "file" ? (
                  <CoverLetterFileUploader
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                ) : (
                  ""
                )}
              </div>

              {/* form */}
              <div className="flex flex-col items-start justify-between gap-5 ">
                <div className="flex flex-col w-full">
                  <label className=" font-bold text-md justify-between items-center md:text-[24px] dark:text-gray-100 text-gray-950 flex py-[20px] gap-[3px]">
                    <div>
                      Paste Your Job Description
                      <span className="text-[#F04248] text-md md:text-[24px]">
                        *
                      </span>
                    </div>
                    <div
                      className={`text-[#000]  group relative rounded-full h-8 md:ml-3 flex  items-center px-[16px] py-[6px]  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
                    >
                      {creditLimits?.email_generation}
                      <div className="pl-1"> Credits</div>
                      <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32  xs:-top-12 md:-top-14  hidden group-hover:block  xs:rounded-br-none  text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                        {creditLimits?.email_generation} credits will be used
                        for Email Generation
                      </div>
                    </div>
                  </label>
                  <textarea
                    id="job-title"
                    name="jobTitle"
                    rows={6}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
                    className="w-full px-3 lg:px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
                  />
                </div>
                {show && (
                  <button
                    type="button"
                    onClick={resetStatesAndRedux}
                    className="dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full"
                  >
                    <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                      <div className="flex">
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
                          Generate New Email
                        </span>
                      </div>
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 w-full py-6 bg-white rounded-2xl md:px-8 xs:px-3 ">
                <h1 className="uppercase text-gray-950 font-bold text-[18px] pb-5">
                  your ai generated email
                </h1>
                {show ? (
                  <div className="py-4 bg-gray-200 shadow-md card_1 text-gray-950 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
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
                        </svg>{" "}
                        <div className="w-44  bg-white font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-40  xs:-top-12 md:-top-18  hidden group-hover:block  xs:rounded-br-none    mb-6 shadow-xl rounded-xl py-2  transition-all">
                          This Email Will Follow Your Application Directly
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 ${
                        msgLoading ? "animate-pulse" : ""
                      }`}
                    >
                      <div ref={componentRef}>
                        {isEditing ? (
                          <div
                            className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-[10px]"
                            id="editor"
                            contentEditable="true"
                          ></div>
                        ) : (
                          <div>
                            <div
                              className=" text-gray-950"
                              dangerouslySetInnerHTML={{
                                __html: streamedData,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 buttons md:flex-row">
                      <button
                        disabled={
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "")
                        }
                        onClick={() => handleGenerate()}
                        className={` flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                          (msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            jobDescription === "") &&
                          "cursor-not-allowed" // Add this class when the button is disabled
                        }`}
                      >
                        <span className="text-sm dark:text-gray-300 text-gray-950">
                          {msgLoading ? (
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`w-4 h-4 mr-3 ${
                                  msgLoading ? "animate-spin" : ""
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
                        componentRef={componentRef}
                        type="onPage"
                        fileName="ai-email"
                      />
                      {show && (
                        <div>
                          <button
                            disabled={
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !show ||
                              isEmailCopied
                            }
                            onClick={() => copyEmail(streamedData)}
                            className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !show ||
                              isEmailCopied
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
                              {msgLoading
                                ? "Please wait..."
                                : isEmailCopied
                                ? "Copied"
                                : "Copy to clipboard"}
                            </span>
                          </button>
                        </div>
                      )}
                      {show && (
                        <div>
                          <button
                            type="button"
                            disabled={
                              !show || msgLoading || !session?.user?.email
                            }
                            onClick={() => handleClick("email")}
                            className={` xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              !show || msgLoading || !session?.user?.email
                                ? "  cursor-not-allowed"
                                : ""
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
                            <span
                              className={`dark:text-gray-300 text-gray-950 text-sm `}
                            >
                              Edit
                            </span>
                          </button>
                        </div>
                      )}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleSave("email")}
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
                ) : (
                  <div className="relative py-4 bg-gray-200 shadow-md card_1 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
                    <button
                      type="button"
                      disabled={
                        msgLoading ||
                        !session?.user?.email ||
                        !aiInputUserData ||
                        selectedOption === "" ||
                        (selectedOption === "file" && selectedFile === "") ||
                        jobDescription === ""
                      }
                      onClick={() => handleGenerate()}
                      className={`dark:bg-gradient-to-r absolute z-10 top-1/2 left-1/2  -translate-x-1/2 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                        (msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          jobDescription === "") &&
                        "  cursor-not-allowed" // Apply these styles when the button is disabled
                      }`}
                    >
                      <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                        {msgLoading ? (
                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`w-4 h-4 mr-3 ${
                                msgLoading ? "animate-spin" : ""
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
                              className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                            >
                              Generate Email
                            </span>
                          </div>
                        )}
                      </span>
                    </button>
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
                        I am writing to apply for the Web Developer position at
                        [Company Name]. With [X years] of experience in web
                        development and expertise in languages such as HTML,
                        CSS, JavaScript, and frameworks like React, I am excited
                        about the opportunity to contribute to your team. I
                        recently led a team in building a responsive e-commerce
                        website from scratch, showcasing my ability to deliver
                        high-quality solutions on time. I am drawn to your
                        company{"'"}s commitment to innovation and look forward
                        to the possibility of contributing to your projects.
                      </p>
                      <p className="my-4">
                        Thank you for considering my application. I have
                        attached my resume for your review and am available for
                        further discussion at your convenience.
                      </p>
                      <h4 className="">Best Regards,</h4>
                      <h4>[Person Name]</h4>
                    </div>
                  </div>
                )}

                {firstShow ? (
                  <div className="py-4 bg-gray-200 shadow-md card_1 text-gray-950 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
                    <div className="flex">
                      <h2 className="mb-2 text-lg"> First Follow Up</h2>
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
                          You will send the second email after a week. You can
                          schedule this email in advance in google.
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 ${
                        msgLoading ? "animate-pulse" : ""
                      }`}
                    >
                      <div ref={componentFirstRef}>
                        {isFirstEditing ? (
                          <div
                            className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-[10px]"
                            id="first_editor"
                            contentEditable="true"
                          ></div>
                        ) : (
                          <div>
                            <div
                              className=" text-gray-950"
                              dangerouslySetInnerHTML={{
                                __html: streamedFirstFollowUpEmailText,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 buttons md:flex-row">
                      <button
                        disabled={
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "")
                        }
                        onClick={() => handleGenerate("firstFollowUp")}
                        className={` flex gap-2 items-center lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                          (msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "")) &&
                          "cursor-not-allowed" // Add this class when the button is disabled
                        }`}
                      >
                        <span className="text-sm dark:text-gray-300 text-gray-950">
                          {msgLoading ? (
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`w-4 h-4 mr-3 ${
                                  msgLoading ? "animate-spin" : ""
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
                        componentRef={componentFirstRef}
                        type="onPage"
                        fileName="ai-email"
                      />
                      {firstShow && (
                        <div>
                          <button
                            disabled={
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !firstShow ||
                              isEmailCopied
                            }
                            onClick={() =>
                              copyEmail(streamedFirstFollowUpEmailText)
                            }
                            className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !firstShow ||
                              isEmailCopied
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
                              {msgLoading
                                ? "Please wait..."
                                : isEmailCopied
                                ? "Copied"
                                : "Copy to clipboard"}
                            </span>
                          </button>
                        </div>
                      )}
                      {firstShow && (
                        <div>
                          <button
                            type="button"
                            disabled={
                              !firstShow || msgLoading || !session?.user?.email
                            }
                            onClick={() => handleClick("firstFollowUp")}
                            className={` xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              !firstShow || msgLoading || !session?.user?.email
                                ? "  cursor-not-allowed"
                                : ""
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
                            <span
                              className={`dark:text-gray-300 text-gray-950 text-sm `}
                            >
                              Edit
                            </span>
                          </button>
                        </div>
                      )}
                      {isFirstEditing && (
                        <button
                          type="button"
                          onClick={() => handleSave("firstFollowUp")}
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
                ) : (
                  <div className="relative py-4 my-8 bg-gray-200 shadow-md card_2 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
                    <button
                      type="button"
                      disabled={
                        msgLoading ||
                        !session?.user?.email ||
                        !aiInputUserData ||
                        selectedOption === "" ||
                        (selectedOption === "file" && selectedFile === "")
                      }
                      onClick={() => handleGenerate("firstFollowUp")}
                      className={`dark:bg-gradient-to-r z-10 absolute top-1/2 left-1/2  -translate-x-1/2 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                        (msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          jobDescription === "") &&
                        "  cursor-not-allowed" // Apply these styles when the button is disabled
                      }`}
                    >
                      <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                        {msgLoading ? (
                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`w-4 h-4 mr-3 ${
                                msgLoading ? "animate-spin" : ""
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
                              className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                            >
                              Generate First Follow Up Email
                            </span>
                          </div>
                        )}
                      </span>
                    </button>
                    <div className="flex flex-col text-gray-950 blur">
                      <div className="flex">
                        <h2 className="mb-2 text-lg"> First Follow Up</h2>
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
                            You will send the second email after a week. You can
                            schedule this email in advance in google.
                          </div>
                        </div>
                      </div>

                      <h4 className="mb-4 capitalize">dear hiring manager,</h4>
                      <p>
                        I am writing to apply for the Web Developer position at
                        [Company Name]. With [X years] of experience in web
                        development and expertise in languages such as HTML,
                        CSS, JavaScript, and frameworks like React, I am excited
                        about the opportunity to contribute to your team. I
                        recently led a team in building a responsive e-commerce
                        website from scratch, showcasing my ability to deliver
                        high-quality solutions on time. I am drawn to your
                        company{"'"}s commitment to innovation and look forward
                        to the possibility of contributing to your projects.
                      </p>
                      <p className="my-4">
                        Thank you for considering my application. I have
                        attached my resume for your review and am available for
                        further discussion at your convenience.
                      </p>
                      <h4 className="">Best Regards,</h4>
                      <h4>[Person Name]</h4>
                    </div>
                  </div>
                )}

                {secondShow ? (
                  <div className="py-4 bg-gray-200 shadow-md card_1 text-gray-950 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
                    <div className="flex">
                      <h2 className="mb-2 text-lg"> Second Follow Up</h2>
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
                          You will send the second email after a week. You can
                          schedule this email in advance in google.
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 ${
                        msgLoading ? "animate-pulse" : ""
                      }`}
                    >
                      <div ref={componentSecondRef}>
                        {isSecondEditing ? (
                          <div
                            className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-[10px]"
                            id="second_editor"
                            contentEditable="true"
                          ></div>
                        ) : (
                          <div>
                            <div
                              className=" text-gray-950"
                              dangerouslySetInnerHTML={{
                                __html: streamedSecondFollowUpEmailText,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 buttons md:flex-row">
                      <button
                        disabled={
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "")
                        }
                        onClick={() => handleGenerate("secondFollowUp")}
                        className={` flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                          (msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "")) &&
                          "cursor-not-allowed" // Add this class when the button is disabled
                        }`}
                      >
                        <span className="text-sm dark:text-gray-300 text-gray-950">
                          {msgLoading ? (
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`w-4 h-4 mr-3 ${
                                  msgLoading ? "animate-spin" : ""
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
                        componentRef={componentSecondRef}
                        type="onPage"
                        fileName="ai-email"
                      />
                      {secondShow && (
                        <div>
                          <button
                            disabled={
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !secondShow ||
                              isEmailCopied
                            }
                            onClick={() =>
                              copyEmail(streamedSecondFollowUpEmailText)
                            }
                            className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              (selectedOption === "aiResume" &&
                                setSelectedResumeId === "") ||
                              !secondShow ||
                              isEmailCopied
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
                              {msgLoading
                                ? "Please wait..."
                                : isEmailCopied
                                ? "Copied"
                                : "Copy to clipboard"}
                            </span>
                          </button>
                        </div>
                      )}
                      {secondShow && (
                        <div>
                          <button
                            type="button"
                            disabled={
                              !secondShow || msgLoading || !session?.user?.email
                            }
                            onClick={() => handleClick("secondFollowUp")}
                            className={` xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                              !secondShow || msgLoading || !session?.user?.email
                                ? "  cursor-not-allowed"
                                : ""
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
                            <span
                              className={`dark:text-gray-300 text-gray-950 text-sm `}
                            >
                              Edit
                            </span>
                          </button>
                        </div>
                      )}
                      {isSecondEditing && (
                        <button
                          type="button"
                          onClick={() => handleSave("secondFollowUp")}
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
                ) : (
                  <div className="relative py-4 bg-gray-200 shadow-md card_3 rounded-2xl md:px-8 xs:px-3 md:text-base xs:text-sm">
                    <button
                      type="button"
                      disabled={
                        msgLoading ||
                        !session?.user?.email ||
                        !aiInputUserData ||
                        selectedOption === "" ||
                        (selectedOption === "file" && selectedFile === "") ||
                        jobDescription === ""
                      }
                      onClick={() => handleGenerate("secondFollowUp")}
                      className={`dark:bg-gradient-to-r absolute z-10 top-1/2 left-1/2  -translate-x-1/2 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                        (msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          jobDescription === "") &&
                        "  cursor-not-allowed" // Apply these styles when the button is disabled
                      }`}
                    >
                      <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                        {msgLoading ? (
                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`w-4 h-4 mr-3 ${
                                msgLoading ? "animate-spin" : ""
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
                              className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                            >
                              Generate Second Follow Up Email
                            </span>
                          </div>
                        )}
                      </span>
                    </button>

                    <div className="flex flex-col text-gray-950 blur ">
                      <div className="flex">
                        <h4 className="mb-2">Second Follow Up</h4>
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
                            You will send the second email after a week. You can
                            schedule this email in advance in google.
                          </div>
                        </div>
                      </div>

                      <h4 className="mb-4 capitalize">dear hiring manager,</h4>
                      <p>
                        I am writing to apply for the Web Developer position at
                        [Company Name]. With [X years] of experience in web
                        development and expertise in languages such as HTML,
                        CSS, JavaScript, and frameworks like React, I am excited
                        about the opportunity to contribute to your team. I
                        recently led a team in building a responsive e-commerce
                        website from scratch, showcasing my ability to deliver
                        high-quality solutions on time. I am drawn to your
                        company{"'"}s commitment to innovation and look forward
                        to the possibility of contributing to your projects.
                      </p>
                      <p className="my-4">
                        Thank you for considering my application. I have
                        attached my resume for your review and am available for
                        further discussion at your convenience.
                      </p>
                      <h4 className="">Best Regards,</h4>
                      <h4>[Person Name]</h4>
                    </div>
                  </div>
                )}
              </div>

              {showPopup && (
                <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
                  {/* Popup content here */}
                  Credit Limit Reached !
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default PersonalizedEmailBot;

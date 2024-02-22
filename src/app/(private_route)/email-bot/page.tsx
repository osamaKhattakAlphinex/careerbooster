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
import { useAppContext } from "@/context/AppContext";
import { EmailPlaceHolderCard } from "@/components/dashboard/email-generator/EmailPlaceHolderCard";
import { EmailCard } from "@/components/dashboard/email-generator/EmailCard";

const PersonalizedEmailBot = () => {
  const componentRef = useRef<any>(null);
  const componentFirstRef = useRef<any>(null);
  const componentSecondRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
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
  const [isEmailCopied, setIsEmailCopied] = useState<any>({
    emailCopied: false,
    firstFollowUpCopied: false,
    secondFollowUpCopied: false,
  });
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits } = useAppContext();
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [firstFollowUpLoading, setFirstFollowUpLoading] =
    useState<boolean>(false);
  const [secondFollowUpLoading, setSecondFollowUpLoading] =
    useState<boolean>(false);
  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const email = useSelector((state: any) => state.email);

  const creditLimits = useSelector((state: any) => state.creditLimits);

  const { resumes } = userData;
  const copyEmail = async (text: string, type: string) => {
    try {
      const coverLetterData = htmlToPlainText(text);
      await copy(coverLetterData);
      if (type === "email") {
        setIsEmailCopied({
          emailCopied: true,
          firstFollowUpCopied: false,
          secondFollowUpCopied: false,
        });
      } else if (type === "firstFollowUp") {
        setIsEmailCopied({
          emailCopied: false,
          firstFollowUpCopied: true,
          secondFollowUpCopied: false,
        });
      } else if (type === "secondFollowUp") {
        setIsEmailCopied({
          emailCopied: false,
          firstFollowUpCopied: false,
          secondFollowUpCopied: true,
        });
      }
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsEmailCopied({
          emailCopied: false,
          firstFollowUpCopied: false,
          secondFollowUpCopied: false,
        });
      }, 1500);
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
    }
    if (isFirstEditing) {
      if (componentFirstRef.current) {
        const editorElement =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailFirstFollowUpText;
        }
      }
    }
    if (isSecondEditing) {
      if (componentSecondRef.current) {
        const editorElement =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailSecondFollowUpText;
        }
      }
    }
  }, [isEditing, isFirstEditing, isSecondEditing]);

  const handleGenerate = async (emailType: string = "email") => {
    // await getUserDataIfNotExists();

    if (emailType === "email") {
      if (session?.user?.email && aiInputUserData) {
        setEmailLoading(true);
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

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails"
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
              setStreamedData(res.result + "! You ran out of Credits");
            }
          })
          .finally(() => {
            setEmailLoading(false);
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
        setFirstFollowUpLoading(true);
        setFirstShow(true);
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
            setFirstFollowUpLoading(false);
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
        setSecondFollowUpLoading(true);
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
            setSecondFollowUpLoading(false);
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
      setIsFirstEditing(false);
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
      setIsSecondEditing(false);
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

  const EmailPlaceholderCardProps = {
    selectedFile: selectedFile,
    selectedOption: selectedOption,
    jobDescription: jobDescription,
  };

  return (
    <div className="w-full sm:w-full ">
      <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
        <PreviouslyGeneratedList {...historyProps} />
        <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  rounded-[20px] px-4 lg:px-[30px] py-[30px] flex flex-col gap-3 ">
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
              className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-fit ${
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
              className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-fit ${
                selectedOption === "file" ? "border-[1px] border-[#615DFF]" : ""
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
              <label className=" font-bold text-md justify-between items-center md:text-[24px] dark:text-gray-100 text-gray-950 flex pb-[20px] gap-[3px]">
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
                    {creditLimits?.email_generation} credits will be used for
                    Email Generation
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

          {show ? (
            <EmailCard
              isEmailCopied={isEmailCopied.emailCopied}
              copyEmail={(text: string) => copyEmail(text, "email")}
              msgLoading={emailLoading}
              handleGenerate={() => handleGenerate()}
              handleClick={() => handleClick("email")}
              handleSave={() => handleSave("email")}
              isEditing={isEditing}
              componentRef={componentRef}
              streamedData={streamedData}
              show={show}
              editorId="editor"
              cardHeading="Your AI Generated Email"
              cardInstructions="This Email will follow your application directly"
            />
          ) : (
            <EmailPlaceHolderCard
              {...EmailPlaceholderCardProps}
              msgLoading={emailLoading}
              handleGenerate={() => handleGenerate()}
              generateButtonText="Generate Email"
            />
          )}

          {firstShow ? (
            <EmailCard
              isEmailCopied={isEmailCopied.firstFollowUpCopied}
              copyEmail={(text: string) => copyEmail(text, "firstFollowUp")}
              msgLoading={firstFollowUpLoading}
              handleGenerate={() => handleGenerate("firstFollowUp")}
              handleClick={() => handleClick("firstFollowUp")}
              handleSave={() => handleSave("firstFollowUp")}
              isEditing={isFirstEditing}
              componentRef={componentFirstRef}
              streamedData={streamedFirstFollowUpEmailText}
              show={firstShow}
              editorId="first_editor"
              cardHeading="First Follow Up Email"
              cardInstructions="You can send the second email after a week. You can schedule this email in advance"
            />
          ) : (
            <EmailPlaceHolderCard
              {...EmailPlaceholderCardProps}
              msgLoading={firstFollowUpLoading}
              handleGenerate={() => handleGenerate("firstFollowUp")}
              generateButtonText="Generate First Follow Up Email"
            />
          )}

          {secondShow ? (
            <EmailCard
              isEmailCopied={isEmailCopied.secondFollowUpCopied}
              copyEmail={(text: string) => copyEmail(text, "secondFollowUp")}
              msgLoading={secondFollowUpLoading}
              handleGenerate={() => handleGenerate("secondFollowUp")}
              handleClick={() => handleClick("secondFollowUp")}
              handleSave={() => handleSave("secondFollowUp")}
              isEditing={isSecondEditing}
              componentRef={componentSecondRef}
              streamedData={streamedSecondFollowUpEmailText}
              show={secondShow}
              editorId="second_editor"
              cardHeading="Second Follow Up Email"
              cardInstructions="You can send another email if second email is not responded. You can schedule this email in advance"
            />
          ) : (
            <EmailPlaceHolderCard
              {...EmailPlaceholderCardProps}
              msgLoading={secondFollowUpLoading}
              handleGenerate={() => handleGenerate("secondFollowUp")}
              generateButtonText="Generate Second Follow Up Email"
            />
          )}

          {showPopup && (
            <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
              {/* Popup content here */}
              Credit Limit Reached !
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PersonalizedEmailBot;

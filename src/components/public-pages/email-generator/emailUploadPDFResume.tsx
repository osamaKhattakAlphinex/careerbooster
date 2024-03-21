"use client";

import { useEffect, useRef, useState } from "react";
import copy from "clipboard-copy";
import { useRouter } from "next/navigation";
import { EmailCard } from "@/components/dashboard/email-generator/EmailCard";
import { EmailPlaceHolderCard } from "@/components/dashboard/email-generator/EmailPlaceHolderCard";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";

const loadFromLocalStorage = () => {
  const emailContent = localStorage.getItem("resume-content");
  const emailFileName = localStorage.getItem("resume-fileName");
  return { emailContent, emailFileName };
};

const EmailUploadPDFResume = () => {
  // local states
  const router = useRouter();
  const [emailContent, setEmailContent] = useState<any>("");
  const [emailFileName, setEmailFileName] = useState<any>("");

  // Define a state variable to hold both first name and full name
  const [names, setNames] = useState({
    id: "",
    firstName: "",
    fullName: "",
    email: "",
    lastName: "",
    phone: "",
    location: "",
  });

  const [jobDescription, setJobDescription] = useState<string>("");
  const componentRef = useRef<any>(null);
  const componentFirstRef = useRef<any>(null);
  const componentSecondRef = useRef<any>(null);

  const [show, setShow] = useState<boolean>(false);
  const [firstShow, setFirstShow] = useState<boolean>(false);
  const [secondShow, setSecondShow] = useState<boolean>(false);

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

  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [firstFollowUpLoading, setFirstFollowUpLoading] =
    useState<boolean>(false);
  const [secondFollowUpLoading, setSecondFollowUpLoading] =
    useState<boolean>(false);

  const EmailPlaceholderCardProps = {
    selectedFile: "",
    selectedOption: "resume",
    jobDescription: jobDescription,
  };

  const handleGenerate = async (emailType: string = "email") => {
    if (emailType === "email") {
      setEmailLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        generationType: "email",
        jobDescription,
        content: emailContent,
      };

      // Fetch keywords
      fetch("/api/emailBot/emailGenerator/emailGeneratorToolMain", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                showSuccessToast("Email generated successfully");
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev: any) => prev + text);
              tempText += text;
            }
            setStreamedData((prev) => prev.replace("```html", ""));
            setStreamedData((prev) => prev.replace("```", ""));
          }
        })
        .catch((err) => {
          showErrorToast("Failed to generate Email");
        })
        .finally(() => {
          setEmailLoading(false);
        });
    } else if (emailType === "firstFollowUp") {
      setFirstFollowUpLoading(true);
      setFirstShow(true);
      setStreamedFirstFollowUpEmailText("");

      const obj: any = {
        jobDescription,
        generationType: "firstFollowUp",
        emailText: htmlToPlainText(streamedData),
        content: emailContent,
      };

      fetch("/api/emailBot/emailGenerator/emailGeneratorToolMain", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                showSuccessToast("Email generated successfully");
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedFirstFollowUpEmailText((prev: any) => prev + text);
              tempText += text;
            }
            setStreamedFirstFollowUpEmailText((prev) =>
              prev.replace("```html", "")
            );
            setStreamedFirstFollowUpEmailText((prev) =>
              prev.replace("```", "")
            );
          }
        })
        .catch((err) => {
          showErrorToast("Failed to generate Email");
        })
        .finally(() => {
          setFirstFollowUpLoading(false);
        });
    } else if (emailType === "secondFollowUp") {
      setSecondFollowUpLoading(true);
      setSecondShow(true);
      setStreamedSecondFollowUpEmailText("");

      const obj: any = {
        jobDescription,
        generationType: "secondFollowUp",
        emailText: htmlToPlainText(streamedData),
        firstFollowUpText: htmlToPlainText(streamedFirstFollowUpEmailText),
        content: emailContent,
      };

      fetch("/api/emailBot/emailGenerator/emailGeneratorToolMain", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                showSuccessToast("Email generated successfully");
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedSecondFollowUpEmailText((prev: any) => prev + text);
              tempText += text;
            }

            setStreamedSecondFollowUpEmailText((prev) =>
              prev.replace("```html", "")
            );
            setStreamedSecondFollowUpEmailText((prev) =>
              prev.replace("```", "")
            );
          }
        })
        .catch((err) => {
          showErrorToast("Failed to generate Email");
        })
        .finally(() => {
          setSecondFollowUpLoading(false);
        });
    }
  };

  const moveToRegister = () => {
    if (emailContent) {
      router.replace(
        `/register?firstName=${names.firstName}&lastName=${names.lastName}&email=${names.email}&file=${emailFileName}`
      );
    } else {
    }
  };

  const handleClick = (type: string) => {
    if (type === "email") {
      setIsEditing(true);
      setIsFirstEditing(false);
      setIsSecondEditing(false);
    } else if (type === "firstFollowUp") {
      setIsFirstEditing(true);
      setIsEditing(false);
      setIsSecondEditing(false);
    } else if (type === "secondFollowUp") {
      setIsSecondEditing(true);
      setIsFirstEditing(false);
      setIsEditing(false);
    }
  };

  const handleSave = (type: string) => {
    if (type === "email") {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          setStreamedData(editorElement.innerHTML);
        }
        setIsEditing(false);
      }
    } else if (type === "firstFollowUp") {
      if (componentFirstRef.current) {
        const editorElement =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          setStreamedFirstFollowUpEmailText(editorElement.innerHTML);
        }
        setIsFirstEditing(false);
      }
    } else if (type === "secondFollowUp") {
      if (componentSecondRef.current) {
        const editorElement =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          setStreamedSecondFollowUpEmailText(editorElement.innerHTML);
        }
        setIsSecondEditing(false);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = streamedData;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
    if (isFirstEditing) {
      if (componentFirstRef.current) {
        const editorElement =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          editorElement.innerHTML = streamedFirstFollowUpEmailText;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
    if (isSecondEditing) {
      if (componentSecondRef.current) {
        const editorElement =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          editorElement.innerHTML = streamedSecondFollowUpEmailText;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
  }, [isEditing, isFirstEditing, isSecondEditing]);

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

  useEffect(() => {
    const data = loadFromLocalStorage();
    if (data) {
      setEmailContent(data.emailContent);
      setEmailFileName(data.emailFileName);
    }
  }, []);

  return (
    <div className="container flex flex-col items-start justify-center gap-10 mx-auto my-16">
      {/* form */}
      <div className="flex flex-col items-start justify-between w-full gap-5 ">
        <div className="flex flex-col w-full">
          <label className="mb-1 xs:font-semibold md:font-bold flex justify-between  items-center text-[14px] md:text-[24px] dark:text-gray-100 text-gray-950  lg:pb-[16px] gap-[3px]">
            <div>
              Paste Job Description
              <span className="text-[#F04248] text-[14px]"> *</span>
            </div>
          </label>
          <textarea
            id="job-title"
            name="jobTitle"
            rows={6}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Copy the job description for the position you are applying and paste it here to generate post application follow up emails to the hiring managers."
            className="w-full px-3 lg:px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
          />
        </div>
        {show && (
          <button
            type="button"
            onClick={() => {
              // resetStatesAndRedux
            }}
            className="w-max flex flex-row transition-all duration-300  group justify-center sm:justify-start lg:px-6 px-4 py-2 rounded-full dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1.5px] border-gray-950 bg-transparent "
          >
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
                Generate New Email
              </span>
            </div>
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
    </div>
  );
};

export default EmailUploadPDFResume;

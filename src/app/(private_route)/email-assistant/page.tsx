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
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import { useTourContext } from "@/context/TourContext";
import TourBot from "@/components/dashboard/TourBot";
import { RootState } from "@/store/store";

const PersonalizedEmailBot = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const componentFirstRef = useRef<HTMLDivElement | null>(null);
  const componentSecondRef = useRef<HTMLDivElement | null>(null);
  const [aiInputUserData, setAiInputUserData] = useState({});
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
  const [isEmailCopied, setIsEmailCopied] = useState({
    emailCopied: false,
    firstFollowUpCopied: false,
    secondFollowUpCopied: false,
  });
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const {
    setAvailableCredits,
    abortController,
    setAbortController,
    outOfCredits,
    setOutOfCredits,
  } = useAppContext();
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [firstFollowUpLoading, setFirstFollowUpLoading] =
    useState<boolean>(false);
  const [secondFollowUpLoading, setSecondFollowUpLoading] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const email = useSelector((state: RootState) => state.email);

  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  useEffect(() => {
    return () => {
      abortController?.abort();
      setAbortController(new AbortController());
    };
  }, []);
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

  const {
    emailElementRef,
    tourBotRef,
    emailCardsElementRef,
    historyCardRef,
    availableCreditsRef,
  } = useTourContext();

  const tourBotConfig = {
    name: "emailAssistant",
    audios: [
      {
        url: "/email-history-card.mp3",
        for: "history",
      },
      {
        url: "/emails-main-1.mp3",
        for: "tool",
      },
      {
        url: "/emails-main-2.mp3",
        for: "cards",
      },
    ],
    toolRefs: [
      {
        ref: historyCardRef,
        for: "history",
      },
      {
        ref: emailElementRef,
        for: "tool",
      },
      {
        ref: emailCardsElementRef,
        for: "cards",
      },
    ],
  };

  const tourBotConfig2 = {
    name: "resumeBuilder",
    audios: [
      {
        url: "/OutOfCredits.mp3",
        for: "history",
      },
    ],
    toolRefs: [
      {
        ref: availableCreditsRef,
        for: "history",
      },
    ],
  };

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.emailAssistant) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  useEffect(() => {
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

  const handleClick = (type: string) => {
    // setEditedContent(streamedData);
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

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement: HTMLDivElement | null =
          componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailText;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
    if (isFirstEditing) {
      if (componentFirstRef.current) {
        const editorElement: HTMLDivElement | null =
          componentFirstRef.current.querySelector("#first_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailFirstFollowUpText;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
    if (isSecondEditing) {
      if (componentSecondRef.current) {
        const editorElement: HTMLDivElement | null =
          componentSecondRef.current.querySelector("#second_editor");
        if (editorElement) {
          editorElement.innerHTML = email.emailSecondFollowUpText;
          editorElement.focus(); // Focus on the editable area
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
        const obj = {
          type: selectedOption,
          email: session?.user?.email,
          generationType: "email",
          creditsUsed: creditLimits.email_generation,
          jobDescription,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
          file: "",
          userData: {},
        };
        if (selectedOption === "file") {
          obj.file = selectedFile;
        } else {
          obj.userData = aiInputUserData;
        }

        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
          signal: abortController?.signal,
        })
          .then(async (resp) => {
            if (resp.ok && resp.body) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  showSuccessToast("Email generated successfully");

                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedData((prev) => prev + text);
                tempText += text;
              }
              setStreamedData((prev) => prev.replace("```html", ""));
              setStreamedData((prev) => prev.replace("```", ""));

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails",
                { signal: abortController?.signal }
              );

              console.log(emailsResponse);

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(setEmail(emailsResponse.data.result.emails[0]));
              }
            } else {
              const res = await resp.json();
              if (resp.status === 429) {
                setStreamedData(res.result + "! You ran out of Credits");
                showErrorToast("You ran out of Credits!");
                setOutOfCredits(true);
              } else {
                showErrorToast("Failed to generate Email");
              }
            }
          })
          .catch((err) => {
            console.log(err);
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
        const obj = {
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
          userData: {},
        };
        obj.userData = aiInputUserData;

        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
          signal: abortController?.signal,
        })
          .then(async (resp) => {
            if (resp.ok && resp.body) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  showSuccessToast("Email generated successfully");

                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedFirstFollowUpEmailText((prev) => prev + text);
                tempText += text;
              }
              setStreamedFirstFollowUpEmailText((prev) =>
                prev.replace("```html", "")
              );
              setStreamedFirstFollowUpEmailText((prev) =>
                prev.replace("```", "")
              );

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails",
                { signal: abortController?.signal }
              );

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(setEmail(emailsResponse.data.result.emails[0]));
              }
            } else {
              const res = await resp.json();
              if (resp.status === 429) {
                setStreamedFirstFollowUpEmailText(
                  res.result + "! You ran out of Credits"
                );
                showErrorToast("You ran out of Credits!");
                setOutOfCredits(true);
              } else {
                showErrorToast("Failed to generate Email");
              }
            }
          })
          .catch((err) => {
            console.log(err);
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
        const obj = {
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
          userData: {},
        };
        obj.userData = aiInputUserData;

        fetch("/api/emailBot/emailGenerator", {
          method: "POST",
          body: JSON.stringify(obj),
          signal: abortController?.signal,
        })
          .then(async (resp) => {
            if (resp.ok && resp.body) {
              setAvailableCredits(true);

              const reader = resp.body.getReader();
              let tempText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  showSuccessToast("Email generated successfully");

                  break;
                }
                const text = new TextDecoder().decode(value);
                setStreamedSecondFollowUpEmailText((prev) => prev + text);
                tempText += text;
              }

              setStreamedSecondFollowUpEmailText((prev) =>
                prev.replace("```html", "")
              );
              setStreamedSecondFollowUpEmailText((prev) =>
                prev.replace("```", "")
              );

              const emailsResponse = await axios.get(
                "/api/emailBot/getAllEmails",
                { signal: abortController?.signal }
              );

              if (emailsResponse.data.success) {
                const updatedObject = {
                  ...userData,
                  emails: emailsResponse.data.result.emails,
                };

                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(setEmail(emailsResponse.data.result.emails[0]));
              }
            } else {
              const res = await resp.json();
              if (resp.status === 429) {
                setStreamedSecondFollowUpEmailText(
                  res.result + "! You ran out of Credits"
                );
                showErrorToast("You ran out of Credits!");
                setOutOfCredits(true);
              } else {
                showErrorToast("Failed to generate Email");
              }
            }
          })
          .catch((err) => {
            console.log(err);
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
        {
          headers: { "Content-Type": "application/json" },
          signal: abortController?.signal,
        }
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
        {
          headers: { "Content-Type": "application/json" },
          signal: abortController?.signal,
        }
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
        {
          headers: { "Content-Type": "application/json" },
          signal: abortController?.signal,
        }
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
    setShow(false);
    setFirstShow(false);
    setSecondShow(false);
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
    Component: (card) => (
      <EmailCardSingle card={card} componentRef={componentRef} source="" />
    ),
  };

  const EmailPlaceholderCardProps = {
    selectedFile: selectedFile,
    selectedOption: selectedOption,
    jobDescription: jobDescription,
    emailText: streamedData,
    emailFirstFollowUpText: streamedFirstFollowUpEmailText,
  };

  return (
    <>
      <div className="w-full sm:w-full ">
        <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]">
          <PreviouslyGeneratedList {...historyProps} />
          <div
            ref={(ref: HTMLDivElement) => (emailElementRef.current = ref)}
            className=" my-4 dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  rounded-lg px-4 lg:px-[30px] py-[30px] flex flex-col gap-3 "
          >
            {/* header */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <h3 className="text-sm font-bold uppercase md:text-base dark:text-gray-100 text-gray-950">
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
                className={`flex gap-3 items-center rounded-full   cursor-pointer lg:text-[15px] text-[11px]  w-fit ${
                  selectedOption === "profile"
                    ? "dark:text-[#f0f0f0] text-gray-950"
                    : "dark:text-[#959595] text-[#acabab]"
                }`}
              >
                <input
                  // style={{
                  //   color: "#B324D7",
                  //   background: "#B324D7",
                  //   border: "1px solid #B324D7",
                  // }}
                  id="default-radio-1"
                  type="radio"
                  value="profile"
                  name="default-radio"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  checked={selectedOption === "profile"}
                  className="w-5 h-4 accent-[#B324D7]"
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
                  className="w-4 h-4 accent-[#B324D7]"
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
            </div>

            {/* form */}
            <div className="flex flex-col items-start justify-between gap-5 ">
              <div className="flex flex-col w-full">
                <label className="flex items-center justify-between gap-1 mb-1 text-sm xs:font-semibold md:font-bold md:text-lg dark:text-gray-100 text-gray-950/80 lg:pb-4">
                  <span className="text-[10px] md:text-sm dark:text-gray-100 text-gray-950 uppercase font-bold after:content-['*'] after:text-[#F04248] after:ml-1 py-4">
                    Paste Job Description
                  </span>
                  <div className="text-gray-950/80 group relative rounded-full md:ml-3 flex items-center px-2 md:px-4 md:py-2  bg-[#FEB602] text-[10px] sm:text-sm font-semibold">
                    {creditLimits?.email_generation}
                    <div className="pl-1"> Credits</div>
                    <div className="w-44 bg-gradient-to-r  hover:from-purple-800 hover:to-pink-600  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32  xs:-top-12 md:-top-14  hidden group-hover:block  xs:rounded-br-none  text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                      {creditLimits?.email_generation} credits will be used for
                      Email Generation
                    </div>
                  </div>
                </label>
                <textarea
                  value={jobDescription}
                  id="job-title"
                  name="jobTitle"
                  rows={6}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Copy the job description for the position you are applying and paste it here to generate post application follow up emails to the hiring managers."
                  className="w-full px-3 lg:px-8 rounded-lg text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
                />
                <a
                  // disabled={jobDescription == ""}
                  className=" hover:underline ml-auto cursor-pointer mt-4"
                  onClick={() => {
                    setJobDescription("");
                  }}
                >
                  <span className="text-xs capitalize dark:text-gray-300  text-gray-950 md:text-sm">
                    clear input
                  </span>
                </a>
              </div>
              {show && (
                <button
                  type="button"
                  onClick={resetStatesAndRedux}
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
          </div>
          <div
            className="my-4   dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  rounded-lg px-4 lg:px-[30px] py-[30px] flex flex-col gap-3 "
            ref={(ref: HTMLDivElement) => (emailCardsElementRef.current = ref)}
          >
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
      <TourBot config={outOfCredits ? tourBotConfig2 : tourBotConfig} />
    </>
  );
};

export default PersonalizedEmailBot;

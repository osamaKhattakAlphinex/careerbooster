"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";

interface Props {
  setSelectedResumeId: string;
  setSetSelectedResumeId: React.Dispatch<React.SetStateAction<string>>;
}
const CoverLetterResumeSelector = ({
  setSelectedResumeId,
  setSetSelectedResumeId,
}: Props) => {
  // session
  const { data: session }: { data: any; status: any } = useSession();

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

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
          "first response: " + response.result,
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

  return (
    <>
      <div className="py-4 border p-4 mb-4 rounded-lg">
        {!resumes ? (
          <p>Loading Resumes ...</p>
        ) : (
          <>
            <h2 className="my-2 text-2xl font-semibold">
              Choose Resume to use
            </h2>
            <ul>
              {resumes &&
                resumes.map((resume: any, i: number) => (
                  <li key={resume.id}>
                    <input
                      id={`resume_${resume.id}`}
                      type="radio"
                      value={resume.id}
                      checked={
                        setSelectedResumeId && setSelectedResumeId === resume.id
                          ? true
                          : false
                      }
                      name="setSelectedResumeId"
                      onChange={(e) => setSetSelectedResumeId(e.target.value)}
                    />{" "}
                    <label htmlFor={`resume_${resume.id}`}>
                      {resume.state.jobPosition +
                        " " +
                        resume.jobTitle +
                        " | " +
                        resume.dateTime}
                    </label>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default CoverLetterResumeSelector;

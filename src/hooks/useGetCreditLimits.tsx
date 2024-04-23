import { useAppContext } from "@/context/AppContext";
import { setCredits, setField } from "@/store/creditLimitsSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCreditLimits = () => {
  // Session
  const { data: session } = useSession();
  const creditLimits = useSelector((state: any) => state.creditLimits);

  const { abortController } = useAppContext();

  // Redux
  const dispatch = useDispatch();
  const getCreditLimitsIfNotExists = async () => {
    const signal = abortController.signal;

    if (!creditLimits.isFetched) {
      try {
        const res = await fetch(`/api/users/CreditLimits`, { signal: signal });
        const response = await res.json();
        dispatch(setCredits(response.result));
        dispatch(setField({ name: "isFetched", value: true }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      getCreditLimitsIfNotExists();
    }
    return () => {
      abortController.abort();
    };
  }, [session?.user?.email]);
  return { getCreditLimitsIfNotExists };
};

export default useGetCreditLimits;

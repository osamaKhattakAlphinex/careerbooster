"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "@/app/(private_route)/dashboard.css";
import { setCredits, setField } from "@/store/creditLimitsSlice";
import { RootState } from "@/store/store";

const CreditLimitsProvider = () => {
    // Session
    const { data: session } = useSession();
    const creditLimits = useSelector((state: RootState) => state.creditLimits);
    // Redux    
    const dispatch = useDispatch();
    // when user is authenticated get userdata if not exists
    const getCreditLimitsIfNotExists = async () => {
        if (!creditLimits.isFetched) {
            try {

                const res = await fetch(
                    `/api/users/CreditLimits`
                );
                const response = await res.json();
                dispatch(setCredits(response.result));
                dispatch(setField({ name: "isFetched", value: true }));

            } catch (err) {
                console.log(err);
            }
        }
    }


    // when page (session) loads, fetch user data if not exists
    useEffect(() => {
        if (session?.user?.email) {
            getCreditLimitsIfNotExists();
        }
    }, [session?.user?.email]);

    return <></>;
};

export default CreditLimitsProvider;

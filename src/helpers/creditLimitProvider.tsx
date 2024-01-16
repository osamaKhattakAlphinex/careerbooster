"use client"
import React, { useEffect, useState } from "react";

const creditLimitProvider = () => {
    const [creditLimits, setCreditLimits] = useState({})

    async function fetchCreditLimits() {
        try {
            const response: any = await fetch("/api/CreditLimits");
            console.log(response);

            //   if (response.data.success) {
            //     const creditLimits = response.data.result;
            //     // Use creditLimits as needed
            //     console.log('Credit Limits:', creditLimits);
            //   } else {
            //     console.error('API Error:', response.data.result);
            //   }
        } catch (error) {
            console.error('Request failed:', error);
        }
    }

    useEffect(() => {
        fetchCreditLimits()
    }, [])
    return creditLimits;
};

export default creditLimitProvider;


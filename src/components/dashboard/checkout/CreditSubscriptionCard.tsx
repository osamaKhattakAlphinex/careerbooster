"use client";
import { CreditsPackageData } from "@/db/schemas/CreditsPackage";
import { crossIcon, infoSmallIcon } from "@/helpers/iconsProvider";
import { setUserData } from "@/store/userDataSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stripe from "stripe";
import { PayPalButton } from "react-paypal-button-v2";

interface Props {
  creditPackage: CreditsPackageData;
  customer: any;
  viewOnly?: boolean;
}
const CreditSubscriptionCard: React.FC<Props> = ({
  creditPackage,
  customer,
  viewOnly,
}) => {
  const [subscribing, setSubscribing] = useState(false);
  const [amountOff, setAmountOff] = useState<number>(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const router = useRouter();
  const paypalRef = useRef<any>(null);
  // Redux

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const [selectedPayment, setSelectedPayment] = useState("paypal");

  const handlePaymentChange = (event: any) => {
    setSelectedPayment(event.target.value);
  };
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);
  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AWc2aK3w3r1Fc8978vQUAJx1vtc6CMzHwcvRpJxZdHu6nGPWfxOwAaEIPlCUv_tR3J620uqNcHqI9IxF";
      script.async = true;
      document.body.appendChild(script);
    };
    addPaypalScript();
  }, []);
  const handlePayment = () => {
    // if (selectedPayment === "stripe") {
    //   handleStripePayment();
    // } else if (selectedPayment === "paypal") {
    //   setShowPaypalPopup(true);
    // }
    setShowPaypalPopup(true);
  };

  const handleClick = async () => {
    // Set subscribing to true

    if (creditPackage && creditPackage.amount === 0) {
      updateUserWithFreePackage(creditPackage._id);
    } else {
      if (coupon !== "") {
        const getCoupon = await fetch(
          `/api/coupons/getOneCoupon?coupon=${coupon}&plan=${creditPackage.category}`
        );
        const data = await getCoupon.json();
        if (data.success) {
          const amount_off = data.result.amount_off;
          setAmountOff(amount_off);
          setShowPaypalPopup(true);
        } else {
          setCouponError(data.result);
        }
      } else {
        setShowPaypalPopup(true);
      }
    }
  };

  useEffect(() => {
    if (paypalRef.current) {
      const getPaypalDiv = paypalRef.current.children[0];
      getPaypalDiv.style.maxHeight = "500px";
      getPaypalDiv.style.overflowY = "scroll";
      getPaypalDiv.style.scrollbarWidth = "none";
    }
  }, [showPaypalPopup, paypalRef.current]);

  const handleStripePayment = async () => {
    // Set subscribing to true
    setShowPaymentDialog(false);
    setSubscribing(true);
    setCouponError("");

    // Load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);
    const body: any = {
      //   interval: userPackage.type === "monthly" ? "month" : "year",
      amount: creditPackage.amount * 100,
      plan: creditPackage.title,
      customer: customer,
      // customerId: customer.id,
    };

    // define the data for monthly subscription without coupon
    const bocouponBody: any = {
      coupon,
    };

    // check if there is coupon entered
    if (coupon !== "") {
      const result = await fetch("/stripe-coupon", {
        method: "post",
        body: JSON.stringify(bocouponBody, null),
        headers: {
          "content-type": "application/json",
        },
      });

      // get the coupon data
      const data = await result.json();
      if (data.message) {
        setCouponError("Invalid or expired coupon");
        setSubscribing(false);
        return;
      } else {
        body.coupon = data.id;
      }
    }

    if (creditPackage && creditPackage.amount === 0) {
      // Free package
      console.log("inside free package");

      updateUserWithFreePackage(creditPackage._id);
    } else if (creditPackage) {
      // paid pacakge checkout to stripe

      // step 3: make a post fetch api call to /checkout-session handler
      const result = await fetch("/checkout-sessions", {
        method: "post",
        body: JSON.stringify(body, null),
        headers: {
          "content-type": "application/json",
        },
      });

      // step 4: get the data and redirect to checkout using the sessionId
      const data = (await result.json()) as Stripe.Checkout.Session;
      const sessionId = data.id!;

      stripe?.redirectToCheckout({ sessionId });
    }
  };

  const updateUserWithFreePackage = async (
    creditPackageId: string | undefined
  ) => {
    console.log("Updating user with free package...");

    if (!subscribing && creditPackageId) {
      const creditPackage = await getCreditPackageDetails(creditPackageId);

      if (creditPackage) {
        const obj = {
          email: userData.email,
          creditPackage: creditPackage._id,
          userCredits: creditPackage.totalCredits,
          totalCredits: creditPackage.totalCredits,
        };
        // TODO!! move this code to backeND

        await axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp: any) => {
            if (resp.data.success) {
              dispatch(
                setUserData({
                  ...userData,
                  creditPackage: obj.creditPackage,
                  userCredits: obj.userCredits,
                  // userPackageExpirationDate: obj.userPackageExpirationDate,
                  // userPackageUsed: obj.userPackageUsed,
                })
              );
              router.push("/dashboard");
            }
            // dispatch(setField({ name: "userPackageData", value: userPackage }));
            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe
          });
      }
    }
  };

  const getCreditPackageDetails = async (creditPackageId: string) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getCreditPackageDetails?id=${creditPackageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const creditPackage = data.result;
      return creditPackage;
      // set user package details to redux
    }

    return null;
  };

  return (
    <>
      <div
        // className={`col-md-6 col-lg-4 ${
        //   userPackage.amount === 0 && data ? "" : ""
        // } `}
        className="flex flex-col "
      >
        <div
          className={`p-6  lg:px-8 w-fit  lg:py-8 rounded-xl h-full border-[1px] dark:border-gray-700 border-gray-500  hover:shadow-xl dark:hover:border-[#e6f85e]   transition-all duration-200 ease-in-out relative hover:border-blue-600 active:border-blue-600 xs:mx-2 md:mx-0`}
        >
          <h1 className=" font-semibold text-[#6a4dff] dark:text-[#e6f85e] mb-0 mt-4 md:!text-3xl xs:text-2xl">
            {creditPackage.title}
          </h1>
          <div className="flex items-center">
            <h3 className="mt-4 mb-4 text-3xl font-normal text-gray-950 dark:text-gray-100">
              ${creditPackage.amount}
            </h3>
            {/* <span className="text-2xl theme-text-2">
              {userPackage.type === "monthly" && "  / Month"}
              {userPackage.type === "yearly" && "  / Year"}
            </span> */}
          </div>
          {couponError && couponError !== "" && (
            <p className="mt-1 text-sm text-red-500">{couponError}</p>
          )}
          {/* Apply coupon  */}
          {!viewOnly && (
            <>
              {creditPackage.amount !== 0 && (
                <div className="mb-6">
                  <input
                    type="text"
                    className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-2 pl-[2rem] text-base  border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                    placeholder="Apply coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
              )}
              {/* invalid coupon error */}

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleClick(); // Call handleAnchorClick function
                }}
                className=" no-underline px-[1rem] font-[500] text-[1rem] py-[.75rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
              >
                {subscribing
                  ? "Please wait..."
                  : creditPackage.amount === 0
                  ? "Select Plan"
                  : "Select Plan"}
              </a>
            </>
          )}

          <ul className="flex flex-col pl-0 mb-0 text-sm md:gap-5 xs:gap-2 md:mt-9 xs:mt-4">
            {creditPackage.features.map((feature: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-1 text-gray-950 dark:text-gray-100"
              >
                {feature}{" "}
                <span className="relative cursor-pointer text-gray-950 dark:text-gray-100 group">
                  {infoSmallIcon}
                  <div
                    role="tooltip"
                    className="absolute hidden w-32 p-2 text-xs text-gray-100 transform -translate-x-1/2 bg-gray-600 rounded-md -top-9 left-16 group-hover:block"
                  >
                    {creditPackage.featuresToolTips[i]}
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showPaypalPopup && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center w-screen h-screen p-3 bg-black/50">
          {/* <div className="z-50 flex flex-col justify-between w-full gap-4 p-6 bg-gray-800 rounded-lg md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-base font-semibold text-center md:text-xl">
              Choose Payment Method
            </h3>

            <div className="flex flex-col gap-4">
              <div
                onClick={() => setSelectedPayment("paypal")}
                className="flex justify-start w-full gap-4 px-4 border rounded-lg cursor-pointer "
              >
                <input
                  id="paypal"
                  value="paypal"
                  type="radio"
                  color="blue"
                  className="cursor-pointer"
                  checked={selectedPayment === "paypal"}
                  onChange={handlePaymentChange}
                />
                <svg
                  viewBox="0 0 780 500 "
                  className="h-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m168.379 169.853c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.215l-21.265 133.483c-.221 1.311.107 2.51.981 3.6.869 1.092 1.962 1.635 3.271 1.635h24.864c4.361 0 6.758-2.068 7.198-6.215l5.888-35.986c.215-1.744.982-3.162 2.291-4.254 1.308-1.09 2.944-1.803 4.907-2.13 1.963-.324 3.814-.487 5.562-.487 1.743 0 3.814.11 6.217.327 2.397.218 3.925.324 4.58.324 18.756 0 33.478-5.285 44.167-15.866 10.684-10.577 16.032-25.243 16.032-44.004 0-12.867-4.202-22.191-12.597-27.974zm-26.99 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.598-19.629 3.598l-10.797.327 5.563-35.007c.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.801 3.924 15.869z"
                    fill="#003087"
                  />
                  <path
                    d="m720.794 161.185h-24.208c-2.405 0-3.821 1.2-4.253 3.6l-21.267 136.099-.328.654c0 1.096.437 2.127 1.311 3.109.868.98 1.963 1.471 3.27 1.471h21.595c4.138 0 6.429-2.068 6.871-6.215l21.265-133.813v-.325c-.001-3.053-1.423-4.58-4.256-4.58z"
                    fill="#009cde"
                  />
                  <path
                    d="m428.31 213.856c0-1.088-.439-2.126-1.306-3.106-.875-.981-1.858-1.474-2.945-1.474h-25.192c-2.404 0-4.366 1.096-5.889 3.271l-34.679 51.04-14.395-49.075c-1.095-3.487-3.492-5.236-7.197-5.236h-24.541c-1.093 0-2.074.492-2.941 1.474-.875.98-1.309 2.019-1.309 3.106 0 .44 2.127 6.871 6.379 19.303 4.252 12.435 8.832 25.849 13.74 40.245 4.908 14.393 7.469 22.031 7.688 22.898-17.886 24.43-26.826 37.517-26.826 39.259 0 2.838 1.416 4.254 4.253 4.254h25.192c2.398 0 4.36-1.088 5.889-3.27l83.427-120.399c.434-.433.652-1.193.652-2.29z"
                    fill="#003087"
                  />
                  <path
                    d="m662.887 209.276h-24.866c-3.055 0-4.904 3.6-5.558 10.798-5.677-8.721-16.031-13.088-31.083-13.088-15.704 0-29.066 5.89-40.077 17.668-11.016 11.778-16.521 25.631-16.521 41.551 0 12.871 3.761 23.121 11.285 30.752 7.525 7.639 17.612 11.451 30.266 11.451 6.323 0 12.757-1.311 19.3-3.926 6.544-2.617 11.665-6.105 15.379-10.469 0 .219-.222 1.199-.655 2.943-.44 1.748-.655 3.059-.655 3.926 0 3.494 1.414 5.234 4.254 5.234h22.576c4.138 0 6.541-2.068 7.194-6.215l13.415-85.39c.215-1.309-.112-2.507-.982-3.599-.875-1.089-1.963-1.636-3.272-1.636zm-42.694 64.453c-5.562 5.453-12.268 8.178-20.12 8.178-6.328 0-11.449-1.742-15.377-5.234-3.927-3.484-5.89-8.283-5.89-14.395 0-8.065 2.726-14.886 8.18-20.447 5.447-5.562 12.214-8.343 20.285-8.343 6.101 0 11.173 1.8 15.212 5.397 4.032 3.6 6.054 8.563 6.054 14.889-.001 7.851-2.783 14.505-8.344 19.955z"
                    fill="#009cde"
                  />
                  <path
                    d="m291.231 209.276h-24.865c-3.058 0-4.908 3.6-5.563 10.798-5.889-8.721-16.25-13.088-31.081-13.088-15.704 0-29.065 5.89-40.078 17.668-11.016 11.778-16.521 25.631-16.521 41.551 0 12.871 3.763 23.121 11.288 30.752 7.525 7.639 17.61 11.451 30.262 11.451 6.104 0 12.433-1.311 18.975-3.926 6.543-2.617 11.778-6.105 15.704-10.469-.875 2.617-1.309 4.908-1.309 6.869 0 3.494 1.417 5.234 4.253 5.234h22.574c4.141 0 6.543-2.068 7.198-6.215l13.413-85.39c.215-1.309-.111-2.507-.981-3.599-.873-1.089-1.963-1.636-3.269-1.636zm-42.696 64.615c-5.563 5.35-12.382 8.016-20.447 8.016-6.329 0-11.4-1.742-15.214-5.234-3.819-3.484-5.726-8.283-5.726-14.395 0-8.065 2.725-14.886 8.18-20.447 5.449-5.562 12.211-8.343 20.284-8.343 6.104 0 11.175 1.8 15.214 5.397 4.032 3.6 6.052 8.563 6.052 14.889 0 8.07-2.781 14.779-8.343 20.117z"
                    fill="#003087"
                  />
                  <path
                    d="m540.036 169.853c-8.398-5.774-19.356-8.668-32.879-8.668h-52.019c-4.365 0-6.765 2.073-7.198 6.215l-21.265 133.483c-.221 1.311.106 2.51.981 3.6.866 1.092 1.962 1.635 3.271 1.635h26.826c2.617 0 4.361-1.416 5.235-4.252l5.89-37.949c.216-1.744.98-3.162 2.29-4.254 1.309-1.09 2.943-1.803 4.908-2.13 1.962-.324 3.813-.487 5.562-.487 1.743 0 3.814.11 6.214.327 2.399.218 3.93.324 4.58.324 18.759 0 33.479-5.285 44.168-15.866 10.687-10.577 16.031-25.243 16.031-44.004.001-12.867-4.2-22.191-12.595-27.974zm-33.534 53.82c-4.799 3.271-11.997 4.906-21.592 4.906l-10.47.327 5.563-35.007c.432-2.397 1.849-3.597 4.252-3.597h5.887c4.797 0 8.614.218 11.454.653 2.831.439 5.561 1.799 8.178 4.089 2.619 2.29 3.926 5.618 3.926 9.979 0 9.162-2.402 15.376-7.198 18.65z"
                    fill="#009cde"
                  />
                </svg>
              </div>
              <div
                onClick={() => setSelectedPayment("stripe")}
                className="flex justify-start w-full gap-4 px-4 border border-gray-400 rounded-lg cursor-pointer "
              >
                <input
                  id="stripe"
                  value="stripe"
                  type="radio"
                  color="blue"
                  className="cursor-pointer"
                  checked={selectedPayment === "stripe"}
                  onChange={handlePaymentChange}
                />
                <div className="flex flex-row h-12 gap-4">
                  <svg
                    viewBox="0 -140 780 780"
                    enable-background="new 0 0 780 500"
                    version="1.1"
                    className="h-12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="780" height="500" fill="#0E4595" />
                    <path
                      d="m293.2 348.73l33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-0.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-0.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882 0.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-0.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555 0.084 68.338 0.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-0.316 0.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41l-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-0.064 84.004-195.39h-56.521"
                      fill="#ffffff"
                    />
                    <path
                      d="m146.92 152.96h-86.041l-0.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527"
                      fill="#F2AE14"
                    />
                  </svg>
                  <svg
                    viewBox="0 -140 780 780"
                    enable-background="new 0 0 780 500"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40,0h700c22.092,0,40,17.909,40,40v420c0,22.092-17.908,40-40,40H40c-22.091,0-40-17.908-40-40V40   C0,17.909,17.909,0,40,0z"
                      fill="#16366F"
                    />
                    <path
                      d="m449.01 250c0 99.143-80.37 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.37 179.51 179.5"
                      fill="#D9222A"
                    />
                    <path
                      d="m510.49 70.496c-46.38 0-88.643 17.596-120.5 46.466-6.49 5.889-12.548 12.237-18.125 18.996h36.266c4.966 6.037 9.536 12.388 13.685 19.013h-63.635c-3.827 6.121-7.28 12.469-10.341 19.008h84.312c2.893 6.185 5.431 12.53 7.6 19.004h-99.512c-2.091 6.235-3.832 12.581-5.217 19.009h109.94c2.689 12.49 4.044 25.231 4.041 38.008 0 19.934-3.254 39.113-9.254 57.02h-99.512c2.164 6.479 4.7 12.825 7.595 19.01h84.317c-3.064 6.54-6.52 12.889-10.347 19.013h-63.625c4.154 6.629 8.73 12.979 13.685 18.996h36.258c-5.57 6.772-11.63 13.126-18.13 19.012 31.86 28.867 74.118 46.454 120.5 46.454 99.138-1e-3 179.51-80.362 179.51-179.5 0-99.13-80.37-179.5-179.51-179.5"
                      fill="#EE9F2D"
                    />
                    <path d="m666.08 350.06c0-3.201 2.592-5.801 5.796-5.801s5.796 2.6 5.796 5.801c0 3.199-2.592 5.799-5.796 5.799-3.202-1e-3 -5.797-2.598-5.796-5.799zm5.796 4.408c2.435-1e-3 4.407-1.975 4.408-4.408 0-2.433-1.972-4.404-4.404-4.404h-4e-3c-2.429-4e-3 -4.4 1.963-4.404 4.392v0.013c-3e-3 2.432 1.967 4.406 4.399 4.408 1e-3 -1e-3 3e-3 -1e-3 5e-3 -1e-3zm-0.783-1.86h-1.188v-5.094h2.149c0.45 0 0.908 0 1.305 0.254 0.413 0.278 0.646 0.77 0.646 1.278 0 0.57-0.337 1.104-0.883 1.312l0.937 2.25h-1.315l-0.78-2.016h-0.87v2.016h-1e-3zm0-2.89h0.658c0.246 0 0.504 0.02 0.725-0.1 0.196-0.125 0.296-0.359 0.296-0.584 0-0.195-0.12-0.42-0.288-0.516-0.207-0.131-0.536-0.101-0.758-0.101h-0.633v1.301zm-443.5-80.063c-2.045-0.237-2.945-0.301-4.35-0.301-11.045 0-16.637 3.789-16.637 11.268 0 4.611 2.73 7.546 6.987 7.546 7.938 0 13.659-7.56 14-18.513zm14.171 32.996h-16.146l0.371-7.676c-4.925 6.067-11.496 8.95-20.425 8.95-10.562 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.54 34.217-28.54 2.208 0 5.041 0.2 7.941 0.569 0.605-2.441 0.763-3.486 0.763-4.8 0-4.908-3.396-6.738-12.5-6.738-9.533-0.108-17.396 2.271-20.625 3.334 0.204-1.23 2.7-16.658 2.7-16.658 9.712-2.846 16.117-3.917 23.325-3.917 16.733 0 25.596 7.512 25.58 21.712 0.032 3.805-0.597 8.5-1.58 14.671-1.692 10.731-5.32 33.718-5.817 39.322zm-62.158 0h-19.488l11.163-69.997-24.925 69.997h-13.28l-1.64-69.597-11.734 69.597h-18.242l15.238-91.054h28.02l1.7 50.966 17.092-50.966h31.167l-15.071 91.054m354.98-32.996c-2.037-0.237-2.942-0.301-4.342-0.301-11.041 0-16.634 3.789-16.634 11.268 0 4.611 2.726 7.546 6.983 7.546 7.939 0 13.664-7.56 13.993-18.513zm14.183 32.996h-16.145l0.365-7.676c-4.925 6.067-11.5 8.95-20.42 8.95-10.566 0-17.8-8.25-17.8-20.229 0-18.024 12.587-28.54 34.212-28.54 2.208 0 5.037 0.2 7.934 0.569 0.604-2.441 0.763-3.486 0.763-4.8 0-4.908-3.392-6.738-12.496-6.738-9.533-0.108-17.388 2.271-20.63 3.334 0.205-1.23 2.709-16.658 2.709-16.658 9.713-2.846 16.113-3.917 23.312-3.917 16.741 0 25.604 7.512 25.588 21.712 0.032 3.805-0.597 8.5-1.58 14.671-1.682 10.731-5.32 33.718-5.812 39.322zm-220.39-1.125c-5.334 1.68-9.492 2.399-14 2.399-9.963 0-15.4-5.725-15.4-16.267-0.142-3.27 1.433-11.879 2.67-19.737 1.125-6.917 8.45-50.53 8.45-50.53h19.371l-2.262 11.209h11.7l-2.643 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.817 2.037 5.483 6.67 5.483 2.221 0 3.941-0.226 5.255-0.7l-2.578 16.397m59.391-0.6c-6.654 2.033-13.075 3.017-19.879 3-21.683-0.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.9-43.947 15.97 0 26.17 10.433 26.17 26.796 0 5.429-0.7 10.729-2.387 18.212h-38.575c-1.304 10.742 5.57 15.217 16.837 15.217 6.935 0 13.188-1.43 20.142-4.663l-3.221 18.417zm-10.887-43.9c0.107-1.543 2.054-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217h21.393zm-123.42-5.017c0 9.367 4.541 15.825 14.841 20.676 7.892 3.709 9.113 4.809 9.113 8.17 0 4.617-3.48 6.7-11.192 6.7-5.812 0-11.22-0.907-17.458-2.92 0 0-2.563 16.32-2.68 17.101 4.43 0.966 8.38 1.861 20.28 2.19 20.562 0 30.058-7.829 30.058-24.75 0-10.175-3.975-16.146-13.737-20.633-8.171-3.75-9.109-4.588-9.109-8.046 0-4.004 3.238-6.046 9.538-6.046 3.825 0 9.05 0.408 14 1.113l2.775-17.175c-5.046-0.8-12.696-1.442-17.15-1.442-21.8 0-29.346 11.387-29.279 25.062m229.09-23.116c5.413 0 10.459 1.42 17.413 4.92l3.187-19.762c-2.854-1.12-12.904-7.7-21.416-7.7-13.042 0-24.066 6.47-31.82 17.15-11.31-3.746-15.959 3.825-21.659 11.367l-5.062 1.179c0.383-2.483 0.73-4.95 0.613-7.446h-17.896c-2.445 22.917-6.779 46.13-10.171 69.075l-0.884 4.976h19.496c3.254-21.143 5.038-34.681 6.121-43.842l7.342-4.084c1.096-4.08 4.529-5.458 11.416-5.292-0.926 5.008-1.389 10.09-1.383 15.184 0 24.225 13.071 39.308 34.05 39.308 5.404 0 10.042-0.712 17.221-2.657l3.431-20.76c-6.46 3.18-11.761 4.676-16.561 4.676-11.328 0-18.183-8.362-18.183-22.184-1e-3 -20.05 10.195-34.108 24.745-34.108" />
                    <path
                      d="m185.21 297.24h-19.491l11.17-69.988-24.925 69.988h-13.282l-1.642-69.588-11.733 69.588h-18.243l15.238-91.042h28.02l0.788 56.362 18.904-56.362h30.267l-15.071 91.042"
                      fill="#ffffff"
                    />
                    <path d="m647.52 211.6l-4.319 26.308c-5.33-7.012-11.054-12.087-18.612-12.087-9.834 0-18.784 7.454-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-4e-3 0.067c0.658-6.133 0.92-9.875 0.862-11.146h-17.9c-2.437 22.917-6.77 46.13-10.157 69.075l-0.893 4.976h19.492c2.633-17.097 4.65-31.293 6.133-42.551 6.659-6.017 9.992-11.267 16.721-10.917-2.979 7.206-4.725 15.504-4.725 24.017 0 18.513 9.367 30.725 23.534 30.725 7.141 0 12.62-2.462 17.966-8.17l-0.912 6.884h18.433l14.842-91.043h-19.222zm-24.37 73.942c-6.634 0-9.983-4.909-9.983-14.597 0-14.553 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.508 1e-3 14.681-6.369 24.964-15.449 24.964z" />
                    <path
                      d="m233.19 264.26c-2.042-0.236-2.946-0.3-4.346-0.3-11.046 0-16.634 3.788-16.634 11.267 0 4.604 2.73 7.547 6.98 7.547 7.945-1e-3 13.666-7.559 14-18.514zm14.179 32.984h-16.146l0.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.804-8.25-17.804-20.229 0-18.032 12.591-28.542 34.216-28.542 2.209 0 5.042 0.2 7.938 0.571 0.604-2.442 0.762-3.487 0.762-4.808 0-4.908-3.391-6.73-12.496-6.73-9.537-0.108-17.395 2.272-20.629 3.322 0.204-1.226 2.7-16.638 2.7-16.638 9.709-2.858 16.121-3.93 23.321-3.93 16.738 0 25.604 7.518 25.588 21.705 0.029 3.82-0.605 8.512-1.584 14.675-1.687 10.725-5.32 33.725-5.812 39.317zm261.38-88.592l-3.192 19.767c-6.95-3.496-12-4.921-17.407-4.921-14.551 0-24.75 14.058-24.75 34.107 0 13.821 6.857 22.181 18.183 22.181 4.8 0 10.096-1.492 16.554-4.677l-3.42 20.75c-7.184 1.959-11.816 2.672-17.226 2.672-20.976 0-34.05-15.084-34.05-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507 1e-3 18.562 3.609 21.42 4.73m31.442 55.608c-2.041-0.236-2.941-0.3-4.346-0.3-11.042 0-16.634 3.788-16.634 11.267 0 4.604 2.729 7.547 6.984 7.547 7.937-1e-3 13.662-7.559 13.996-18.514zm14.179 32.984h-16.15l0.37-7.663c-4.924 6.054-11.5 8.95-20.42 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.595-28.542 34.212-28.542 2.213 0 5.042 0.2 7.941 0.571 0.601-2.442 0.763-3.487 0.763-4.808 0-4.908-3.392-6.73-12.496-6.73-9.533-0.108-17.396 2.272-20.629 3.322 0.204-1.226 2.704-16.638 2.704-16.638 9.709-2.858 16.116-3.93 23.316-3.93 16.742 0 25.604 7.518 25.583 21.705 0.034 3.82-0.595 8.512-1.579 14.675-1.682 10.725-5.324 33.725-5.811 39.317zm-220.39-1.122c-5.338 1.68-9.496 2.409-14 2.409-9.963 0-15.4-5.726-15.4-16.266-0.138-3.281 1.437-11.881 2.675-19.738 1.12-6.926 8.446-50.533 8.446-50.533h19.367l-2.259 11.212h9.942l-2.646 17.788h-9.975c-2.25 14.091-5.463 31.619-5.496 33.949 0 3.83 2.042 5.483 6.671 5.483 2.22 0 3.938-0.217 5.254-0.692l-2.579 16.388m59.392-0.591c-6.65 2.033-13.08 3.013-19.88 3-21.684-0.021-32.987-11.346-32.987-33.033 0-25.321 14.38-43.95 33.9-43.95 15.97 0 26.17 10.429 26.17 26.8 0 5.433-0.7 10.733-2.382 18.212h-38.575c-1.306 10.741 5.569 15.221 16.837 15.221 6.93 0 13.188-1.434 20.137-4.676l-3.22 18.426zm-10.892-43.912c0.117-1.538 2.059-13.217-9.013-13.217-6.166 0-10.579 4.717-12.375 13.217h21.388zm-123.42-5.004c0 9.365 4.542 15.816 14.842 20.675 7.891 3.708 9.112 4.812 9.112 8.17 0 4.617-3.483 6.7-11.187 6.7-5.817 0-11.225-0.908-17.467-2.92 0 0-2.554 16.32-2.67 17.1 4.42 0.967 8.374 1.85 20.274 2.191 20.567 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.738-20.637-8.167-3.758-9.112-4.583-9.112-8.046 0-4 3.245-6.058 9.541-6.058 3.821 0 9.046 0.42 14.004 1.125l2.771-17.18c-5.041-0.8-12.691-1.441-17.146-1.441-21.804 0-29.345 11.379-29.283 25.067m398.45 50.629h-18.437l0.917-6.893c-5.347 5.717-10.825 8.18-17.967 8.18-14.168 0-23.53-12.213-23.53-30.725 0-24.63 14.521-45.393 31.709-45.393 7.558 0 13.28 3.088 18.604 10.096l4.325-26.308h19.221l-14.842 91.043zm-28.745-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.63-14.509-10.325-14.509-8.838 0-15.116 10.317-15.116 24.875-1e-3 9.686 3.357 14.587 9.991 14.587zm-56.843-56.929c-2.439 22.917-6.773 46.13-10.162 69.063l-0.891 4.975h19.491c6.971-45.275 8.658-54.117 19.588-53.009 1.742-9.266 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675 0.471-3.787 1.334-7.466 1.163-11.225h-17.9m-160.42 0c-2.446 22.917-6.78 46.13-10.167 69.063l-0.887 4.975h19.5c6.962-45.275 8.646-54.117 19.569-53.009 1.75-9.266 4.992-17.383 7.4-21.479-8.154-1.7-12.716 2.913-18.678 11.675 0.47-3.787 1.325-7.466 1.162-11.225h-17.899m254.57 68.242c0-3.214 2.596-5.8 5.796-5.8 3.197-3e-3 5.792 2.587 5.795 5.785v0.015c-1e-3 3.2-2.595 5.794-5.795 5.796-3.2-2e-3 -5.794-2.596-5.796-5.796zm5.796 4.404c2.432 1e-3 4.403-1.97 4.403-4.401v-2e-3c3e-3 -2.433-1.968-4.406-4.399-4.408h-4e-3c-2.435 1e-3 -4.408 1.974-4.409 4.408 3e-3 2.432 1.976 4.403 4.409 4.403zm-0.784-1.87h-1.188v-5.084h2.154c0.446 0 0.908 8e-3 1.296 0.254 0.416 0.283 0.654 0.767 0.654 1.274 0 0.575-0.338 1.113-0.888 1.317l0.941 2.236h-1.319l-0.78-2.008h-0.87v2.008 3e-3zm0-2.88h0.654c0.245 0 0.513 0.018 0.729-0.1 0.195-0.125 0.295-0.361 0.295-0.587-9e-3 -0.21-0.115-0.404-0.287-0.524-0.204-0.117-0.542-0.085-0.763-0.085h-0.629v1.296h1e-3z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                disabled={selectedPayment === ""}
                onClick={handlePayment}
                className={`${
                  selectedPayment === "" && "opacity-50"
                } p-2 w-1/4 text-sm text-white bg-blue-600 rounded`}
              >
                Select
              </button>
              <button
                className="w-1/4 p-2 text-sm text-white bg-red-600 rounded"
                onClick={() => {
                  setShowPaymentDialog(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div> */}
          {showPaypalPopup && (
            <div className="absolute z-[100] bg-gray-900 px-1 py-10 md:px-10 w-full md:w-1/2 lg:w-1/3 rounded-lg">
              <span
                className="absolute cursor-pointer right-2 top-2"
                onClick={() => setShowPaypalPopup(false)}
              >
                {crossIcon}
              </span>
              <div ref={paypalRef} className="p-10 bg-white rounded-lg">
                <PayPalButton
                  amount={creditPackage.amount - amountOff}
                  shippingPreference="NO_SHIPPING"
                  currency="USD"
                  onSuccess={(details: any, data: any) => {
                    if (data?.orderID) {
                      router.push(
                        `/subscribed?type=paypal&firstname=${userData.firstName}&lastname=${userData.lastName}&email=${userData.email}&pkgId=${creditPackage._id}`
                      );
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreditSubscriptionCard;

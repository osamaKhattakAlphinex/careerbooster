"use client";
import { CreditsPackageData } from "@/db/schemas/CreditsPackage";
import { infoSmallIcon } from "@/helpers/iconsProvider";
import { setUserData } from "@/store/userDataSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stripe from "stripe";

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
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [data, setData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false);
  const router = useRouter();
  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const handleClick = async () => {
    // Set subscribing to true
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

  // useEffect(() => {
  //   setMsgLoading(true);
  //   fetch(`/api/packages/package-status?email=${userData?.email}`)
  //     .then(async (response) => {
  //       const data = await response.json();
  //       console.log("data", data);
  //       if (data.success) {
  //         setData(data.result);
  //         setMsgLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error occurred", err);
  //       setMsgLoading(false);
  //     });
  // }, []);

  return (
    !msgLoading && (
      <div
        // className={`col-md-6 col-lg-4 ${
        //   userPackage.amount === 0 && data ? "" : ""
        // } `}
        className="flex flex-col lg:w-4/12 md:w-6/12  xs:w-full   "
      >
        <div
          className={`p-6  lg:px-8 lg:py-8 rounded-2xl h-full border-[1px] hover:bg-gray-50 hover:shadow-2xl dark:hover:border-[#e6f85e] dark:hover:bg-black  transition-all duration-200 ease-in-out relative hover:border-blue-600 active:border-blue-600 xs:mx-2 md:mx-0`}
        >
          <h1 className=" font-semibold text-[#6a4dff] dark:text-[#e6f85e] mb-0 mt-4 md:!text-3xl xs:text-2xl">
            {creditPackage.title}
          </h1>
          <div className="flex items-center">
            <h3 className="text-gray-950 dark:text-gray-100 font-normal mt-4 mb-4 text-3xl">
              ${creditPackage.amount}
            </h3>
            {/* <span className="text-2xl theme-text-2">
              {userPackage.type === "monthly" && "  / Month"}
              {userPackage.type === "yearly" && "  / Year"}
            </span> */}
          </div>

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
              {couponError && couponError !== "" && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}

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

          <ul className="flex flex-col md:gap-5 xs:gap-2 text-sm pl-0 md:mt-9 xs:mt-0 mb-0">
            {creditPackage.features.map((feature: string, i: number) => (
              <li
                key={i}
                className="flex gap-1 items-center text-gray-950 dark:text-gray-100"
              >
                {feature}{" "}
                <span className="cursor-pointer text-gray-950 dark:text-gray-100 relative group">
                  {infoSmallIcon}
                  <div
                    role="tooltip"
                    className="hidden absolute bg-gray-600 text-gray-100 p-2 rounded-md text-xs -top-9 left-16 transform -translate-x-1/2 w-32 group-hover:block"
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
    )
  );
};

export default CreditSubscriptionCard;

"use client";

import { CheckoutSubscriptionBody } from "@/app/(public_route)/checkout-sessions/route";
import { UserPackageData } from "@/db/schemas/UserPackage";
import { setField, setUserData } from "@/store/userDataSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import { CouponBody } from "@/app/(public_route)/stripe-coupon/route";
import { infoSmallIcon } from "@/helpers/iconsProvider";

interface Props {
  userPackage: UserPackageData;
  customer: any;
  viewOnly?: boolean;
}

const MonthlySubscriptionCard: React.FC<Props> = ({
  userPackage,
  customer,
  viewOnly,
}) => {
  const [subscribing, setSubscribing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [data, setData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log(userPackage);
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
    const body: CheckoutSubscriptionBody = {
      interval: userPackage.type === "monthly" ? "month" : "year",
      amount: userPackage.amount * 100,
      plan: userPackage.title,
      limit: userPackage.limit,
      customer: customer,
      // customerId: customer.id,
    };

    // define the data for monthly subscription without coupon
    const bocouponBody: CouponBody = {
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

    if (userPackage && userPackage.amount === 0) {
      // Fee package
      updateUserWithFreePackage(userPackage._id);
    } else if (userPackage) {
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

  const updateUserWithFreePackage = async (packageId: string | undefined) => {
    console.log("Updating user with free package...");
    if (!subscribing && packageId) {
      const userPackage = await getUserPackageDetails(packageId);
      if (userPackage) {
        let expirationDate;
        if (userPackage.type === "monthly") {
          expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        } else if (userPackage.type === "yearly") {
          expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        }

        const obj = {
          email: userData.email,
          userPackage: userPackage._id,
          userPackageExpirationDate: expirationDate,
          userPackageUsed: {
            resumes_generation: 0,
            keywords_generation: 0,
            headline_generation: 0,
            about_generation: 0,
            job_desc_generation: 0,
            cover_letter_generation: 0,
            email_generation: 0,
            pdf_files_upload: 0,
            review_resume: 0,
            consulting_bids_generation: 0,
          },
        };
        // TODO!! move this code to backeND
        return axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp: any) => {
            dispatch(
              setUserData({
                ...userData,
                userPackage: obj.userPackage,
                userPackageExpirationDate: obj.userPackageExpirationDate,
                userPackageUsed: obj.userPackageUsed,
              })
            );
            dispatch(setField({ name: "userPackageData", value: userPackage }));
            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe

            router.push("/dashboard");
          });
      }
    }
  };

  const getUserPackageDetails = async (packageId: string) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getUserPackageDetails?id=${packageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const userPackage = data.result;
      return userPackage;
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
        className="col-md-6 col-lg-4"
        data-aos="fade-up-sm"
        data-aos-delay="50"
      >
        <div
          className={`p-6 pricing-card px-lg-8 py-lg-8 rounded-4 h-full bg- `}
        >
          <h1 className="display-3 fw-semibold theme-text mb-0 mt-4 !text-4xl">
            {userPackage.title}
          </h1>
          <div className="price flex align-center">
            <h3 className="theme-text-2 fw-medium mb-0">
              ${userPackage.amount}
            </h3>
            <span className="text-2xl theme-text-2">
              {userPackage.type === "monthly" && "  / Month"}
              {userPackage.type === "yearly" && "  / Year"}
            </span>
          </div>

          {/* Apply coupon  */}
          {!viewOnly && (
            <>
              <div className="mt-4 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apply coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
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
                className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9"
              >
                {subscribing
                  ? "Please wait..."
                  : userPackage.amount === 0
                  ? "Select Plan"
                  : "Select Plan"}
              </a>
            </>
          )}

          <ul className="d-flex flex-column gap-5 text-sm pl-0 mt-9 mb-0">
            {userPackage.features.map((feature: string, i: number) => (
              <li key={i} className="flex gap-1 items-center">
                {feature}{" "}
                <span className="cursor-pointer text-gray-600 relative group">
                  {infoSmallIcon}
                  <div
                    role="tooltip"
                    className="hidden absolute bg-gray-600 text-gray-100 p-2 rounded-md text-xs -top-9 left-16 transform -translate-x-1/2 w-32 group-hover:block"
                  >
                    {userPackage.featuresToolTips[i]}
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
export default MonthlySubscriptionCard;

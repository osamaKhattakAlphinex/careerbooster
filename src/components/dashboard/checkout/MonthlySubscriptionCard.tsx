"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { UserPackageData } from "@/db/schemas/UserPackage";
import { setField, setUserData } from "@/store/userDataSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stripe from "stripe";
import { useRouter } from "next/navigation";

interface Props {
  userPackage: UserPackageData;
  customer: any;
}

const MonthlySubscriptionCard: React.FC<Props> = ({
  userPackage,
  customer,
}) => {
  const [subscribing, setSubscribing] = useState(false);
  const router = useRouter();

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const handleClick = async () => {
    setSubscribing(true);
    if (userPackage && userPackage.amount === 0) {
      // Fee package
      updateUserWithFreePackage(userPackage._id);
    } else if (userPackage) {
      // step 1: load stripe
      const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
      const stripe = await loadStripe(STRIPE_PK);

      // step 2: define the data for monthly subscription
      const body: CheckoutSubscriptionBody = {
        interval: userPackage.type === "monthly" ? "month" : "year",
        amount: userPackage.amount * 100,
        plan: userPackage.title,
        limit: userPackage.limit,
        customer: customer,
        // customerId: customer.id,
      };

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
      const { userPackage } = data;
      return userPackage;
      // set user package details to redux
    }

    return null;
  };

  return (
    <div
      className="col-md-6 col-lg-4"
      data-aos="fade-up-sm"
      data-aos-delay="50"
    >
      <div className="pricing-card p-6 px-lg-10 py-lg-8 rounded-4 h-full bg-">
        <h3 className="text-primary-dark fw-medium mb-0">
          {userPackage.title}
        </h3>
        <h1 className="display-3 fw-semibold text-white mb-0 mt-4 !text-6xl">
          {userPackage.amount}
          <span className="text-xl">
            {userPackage.type === "monthly" && " / month"}
            {userPackage.type === "yearly" && " / year"}
          </span>
        </h1>
        {/* <!-- <p className="text-white lead fw-normal mt-4 mb-0">
                    A 10X faster way to writing your professional copy
                  </p> --> */}
        <button
          onClick={() => handleClick()}
          disabled={subscribing}
          className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9 btn-dark-blue-3"
        >
          {subscribing
            ? "Please wait..."
            : userPackage.amount === 0
            ? "No Credit Card Required"
            : "Subscribe"}
        </button>
        <ul className="pricing-list d-flex flex-column gap-5 fs-lg mt-9 mb-0">
          {userPackage.features.map((feature: string, i: number) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <ul className="pricing-list d-flex flex-column gap-3 fs-lg mt-9 mb-0">
          <hr />
          <li>
            <strong>Limitation</strong>
          </li>
          <li>Generate {userPackage?.limit?.resumes_generation} resumes</li>
          {userPackage?.limit?.can_edit_resume && <li>Edit Resume</li>}
          <li>
            Generate {userPackage?.limit?.consulting_bids_generation} consulting
            bids
          </li>
          <li>
            Generate {userPackage?.limit?.cover_letter_generation} Cover Letter
          </li>
          <li>Generate {userPackage?.limit?.email_generation} Emails</li>
          <li>
            write {userPackage?.limit?.headline_generation} Headlines for
            LinkedIn
          </li>
          <li>
            write {userPackage?.limit?.job_desc_generation} Job Description for
            LinkedIn
          </li>
          <li>
            write {userPackage?.limit?.about_generation} About Description for
            LinkedIn
          </li>
          <li>
            write {userPackage?.limit?.keywords_generation} Keywords for
            LinkedIn
          </li>
          <li>Upload {userPackage?.limit?.pdf_files_upload} Files / Resumes</li>
          <li>Review {userPackage?.limit?.review_resume} Resumes by AI</li>
        </ul>
      </div>
    </div>
  );

  // render a simple card
  //   return (
  //     <div className="border border-gray-100 rounded-md p-8 flex flex-col gap-2 items-start">
  //       <h2 className="text-xl font-bold text-gray-700">Monthly Subscription</h2>
  //       <p className="text-gray-400">$20 per month</p>
  //       <button
  //         onClick={() => handleClick()}
  //         className="border border-violet-200 text-violet-500 rounded-md px-4 py-2 w-full hover:bg-violet-500 hover:text-violet-200 transition-colors"
  //       >
  //         Subscribe
  //       </button>
  //     </div>
  //   );
};
export default MonthlySubscriptionCard;

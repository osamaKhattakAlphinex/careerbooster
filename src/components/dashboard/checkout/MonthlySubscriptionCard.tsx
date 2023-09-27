"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { UserPackageData } from "@/db/schemas/UserPackage";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

interface Props {
  userPackage: UserPackageData;
  customer: any;
}

const MonthlySubscriptionCard: React.FC<Props> = ({
  userPackage,
  customer,
}) => {
  const handleClick = async () => {
    if (userPackage) {
      // step 1: load stripe
      const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
      const stripe = await loadStripe(STRIPE_PK);

      // step 2: define the data for monthly subscription
      const body: CheckoutSubscriptionBody = {
        interval: userPackage.type === "monthly" ? "month" : "year",
        amount: userPackage.amount * 100,
        plan: userPackage.title,
        limit: userPackage.limit,
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
          className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9 btn-dark-blue-3"
        >
          {userPackage.amount === 0 ? "No Credit Card Required" : "Subscribe"}
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

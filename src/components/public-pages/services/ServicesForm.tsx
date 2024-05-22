"use client";
import { crossIcon } from "@/helpers/iconsProvider";
import React, { useEffect, useRef, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useFormik } from "formik";
import * as Yup from "yup";

type Service = {
  id: string;
  label: string;
  amount: number;
};
interface InitialValues {
  coupan: string;
  fullname: string;
  email: string;
  phone: string;
  services: Service[];
}

const SERVICES: Service[] = [
  {
    id: "linkedin-optimization",
    label: "Linkedin Optimization",
    amount: 494,
  },
  // {
  //   id: "resume-generation",
  //   label: "Resume Generation",
  //   amount: 200,
  // },
];

const ServicesForm = () => {
  const [applyingCoupon, setApplyingCoupon] = useState<boolean>(false);
  const [coupanText, setCoupanText] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [amountOff, setAmountOff] = useState<number>(0);
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);

  const formik = useFormik<InitialValues>({
    initialValues: {
      coupan: "",
      fullname: "",
      email: "",
      phone: "",
      services: [],
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      setShowPaypalPopup(true);
    },
  });
  const salesEntry = async () => {
    const salesEntry = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formik.values.email,
        phone: formik.values.phone,
        fullname: formik.values.fullname,
        amount: amount - amountOff,
        status: "pending",
        service: formik.values.services,
      }),
    });
    const response = await salesEntry.json();
    if (response.success) {
      formik.resetForm();
      setShowPaypalPopup(false);
      showSuccessToast("Order Added Successfully");
    } else {
      showErrorToast(response.error);
    }
  };

  const paypalRef = useRef<any>(null);
  const applyCoupon = async () => {
    if (formik.values.coupan !== "") {
      setApplyingCoupon(true);
      const getCoupon = await fetch(
        `/api/coupons/getOneCoupon?coupon=${formik.values.coupan}&type=services`
      );
      const data = await getCoupon.json();
      if (data.success) {
        formik.setFieldValue("coupan", "");
        const amount_off = data.result.amount_off;
        setAmountOff(amount_off);
        setApplyingCoupon(false);
        setCoupanText("");
      } else {
        setApplyingCoupon(false);
        setCoupanText("Invalid Coupon");
      }
    }
  };

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

  useEffect(() => {
    if (paypalRef.current) {
      const getPaypalDiv = paypalRef.current.children[0];
      getPaypalDiv.style.maxHeight = "500px";
      getPaypalDiv.style.overflowY = "scroll";
      getPaypalDiv.style.scrollbarWidth = "none";
    }
  }, [showPaypalPopup, paypalRef.current]);

  return (
    <div className="px-4 py-8 bg-gray-900 md:p-24 ">
      <div className="w-full mx-auto md:w-3/4 ">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-center md:text-4xl">
            Here&apos;s a Recap of Everything You Get When You Sign Up for Our
            Services Today...
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center ">
              <span className="block text-base font-semibold md:text-lg md:inline">
                LinkedIn Keyword Optimization:
              </span>
              Elevate your profile&apos;s visibility and appeal.
              <span className="block text-lg text-blue-300 md:text-xl md:inline">
                &nbsp; (Valued at $2000)
              </span>
            </p>
            {/* <p className="text-center ">
              <span className="block text-base font-semibold md:text-lg md:inline">
                Resume Generation:
              </span>{" "}
              Elevate your profile&apos;s visibility and appeal replace it for
              resume generation.
              <span className="block text-lg text-blue-300 md:text-xl md:inline">
                &nbsp; (Valued at $2000)
              </span>
            </p> */}
            <p className="text-center ">
              <span className="block text-base font-semibold md:text-lg md:inline">
                Bonus #1:
              </span>{" "}
              Receive a complimentary, full-scale rewrite and makeover of your
              LinkedIn profile.
              <span className="block text-lg text-blue-300 md:text-xl md:inline">
                &nbsp;(Valued at $1000)
              </span>
            </p>
            <p className="text-center ">
              <span className="block text-base font-semibold md:text-lg md:inline">
                Bonus #2:
              </span>{" "}
              Make an unforgettable first impression with a custom LinkedIn
              cover design.
              <span className="block text-lg text-blue-300 md:text-xl md:inline">
                &nbsp; (Valued at $100)
              </span>
            </p>
            {/* <p className="text-center ">
              <span className="block text-base font-semibold md:text-lg md:inline">
                Bonus #3:
              </span>{" "}
              Make an unforgettable first impression with a custom LinkedIn
              cover design.
              <span className="block text-lg text-blue-300 md:text-xl md:inline">
                &nbsp; (Valued at $100)
              </span>
            </p> */}
          </div>
          <div className="self-center ">
            <span className="text-xl font-bold text-center md:text-4xl">
              Total Package Value: $3100
            </span>
          </div>
          <div className="self-center text-center">
            <span className="text-lg text-center text-blue-300 md:text-2xl">
              Special Limited-Time Offer: Unlock all these benefits for just
              $494!
            </span>
            <p className="pt-2 text-center">
              <span className="text-3xl text-blue-300 line-through md:text-5xl ">
                $3100
              </span>
              <span className="text-3xl md:text-5xl"> $494</span>
            </p>
            <p className="w-full pt-2 text-base text-center md:text-2xl">
              Hurry, Offer Ends Soon!
            </p>
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-base md:text-xl">
            Enter Your Details Below to Complete Your Order.
          </span>
        </div>
        <form className="space-y-5 serviceForm" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullname"
              className="text-base font-semibold md:text-lg"
            >
              Fullname
            </label>
            <input
              type="text"
              value={formik.values.fullname}
              id="fullname"
              onChange={formik.handleChange}
              className="p-2 bg-transparent border border-gray-400 rounded-md"
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="text-red-700">{formik.errors.fullname}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-base font-semibold md:text-lg"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="p-2 bg-transparent border border-gray-400 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-700">{formik.errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-base font-semibold md:text-lg"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="p-2 bg-transparent border border-gray-400 rounded-md"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-700">{formik.errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold ">Services</span>
            {SERVICES.map((service) => (
              <div
                className="flex flex-row items-center justify-between gap-2 "
                key={service.id}
              >
                <div className="flex flex-row justify-start gap-2 ">
                  <input
                    checked={formik.values.services.includes(service)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      if (checked) {
                        formik.setFieldValue("services", [
                          ...formik.values.services,
                          service,
                        ]);
                        setAmount(amount + service.amount);
                      } else {
                        formik.setFieldValue(
                          "services",
                          formik.values.services.filter(
                            (s: any) => s.id !== service.id
                          )
                        );
                        setAmount(amount - service.amount);
                      }
                    }}
                    type="checkbox"
                    id={service.id}
                    className="bg-transparent"
                  />
                  <label htmlFor={service.id} className="space-x-2">
                    {service.label}
                  </label>
                </div>
                <span>$ {service.amount}</span>
              </div>
            ))}
          </div>

          {formik.values.services && formik.values.services.length > 0 && (
            <>
              {/* coupan */}

              <div className="flex gap-2">
                <input
                  type="text"
                  id="coupan"
                  value={formik.values.coupan}
                  placeholder="Enter Coupon Code"
                  onChange={formik.handleChange}
                  className="p-2 bg-transparent border border-gray-400 rounded-md"
                />
                <button
                  className="self-center rounded-md bg-gray-950 py-2 px-4  font-semibold text-center text-gray-200 "
                  disabled={formik.values.coupan === ""}
                  onClick={(e) => {
                    e.preventDefault();
                    applyCoupon();
                  }}
                >
                  {!applyingCoupon ? "Apply" : "Applying..."}
                </button>
              </div>
              {coupanText !== "" && (
                <p className="text-red-700">{coupanText}</p>
              )}
              <div className="w-full p-6 rounded-sm shadow-md bg-slate-700">
                <span className="block w-full pb-2 text-base font-semibold text-center uppercase md:text-lg">
                  Order Details
                </span>
                <div className="mt-2 border-t-[1.5px]">
                  <div className="divide-gray-400 divide-y-[1.5px] py-2">
                    {formik.values.services.map((service: any) => (
                      <div
                        className="flex flex-row items-center justify-between gap-2 "
                        key={service.id}
                      >
                        <div className="flex flex-row items-center justify-between w-full gap-2 text-sm capitalize">
                          <h2 className="text-sm md:text-base">
                            {service.label}
                          </h2>
                          <span className="text-sm md:text-base">
                            $ {service.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t-[1.5px] py-2">
                  <div className="flex flex-row items-center justify-between gap-2 ">
                    <div className="flex flex-row justify-end w-full gap-2">
                      <h2 className="text-sm font-bold md:text-base ">Total</h2>
                      {amountOff > 0 ? (
                        <span className="text-sm md:text-base">
                          <span className="text-blue-300 line-through">
                            ${amount}
                          </span>{" "}
                          ${amount - amountOff}
                        </span>
                      ) : (
                        <span>${amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center ">
                <div className="flex flex-row items-center justify-center w-full rounded-md md:w-32 bg-gray-950">
                  <button
                    type="submit"
                    name="Submit"
                    className="self-center w-full p-2 font-semibold text-center text-gray-200 uppercase "
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
        {showPaypalPopup && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center w-screen h-screen p-3 bg-black/50">
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
                    amount={amount - amountOff}
                    shippingPreference="NO_SHIPPING"
                    currency="USD"
                    onSuccess={(details: any, data: any) => {
                      if (data?.orderID) {
                        salesEntry();
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesForm;

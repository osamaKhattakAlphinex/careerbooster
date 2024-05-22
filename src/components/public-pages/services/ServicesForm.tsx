"use client";
import { crossIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import { useFormik } from "formik";
import { Amiko } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import * as Yup from "yup";

type Service = {
  id: string;
  label: string;
  amount: number;
};

const SERVICES: Service[] = [
  {
    id: "linkedin-optimization",
    label: "linkedin optimization",
    amount: 200,
  },
  {
    id: "resume-generation",
    label: "resume generation",
    amount: 200,
  },
];

const ServicesForm = () => {
  const [coupan, setCoupan] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [amountOff, setAmountOff] = useState<number>(50);
  const [fullname, setFullname] = useState<string>("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);

  const paypalRef = useRef<any>(null);

  return (
    <div className="p-4 bg-gray-900 md:p-24">
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
          <p className="text-center ">
            <span className="block text-base font-semibold md:text-lg md:inline">
              Resume Generation:
            </span>
            Elevate your profile&apos;s visibility and appeal replace it for
            resume generation.
            <span className="block text-lg text-blue-300 md:text-xl md:inline">
              &nbsp; (Valued at $2000)
            </span>
          </p>
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
            Make an unforgettable first impression with a custom LinkedIn cover
            design.
            <span className="block text-lg text-blue-300 md:text-xl md:inline">
              &nbsp; (Valued at $100)
            </span>
          </p>
          <p className="text-center ">
            <span className="block text-base font-semibold md:text-lg md:inline">
              Bonus #3:
            </span>{" "}
            Make an unforgettable first impression with a custom LinkedIn cover
            design.
            <span className="block text-lg text-blue-300 md:text-xl md:inline">
              &nbsp; (Valued at $100)
            </span>
          </p>
        </div>
        <div className="self-center ">
          <span className="text-xl font-bold text-center md:text-4xl">
            Total Package Value: $3100
          </span>
        </div>
        <div className="self-center text-center">
          <span className="text-lg text-center text-blue-300 md:text-2xl">
            Special Limited-Time Offer: Unlock all these benefits for just $494!
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
      <form
        className="space-y-5 "
        onSubmit={(e) => {
          e.preventDefault();
          setShowPaypalPopup(true);
        }}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullname"
            className="text-base font-semibold md:text-lg"
          >
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="p-2 bg-transparent border border-gray-400 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base font-semibold md:text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-base font-semibold md:text-lg">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setServices([...services, service]);
                      setAmount(amount + service.amount);
                    } else {
                      setServices(services.filter((s) => s.id !== service.id));
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

        {/* coupan */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="coupan"
            className="text-base font-semibold md:text-lg"
          >
            Coupan
          </label>
          <input
            type="text"
            id="coupan"
            onChange={(e) => setCoupan(e.target.value)}
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>

        {services && services.length > 0 && (
          <>
            <div className="w-full p-6 rounded-sm shadow-md bg-slate-700">
              <span className="block w-full pb-2 text-base font-semibold text-center uppercase md:text-lg">
                Order Details
              </span>
              <div className="mt-2 border-t-[1.5px]">
                <div className="divide-gray-400 divide-y-[1.5px] py-2">
                  {services.map((service) => (
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
                    {coupan ? (
                      <span className="text-sm  md:text-base">
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
                  name="Submit Form "
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
                  amount={amount}
                  shippingPreference="NO_SHIPPING"
                  currency="USD"
                  onSuccess={(details: any, data: any) => {
                    if (data?.orderID) {
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesForm;

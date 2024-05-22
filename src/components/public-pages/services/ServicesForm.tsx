"use client";
import { crossIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import { useFormik } from "formik";
import { Amiko } from "next/font/google";
import React, { useRef, useState } from "react";
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
  const [fullname, setFullname] = useState<string>("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);

  console.log(amount);
  const paypalRef = useRef<any>(null);

  return (
    <div className="container w-3/4 p-24 bg-gray-900">
      <form
        className="space-y-5 "
        onSubmit={(e) => {
          e.preventDefault();
          setShowPaypalPopup(true);
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname" className="text-lg font-semibold">
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-lg font-semibold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
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
          <label htmlFor="coupan" className="text-lg font-semibold">
            Coupan
          </label>
          <input
            type="text"
            id="coupan"
            className="p-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>

        <div className="w-full p-6 rounded-sm shadow-md bg-slate-700">
          <span className="w-full pb-2 font-semibold text-center uppercase">
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
                    <h2> {service.label}</h2>
                    <span>$ {service.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t-[1.5px] py-2">
            <div className="flex flex-row items-center justify-between gap-2 ">
              <div className="flex flex-row justify-end w-full gap-2">
                <h2 className="font-bold ">Total</h2>
                <span>${amount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-950">
          <button
            type="submit"
            name="Submit Form "
            className="p-2 text-center "
          >
            Place Order
          </button>
        </div>
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

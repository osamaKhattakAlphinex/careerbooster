"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CreditPackages from "@/components/dashboard/checkout/CreditPackages";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { useFormik } from "formik";
import { Fade } from "react-awesome-reveal";
import { setField } from "@/store/userDataSlice";
import { RootState } from "@/store/store";
import axios from "axios";

const COUPON_MESSAGE = {
  initialized: "Please wait while we apply your coupon",
  success: "Your coupon has been applied successfully",
  error: "Invalid Coupon Code",
  existing: "Coupon code already redeemed",
};

export default function SubscribePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showExpiredAlert, setShowExpiredAlert] = useState<boolean>(false);
  const [showCoupanForm, setShowCoupanForm] = useState<boolean>(false);
  const [applyingCoupon, setApplyingCoupon] = useState<boolean>(false);
  const [couponState, setCoupanState] = useState<string>("initialized");
  // check if there is ?expired=1 in the URL
  const params = useSearchParams();
  const userData = useSelector((state: RootState) => state.userData);

  const formik = useFormik({
    initialValues: {
      coupan: "",
    },

    onSubmit: async (values) => {
      setApplyingCoupon(true);
      setShowCoupanForm(false);
      const redeemed: string[] = userData.redeemedCoupons;
      if (redeemed.includes(values.coupan)) {
        setCoupanState("existing");
        setTimeout(() => {
          setApplyingCoupon(false);
        }, 1000);
        return;
      }
      try {
        const response = await axios.post("/api/coupons/apply", {
          coupon: values.coupan,
        });
        if (response.data.success) {
          setCoupanState("success");
          dispatch(
            setField({
              name: "redeemedCoupons",
              value: [...userData.redeemedCoupons, values.coupan],
            })
          );
          formik.setFieldValue("coupon", "");
          router.push("/dashboard");
        } else {
          setShowCoupanForm(true);
          setCoupanState("error");
        }
      } catch (error) {
        setShowCoupanForm(true);
        setCoupanState("error");

        console.log(error);
      } finally {
        setTimeout(() => {
          setApplyingCoupon(false);
        }, 1000);
      }
    },

    validationSchema: Yup.object().shape({
      coupan: Yup.string().required("Coupan code is required"),
    }),
  });

  useEffect(() => {
    const expired = params?.get("expired");
    if (expired) {
      setShowExpiredAlert(true);
    }
  }, [params]);

  return (
    <>
      <div className="ml-0 md:px-[15px] pb-[72px]">
        <Link
          href="/dashboard"
          className="ml-2 my-4 w-fit  no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center  hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <main className="pb-20 flex-grow-1">
          <section className="w-full pt-4">
            <div className="">
              {showExpiredAlert && (
                <div className="justify-center mb-8 row">
                  <div
                    className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
                    role="alert"
                  >
                    <p className="p-0 m-0 dark:text-gray-100 text-gray-950 ">
                      Your current package has been expired. Please resubscribe
                      to a package to choose Free package
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-center mb-8">
                <div className="flex flex-col lg:w-10/12">
                  <div className="text-center">
                    <h1 className="mb-6 font-semibold dark:text-gray-100 text-gray-950 xs:text-2xl md:text-4xl">
                      All Plans Include a 30-Day Money Back Guarantee
                    </h1>
                    <p className="mb-0 text-base dark:text-gray-100 text-gray-950 ">
                      Your Path to More Interviews and Better Opportunities
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full gap-2 text-center">
                  <span className="">
                    Have a credit coupon ? Click{" "}
                    <button
                      className="italic underline text-[#db2777]"
                      onClick={() => setShowCoupanForm(!showCoupanForm)}
                    >
                      here
                    </button>{" "}
                    to apply
                  </span>

                  {showCoupanForm && !applyingCoupon && (
                    <Fade>
                      <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col items-center justify-center space-y-3 w-36"
                      >
                        <input
                          id="coupan"
                          placeholder="Enter Coupon"
                          className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-2 pl-[2rem] text-base  border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                          type="text"
                          value={formik.values.coupan}
                          onChange={formik.handleChange}
                        />
                        <button
                          type="submit"
                          className="no-underline px-[1rem] font-[500] text-[1rem] py-[.75rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
                        >
                          Apply Coupon
                        </button>
                      </form>
                    </Fade>
                  )}

                  {applyingCoupon && (
                    <span
                      className={`${
                        couponState === "success" ||
                        couponState === "initialized"
                          ? "text-gray-950 dark:text-gray-100"
                          : "text-red-500"
                      }`}
                    >
                      {COUPON_MESSAGE[couponState]}
                    </span>
                  )}
                </div>

                <div
                  className={`grid grid-cols w-fit xs:flex-col-1 md:grid-cols-2 gap-6 pt-6 ${
                    userData.creditPackage ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  {/* <Packages /> */}
                  <CreditPackages />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

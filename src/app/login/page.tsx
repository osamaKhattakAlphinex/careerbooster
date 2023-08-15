"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
      confirmpassword: Yup.string()
        .required("Enter Password again")
        .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
      role: Yup.string().required("Select an Option"),
      industry: Yup.string().required("Industry is Required"),
      terms: Yup.boolean().oneOf([true], "Please Accept Terms and conditions"),
    }),
    onSubmit: async (values) => {
      console.log("form value: ", values);

      // setSubmitting(true);
      // const signUpType: any = "form";
      // const userRes = await checkemail(values.email);
      // if (userRes === false) {
      //   const response: any = await gohighlevel(values);
      //   const regestationResp: any = await regestation(
      //     response,
      //     values,
      //     signUpType
      //   );
      // } else {
      //   setError("An account with the same Email already exist!");
      //   setSubmitting(false);
      // }
    },
  });
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="errorsemailinput">
                    <div className="alert alert-danger" role="alert">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full  bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Create new account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

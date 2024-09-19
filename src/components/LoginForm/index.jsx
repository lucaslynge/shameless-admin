import { addtoken, authuser } from "@/lib/features/authSlice";
import { useLoginAdminUserMutation } from "@/lib/services/userApi";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import React from "react";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";
import Loader from "../loader";
import { useAuth } from "@/context/AuthContext";
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {login}=useAuth()
  const [LoginAdminUser, { isLoading, isSuccess }] =
    useLoginAdminUserMutation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid_email")
      .matches(/\./, "Please match the requested format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "at least 8 characters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await LoginAdminUser(values).unwrap();
      

          if (response.success) {
       
            localStorage.setItem("token", response.token);
            localStorage.setItem("data", JSON.stringify(response.data));
            dispatch(authuser(response.data));
            dispatch(addtoken(response.token));
            login(response.token);

            resetForm();
          
            toast.success("Login Successfuly", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              transition: Slide,
              type: "success",
            
            });

            router.push("/app/user");
          }
        } catch (error) {
          toast.error(error.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "colored",
            transition: Slide,
            type: "error",
           
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleSubmit, values,handleChange,handleBlur }) => (
        <Form onSubmit={handleSubmit} className="space-y-6" >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && touched.email && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.email}
                  </div>
                )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && touched.password && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.password}
                  </div>
                )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              
              {isLoading ? (
                  <div className="text-center flex gap-2 justify-center mx-auto">
                     <Loader color="#00132f" /> <span>Loading...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

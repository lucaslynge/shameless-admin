
import React, { use, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import FormInput from "../form-input";
import TextAreaInput from "../form-textarea-input";
import * as Yup from "yup";
import Loader from "../loader";
import { Slide, toast } from "react-toastify";
import { Button } from "../ui/button";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/lib/services/categoryApi";

export default function CategoryForm({
  refetch,
  isedit,
  setIsOpen,
  category = {
    name: null,
    description: null,
  },
}) {
  const { name, description } = category;
  const [selectedOption, setSelectedOption] = useState("Subject*");
  const [CreateCategory, { isLoading }] = useCreateCategoryMutation();
  const [UpdateCategory, { isLoading: isLoadingUpdate }] =
  useUpdateCategoryMutation();

  console.log("selectedOption", selectedOption);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: isedit ? name : "",
          description: isedit ? description : "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("values",values)
          if (!isedit) {
            try {
              const response = await CreateCategory(values).unwrap();
              console.log("response", response);
              if (response.success) {
                resetForm();
                refetch();
                setIsOpen(false);

                toast.success(response.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "success",
                });
              }
            } catch (error) {
              // toast.error(error.message)
              console.log("err", error);
              resetForm();
            } finally {
              setSubmitting(false);
              resetForm();
            }
            return;
          }
          if (isedit) {
            console.log("isedit",isedit)
            console.log("category",category)
            try {
              const response = await UpdateCategory({
                id: category._id,
                body: values,
              }).unwrap();
              console.log("response", response);
                resetForm();
                refetch();
                setIsOpen(false);
                toast.success(response.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "success",
                });
              
            } catch (error) {
              // toast.error(error.message)
              console.log("err", error);
              resetForm();
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center bg-white rounded-xl px-5 py-4 md:px-2 md:py-2 mt-10"
          >
            <div className="w-full flex flex-col mb-4 md:flex-row gap-4">
              <div className="w-full">
                <Field
                  id="name"
                  component={FormInput}
                  type="text"
                  placeholder="Name"
                  name="name"
                />
                {errors.name && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <Field
                id="description"
                name="description"
                placeholder="Description"
                component={TextAreaInput}
              />
            </div>
            {!isedit && (
              <Button
                type="submit"
                className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5"
              >
                {isLoading ? <Loader /> : "Send"}
              </Button>
            )}
            {isedit && (
              <Button
                type="submit"
                className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5"
              >
                {isLoadingUpdate ? <Loader /> : "Send"}
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

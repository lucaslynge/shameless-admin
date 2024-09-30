import React, { use, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import FormInput from "../form-input";
import * as Yup from "yup";
import { useUpdateMessageMutation } from "../../lib/services/contactApi";
import Loader from "../loader";
import { Slide, toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerPopover from "../Date-single-picker-input";
import { Label } from "../ui/label";
import {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} from "@/lib/services/promoCodeApi";

export default function PromoForm({
  refetch,
  isedit,
  setIsOpen,
  promocode = {
    coupon: {
      duration: null,
    },
  },
}) {
  const [CreatePromoCode, { isLoading }] = useCreatePromoCodeMutation();
  const [UpdatePromoCode, { isLoading: isLoadingUpdate }] =
    useUpdatePromoCodeMutation();
  const [isDuration, setIsDuration] = useState(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    percent_off: Yup.string().required("Percent off is required"),
    duration: Yup.string().required("Duration  is required"),
    product_id: Yup.string().required("Plan  is required"),
    expires_at: Yup.string().required("Expire Date is required"),
  });
  console.log("promocode", promocode);
  //initialValues
  let initialValues;
  if (isedit) {
    initialValues = {
      status: promocode.active === true ? "Active" : "InActive",
    };
  } else {
    initialValues = {
      name: "",
      percent_off: "",
      duration: "",
      expires_at: "",
      duration_in_months: 1,
      number_of_customers:""
    };
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let data = {
            name: values?.name,
            percent_off: values?.percent_off,
            duration: values?.duration,
            expires_at: values?.expires_at,
            number_of_customers:values.number_of_customers
          };

          if (isDuration === "repeating") {
            data = {
              ...data,
              duration_in_months: values?.duration_in_months,
            };
          }
          if (!isedit) {
            try {
              const response = await CreatePromoCode(data).unwrap();
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
            data = {
              ...data,
              status: values.status === "Active" ? true : false,
            };
            try {
              const response = await UpdatePromoCode({
                id: promocode._id,
                body: data,
              }).unwrap();
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
          }
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5 items-center bg-white rounded-xl px-5 py-4 md:px-2 md:py-2 mt-10"
          >
            {!isedit && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <Label>Name</Label>
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
                  <div className="w-full">
                    <Label>Percent Off</Label>
                    <Field
                      id="percent_off"
                      component={FormInput}
                      name="percent_off"
                      placeholder="Percent off"
                      type="number"
                      max={100}
                      min={0}
                    />
                    {errors.percent_off && (
                      <div id="feedback" className="text-[12px]  text-red-500	">
                        {errors.percent_off}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 w-full gap-4">
                  <div id="duration-input w-full">
                    <Label>Duration</Label>
                    <Field name="duration" className="w-full">
                      {({ field, form }) => (
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            form.setFieldValue(field.name, value);
                            setIsDuration(value);
                          }}
                        >
                          <SelectTrigger className=" py-[22px]">
                            <SelectValue
                              className=""
                              placeholder="Select Duration"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={"once"}>Once</SelectItem>
                              <SelectItem value={"repeating"}>
                                Repeating
                              </SelectItem>
                              <SelectItem value={"forever"}>Forever</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    {errors.duration && (
                      <div id="feedback" className="text-[12px]  text-red-500	">
                        {errors.duration}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
             {!isedit && (
                <div className="grid w-full grid-cols-1 gap-4">
                  <div className="w-full">
                    <Label>Number of Customer</Label>
                    <Field
                      id="number_of_customers"
                      component={FormInput}
                      type="number"
                      placeholder="Number Of Customers"
                      name="number_of_customers"
                    />
                  
                  </div>
              
                </div>
              )}
            {!isedit && isDuration === "repeating" && (
              <div className="grid grid-cols-1 w-full gap-1">
                <Label>Duration in month</Label>
                <Field
                  id="duration_in_months"
                  component={FormInput}
                  name="duration_in_months"
                  placeholder="Duration in months"
                  type="number"
                />
              </div>
            )}
            {isedit && (
              <div className="grid grid-cols-1 w-full gap-4">
                <div id="status-input w-full">
                  <Label>Status</Label>
                  <Field name="status" className="w-full">
                    {({ field, form }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      >
                        <SelectTrigger className=" py-[22px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"Active"}>Active</SelectItem>
                            <SelectItem value={"InActive"}>InActive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  
                </div>
              </div>
            )}

           
{!isedit && (<div className="grid grid-cols-2 w-full items-center gap-4">
               <div id="plan-input">
                  <Label>Plan</Label>
                  <Field name="product_id">
                    {({ field, form }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      >
                        <SelectTrigger className="min-w-full py-[22px]">
                          <SelectValue placeholder="Select Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value={"price_1PzakzCtRRuu0btz8D7XGWR0"}
                            >
                              Monthly
                            </SelectItem>
                            <SelectItem
                              value={"price_1PzanICtRRuu0btzdQF2mwDx"}
                            >
                              Life Time
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.product_id && (
                    <div id="feedback" className="text-[12px]  text-red-500	">
                      {errors.product_id}
                    </div>
                  )}
                </div> 
                <div id="date-input">
                  <Label>Expire Date</Label>
                  <DatePickerPopover
                    initialDate={promocode?.expires_at}
                    name="expires_at"
                  />
                
                  <p className="text-xs font-light">Enter future date</p>
                </div>
              </div>)}

           

            {!isedit && (
              <Button
                type="submit"
                className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5"
              >
                {isLoading ? <Loader /> : "Create"}
              </Button>
            )}
            {isedit && (
              <Button
                type="submit"
                className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5"
              >
                {isLoadingUpdate ? <Loader /> : "Update"}
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
import { FieldInputProps } from "formik";
import React from "react";

export default function TextAreaInput({
  field,
  form,
  placeholder = "Message",
  ...props
}) {
  const { name, value, onChange, onBlur } = field;
  return (
    <textarea
      {...props}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={7}
      className="w-full text-base text-primaryColor border border-primaryColor rounded-md focus:outline-none px-5 py-3 placeholder:text-primaryColor"
    ></textarea>
  );
}

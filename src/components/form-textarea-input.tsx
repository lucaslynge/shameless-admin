import { FieldInputProps } from 'formik'
import React from 'react'
type inputType={
    name:string,
    value:string,
    onChange:any,
    onBlur:any

}
export default function TextAreaInput({ field, form, placeholder, ...props}:any) {
  const  { name, value, onChange, onBlur}:inputType=field || {}
      return (
        <textarea
        {...props}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Message"
        rows={7}
        className="w-full text-base text-primaryColor border border-primaryColor rounded-md focus:outline-none px-5 py-3 placeholder:text-primaryColor mt-3"
      ></textarea>
       
    )
}

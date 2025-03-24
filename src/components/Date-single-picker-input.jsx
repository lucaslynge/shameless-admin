import React, { useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

const DatePickerPopover = ({ initialDate = null, name = "publishDate" }) => {
  const { setFieldValue, values } = useFormikContext(); // Access Formik's context to set field value
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : null); // Local state for selected date

  useEffect(() => {
    // Ensure the value from Formik is a valid date
    // if (values.publishDate && !(values.publishDate instanceof Date)) {
    //   const parsedDate = new Date(values.publishDate);
    //   if (!isNaN(parsedDate)) {
    //     setDate(parsedDate);
    //   }
    // }
    if (!initialDate) return;

    setDate(new Date(initialDate));
  }, [initialDate]);

  return (
    <Field name={name}>
      {({ field }) => (
        <Popover>
          <PopoverTrigger className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141]  px-4 py-3 cursor-pointer">
            {date ? (
              // Render date as a readable string, otherwise use field value
              date instanceof Date && !isNaN(date) ? (
                date.toLocaleDateString()
              ) : (
                field.value
              ) // Ensure field value is a string, not a Date object
            ) : (
              <span>Pick a date</span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate); // Update local state
                setFieldValue(field.name, selectedDate); // Set Formik field value
              }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      )}
    </Field>
  );
};

export default DatePickerPopover;

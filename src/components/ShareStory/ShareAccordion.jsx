import { Field, FieldArray, FormikContext, useFormikContext } from "formik";
import { useState, useRef, useEffect, ReactNode } from "react";

export const ShareAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const { values } = useFormikContext()

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className="border border-[#C8C8C8] bg-white overflow-hidden rounded-md">
      <button
      type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center text-left text-sm md:textbase font-bold focus:outline-none px-5 py-4`}
      >
        How to write a good post? Answer the questions.
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden bg-[#F9F9FF] transition-max-height duration-300 ease-out px-5"
        style={{ maxHeight: "0px" }}
      >
        <div className="w-full py-5">
          <FieldArray
            name="question_answers"
            render={arrayHelpers => values?.question_answers?.map((item, index) => {
              return (
                <div key={index} className="my-4">
                  <p className="text-sm font-semibold">
                    {item.question}
                  </p>
                  <Field
                    type="text"
                    placeholder="Type here"
                    name={`question_answers[${index}].answer`}
                    className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                  />
                </div>)
            })}

          />

        </div>
      </div>
    </div>
  );
};

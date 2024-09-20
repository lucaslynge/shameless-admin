import { Field, FieldArray, useFormikContext } from "formik";
import { CircleX, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Quill from "./TextEditor";
import { Button } from "../ui/button";

export default function AdditionalDetails() {
  const { values, setFieldValue, handleChange } = useFormikContext();
  const [valueTextEditor, setValueTextEditor] = useState("");

  const handleFileChange = (
    event,
    index
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the file for Formik and the result for preview
        setFieldValue(`details[${index}].icon`, file); // Store the file itself
        setFieldValue(`details[${index}].iconPreview`, reader.result); // Store the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-5">
      <p className="text-lg font-bold mb-2">Additional Details</p>
      <div className="bg-gray-50">
        <FieldArray
          name="details"
          render={(arrayHelpers) =>
            values.details.map((item, index) => {
              return (
                <div key={index} className="grid p-4 grid-cols-12">
                  <div className="col-span-10">
                    <div>
                      <p className="text-sm font-semibold">Icon</p>
                      <div className="mt-1">
                        <input
                          type="file"
                          id={`fileInput-${index}`}
                          style={{ display: "none" }}
                          onChange={(event) => handleFileChange(event, index)}
                        />
                        <div
                          className="h-40 flex flex-col justify-center items-center border border-dashed border-[#C8C8C8] rounded-md cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById(`fileInput-${index}`)
                              ?.click()
                          }
                        >
                          {item.iconPreview ? (
                            <Image
                              src={item.iconPreview} // Use the preview URL here
                              alt=""
                              width={100}
                              height={100}
                              className="hover:cursor-pointer rounded-full"
                            />
                          ) : (
                            <>
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_1_5525)">
                                  <path
                                    d="M24.0007 19.9999V23.9999H8.00065V19.9999H5.33398V23.9999C5.33398 25.4666 6.53398 26.6666 8.00065 26.6666H24.0007C25.4673 26.6666 26.6673 25.4666 26.6673 23.9999V19.9999H24.0007ZM9.33398 11.9999L11.214 13.8799L14.6673 10.4399V21.3333H17.334V10.4399L20.7873 13.8799L22.6673 11.9999L16.0007 5.33325L9.33398 11.9999Z"
                                    fill="#BEBEBE"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_5525">
                                    <rect width="32" height="32" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p className="text-xs text-center text-[#8B8B8B]">
                                Upload icon
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <p className="text-sm font-semibold">Title</p>
                      <Field
                        type="text"
                        name={`details[${index}].title`}
                        className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                      />
                    </div>

                    <p className="text-sm font-semibold mb-2">Description</p>
                    {/* You can uncomment and implement the Quill editor if needed */}
                    <Quill
                      name={`details[${index}].description`}
                      valueText={values.details[index]?.description || ''} // Directly bind Formik's value
                      onSetValueTextEditor={(value) => {
                        setValueTextEditor(value);
                        handleChange({
                          target: {
                            name: `details[${index}].description`,
                            value: value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => arrayHelpers.remove(index)}
                      type="button"
                    >
                      <CircleX className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              );
            })
          }
        />
      </div>

      <Button
        onClick={() =>
          setFieldValue("details", [
            ...values.details,
            { icon: "", iconPreview: "", title: "", description: "" },
          ])
        }
        className="flex float-right p-4 items-center bg-black"
 
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
}

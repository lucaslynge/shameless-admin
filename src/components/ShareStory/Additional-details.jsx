import { Field, FieldArray, useFormikContext } from "formik";
import { CircleX, Plus } from "lucide-react";
import Quill from "./TextEditor";
import { Button } from "../ui/button";
import { TagsInput } from "react-tag-input-component";

export default function AdditionalDetails() {
  const { values, setFieldValue, handleChange } = useFormikContext();

  return (
    <div className="my-5">
      <p className="text-lg font-bold mb-2">Additional Details</p>
      <div className="bg-gray-50">
        <FieldArray
          name="details"
          render={(arrayHelpers) =>
            values?.details?.map((item, index) => {
              return (
                <div key={index} className="grid p-4 grid-cols-12">
                  <div className="col-span-10">
                    <div className="my-4">
                      <p className="text-sm font-semibold">Title</p>
                      <Field
                        type="text"
                        name={`details[${index}].title`}
                        className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                      />
                    </div>

                    <p className="text-sm font-semibold mb-2">Description</p>
                    <Quill
                      name={`details[${index}].description`}
                      valueText={values.details[index]?.description || ""}
                      onSetValueTextEditor={(value) => {
                        handleChange({
                          target: {
                            name: `details[${index}].description`,
                            value: value,
                          },
                        });
                      }}
                    />
                    <div className="my-4">
                      <TagsInput
                        classNames={{
                          tag: "text-sm",
                          input:
                            "focus:!outline-none focus:[box-shadow:none] !transition-none !border-none !text-sm",
                        }}
                        value={values.details[index]?.keywords ?? [""]}
                        onChange={(value) =>
                          handleChange({
                            target: {
                              name: `details[${index}].keywords`,
                              value,
                            },
                          })
                        }
                        name="keywords"
                        placeHolder="Enter keywords"
                      />
                    </div>
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
            {
              title: "",
              description: "",
              keywords: [],
            },
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

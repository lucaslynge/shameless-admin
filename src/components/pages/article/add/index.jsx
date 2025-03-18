import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import placeholderImg from "@/public/assest/placeholder_img.png";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import {
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DatePickerPopover from "@/components/Date-single-picker-input";
import { VectorImage } from "@/components/vectors/image";
import AdditionalDetails from "@/components/ShareStory/Additional-details";
import { useAddArticle } from "./hook";
import { ReactTags } from "react-tag-autocomplete";
import { defaultTags, tagsData } from "./data";
import { CircleX } from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../../components/editor"), {
  ssr: false,
});

export const AddArticleMain = () => {
  const {
    getInitialValues,
    handleFormSubmit,
    handleFileClick,
    isCreatingArticle,
    isUpdatingArticle,
    handleFileChange,
    validationSchema,
    data,
    filepath,
    isEditing,
    verifiedByFilePath,
    handleAddVerifiedByImage,
  } = useAddArticle();

  const ageOptions = Array.from({ length: 48 }, (_, i) => (i + 18).toString());

  const getSuggestions = (stiStatus) => {
    if (!stiStatus || stiStatus === "General") return defaultTags;

    return defaultTags.concat(tagsData[stiStatus]);
  };

  return (
    <div className="md:w-[75%] with-react-tags 2xl:w-[40%] mx-auto bg-white rounded-md md:px-7 mb-5">
      <div>
        <p className="text-2xl font-bold">Share Your Story</p>
        <Formik
          initialValues={getInitialValues()}
          enableReinitialize
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            errors,
            touched,
            handleSubmit,
            values,
            handleChange,
            isSubmitting,
            handleBlur,
            isValid,
            setFieldValue,
          }) => (
            <Form className="pt-8" onSubmit={handleSubmit} id="share_story">
              <div>
                <label htmlFor="headline" className="text-sm font-semibold">
                  Headline*
                </label>
                <Field
                  type="text"
                  id="headline"
                  value={values.headline}
                  onChange={handleChange}
                  name="headline"
                  placeholder="Type here"
                  className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                />
                {errors.headline && touched.headline && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.headline}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold mb-2">Primary Message</p>
                <div className="editor">
                  <Editor
                    onChange={(value) => {
                      handleChange({
                        target: { name: "content", value },
                      });
                    }}
                    markdown={values.content ? values.content : "Your content"}
                    defaultValue={data?.content}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor={`review`} className="text-sm font-semibold">
                  Featuring Text
                </label>
                <Textarea
                  rows={5}
                  name="featuring_text"
                  maxLength={160}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.featuring_text}
                  placeholder="Write a summary in 160 character or less"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="slug" className="text-sm font-semibold">
                  Slug*
                </label>
                <Field
                  type="text"
                  id="slug"
                  value={values.slug}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="slug"
                  placeholder="Type here"
                  className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                />
                {errors.slug && touched.slug && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.slug}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="type" className="text-sm font-semibold mb-2">
                  Type*
                </label>
                <Field name="type" id="type">
                  {({ field, form }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        form.setFieldValue(field.name, value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"medical_trial"}>
                            Medical Trial
                          </SelectItem>
                          <SelectItem value={"artical"}>Artical</SelectItem>
                          <SelectItem value={"personal_story"}>
                            Personal Story
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                {errors.type && touched.type && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.type}
                  </div>
                )}
              </div>
              <div className="my-5">
                <Field name="front_page" id="front_page">
                  {({ field, form }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        id="airplane-mode"
                      />
                      <Label htmlFor="airplane-mode">Show on Front Page</Label>
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-12  justify-between gap-4 mt-3">
                {(values.type === "artical" ||
                  values.type === "personal_story") && (
                  <>
                    <div className="col-span-4">
                      <label
                        className="text-sm font-semibold mb-1 block"
                        htmlFor="age"
                      >
                        Age
                      </label>
                      <Field name="age" id="age">
                        {({ field, form }) => (
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {ageOptions.map((age, index) => (
                                  <SelectItem key={index} value={age}>
                                    {age}
                                  </SelectItem>
                                ))}
                                <SelectItem value={null}>None</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="gender"
                        className="text-sm font-semibold mb-1 block"
                      >
                        Gender
                      </label>
                      <Field id="gender" name="gender">
                        {({ field, form }) => (
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value={"Male"}>Male</SelectItem>
                                <SelectItem value={"Female"}>Female</SelectItem>
                                <SelectItem value={"Other"}>Other</SelectItem>
                                <SelectItem value={"none"}>None</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </div>
                  </>
                )}

                <div className="col-span-4">
                  <label
                    className="text-sm font-semibold block mb-1"
                    htmlFor="STI_status"
                  >
                    STI Status
                  </label>
                  <Field id="STI_status" name="STI_status">
                    {({ field, form }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"Herpes (HSV)"}>
                              Herpes (HSV)
                            </SelectItem>
                            <SelectItem value={"Herpes (HSV-1)"}>
                              Herpes (HSV-1)
                            </SelectItem>
                            <SelectItem value={"Herpes (HSV-2)"}>
                              Herpes (HSV-2)
                            </SelectItem>
                            <SelectItem value={"HIV"}>HIV</SelectItem>
                            <SelectItem value={"HPV"}>HPV</SelectItem>
                            <SelectItem value={"HTLV"}>HTLV</SelectItem>
                            <SelectItem value={"CMV"}>CMV</SelectItem>
                            <SelectItem value={"EBV"}>EBV</SelectItem>
                            <SelectItem value={"Hepatitis B & C"}>
                              Hepatitis B & C
                            </SelectItem>
                            <SelectItem value={"Molluscum"}>
                              Molluscum
                            </SelectItem>
                            <SelectItem value={"General"}>General</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                </div>
              </div>

              <div
                className={`mt-5 ${
                  values.STI_status &&
                  (values.STI_status !== "General" ||
                    values.STI_status !== "None")
                    ? "grouped"
                    : ""
                }`}
              >
                <label htmlFor="tags" className="text-sm font-semibold">
                  Tags
                  <span className="ml-1 text-xs font-normal">
                    (limited to 3)
                  </span>
                </label>
                <ReactTags
                  labelText="Add tags"
                  selected={values.tags}
                  suggestions={getSuggestions(values.STI_status)}
                  onAdd={(tag) => {
                    if (values.tags.length >= 3) return;

                    setFieldValue("tags", values.tags.concat(tag));
                  }}
                  onDelete={(tagIndex) => {
                    setFieldValue(
                      "tags",
                      values.tags.filter((tag, index) => index !== tagIndex)
                    );
                  }}
                  noOptionsText="No matching tag"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 mt-3">
                <div className="w-full">
                  <p className="text-sm font-semibold">Published Date*</p>
                  <div className="mt-1">
                    <DatePickerPopover initialDate={data?.publishDate} />
                    {errors.publishDate && touched.publishDate && (
                      <div id="feedback" className="text-[12px]  text-red-500	">
                        {errors.publishDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="readTime" className="text-sm font-semibold">
                    Read Min*
                  </label>
                  <div>
                    <Field
                      type="number"
                      id="readTime"
                      min={0}
                      value={values.readTime}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      name="readTime"
                      placeholder="Type here"
                      className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] px-4 py-3"
                    />
                    {errors.readTime && touched.readTime && (
                      <div id="feedback" className="text-[12px]  text-red-500	">
                        {errors.readTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="writtenBy"
                  className="text-sm font-semibold mb-2"
                >
                  Written by
                </label>
                <Field id="writtenBy" name="writtenBy">
                  {({ field, form }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Tunggul Laras">
                            Tunggul Laras
                          </SelectItem>
                          <SelectItem value="Noelyn Dyll Feliciano">
                            Noelyn Dyll Feliciano
                          </SelectItem>
                          <SelectItem value="Winda Adriana">
                            Winda Adriana
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              <div className="mt-5">
                <Field name="isVerified" id="isVerified">
                  {({ field, form }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        id="airplane-mode"
                      />
                      <Label htmlFor="airplane-mode">
                        Is medically verified
                      </Label>
                    </div>
                  )}
                </Field>
                {values.isVerified && (
                  <div className="pt-2">
                    <label
                      htmlFor="verifiedBy"
                      className="text-sm font-semibold"
                    >
                      Verified by
                    </label>
                    <div className="flex items-end gap-x-2">
                      <input
                        type="file"
                        id="verifiedByImage"
                        style={{ display: "none" }}
                        onChange={handleAddVerifiedByImage}
                      />
                      <label
                        htmlFor="verifiedByImage"
                        className="border grid place-content-center border-dashed border-[#C8C8C8] rounded-md cursor-pointer w-12 h-11 "
                      >
                        <Image
                          src={
                            verifiedByFilePath
                              ? verifiedByFilePath
                              : placeholderImg
                          }
                          alt=""
                          width={40}
                          height={40}
                          className="rounded object-cover w-[40px] h-[40px] hover:cursor-pointer "
                        />
                      </label>
                      <Field
                        type="text"
                        id="verifiedBy"
                        value={values.verifiedBy}
                        onChange={handleChange}
                        name="verifiedBy"
                        placeholder="Name here"
                        className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                      />
                    </div>
                    <div>
                      <FieldArray
                        name="verificationSources"
                        render={(arrayHelpers) => (
                          <div className="py-4 px-2 mt-4 border rounded border-gray-200 bg-gray-50 relative">
                            {values.verificationSources.length > 0 &&
                              values.verificationSources.map(
                                (friend, index) => (
                                  <div key={index}>
                                    <div className="mb-4 flex w-full justify-between items-center gap-x-2">
                                      <div>
                                        <Field
                                          type="text"
                                          name={`verificationSources.${index}.label`}
                                          className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-2"
                                          placeholder="Source label"
                                        />
                                        <Field
                                          type="text"
                                          name={`verificationSources.${index}.url`}
                                          className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-2"
                                          placeholder="Source url"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <CircleX className="h-6 w-6" />
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            <Button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({ label: "", url: "" })
                              }
                            >
                              Add source
                            </Button>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="status" className="text-sm font-semibold mb-2">
                  Status*
                </label>
                <Field id="status" name="status">
                  {({ field, form }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"approved"}>Approved</SelectItem>
                          <SelectItem value={"pending"}>Pending</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                {errors.status && touched.status && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.status}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold">
                  Upload picture (optional) Size(500 x 300)
                </p>
                <div className="mt-1">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div
                    className="h-40 flex flex-col justify-center items-center border border-dashed border-[#C8C8C8] rounded-md cursor-pointer"
                    onClick={handleFileClick}
                  >
                    {filepath ? (
                      <Image
                        src={filepath ? filepath : placeholderImg}
                        alt=""
                        width={300}
                        height={200}
                        className="rounded object-cover w-[240px] h-[150px] hover:cursor-pointer "
                      />
                    ) : (
                      <>
                        <VectorImage />
                        <p className="text-xs text-center text-[#8B8B8B]">
                          Upload file
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="mt-5">
                <ShareAccordion />
              </div> */}
              <div className="my-5">
                <AdditionalDetails />
              </div>
              <div className="mt-10 ">
                <Button
                  type="submit"
                  disabled={(!isValid || isSubmitting) && isEditing === "false"}
                >
                  {isEditing === "true" ? (
                    isUpdatingArticle ? (
                      <div className="flex gap-x-2 justify-center">
                        <Loader /> <p> Loading...</p>
                      </div>
                    ) : (
                      " Update the Story"
                    )
                  ) : isCreatingArticle ? (
                    <div className="flex gap-x-2 justify-center">
                      <Loader /> <p> Loading...</p>
                    </div>
                  ) : (
                    " Post the Story"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { ShareAccordion } from "./ShareAccordion";
import Quill from "./TextEditor";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import placeholderImg from "@/public/assest/placeholder_img.png";
import { Slide, toast } from "react-toastify";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useLazyGetBySlugArticleQuery,
} from "@/lib/services/articleApi";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Loader from "../loader";
import AdditionalDetails from "./Additional-details";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerPopover from "../Date-single-picker-input";
import { useGetAllCategoryQuery } from "@/lib/services/categoryApi";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { generateSlug } from "@/lib/utils/helper";
import slugify from "slugify";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Catgory is required"),
  headline: Yup.string().required("headline is required"),
  slug: Yup.string()
    .required("Slug is required")
    .test("is-slug", "Slug is not valid", function (value) {
      const { title } = this.parent;
      // Slugify the title or value
      const slug = slugify(title || value || "", { lower: true, strict: true });
      return value === slug;
    }),
  status: Yup.string().required("status is required"),
  readTime: Yup.string().required("readTime is required"),
  publishDate: Yup.string().required("publishdate is required"),
});

export default function ShareMain() {
  const [headline, setHeadline] = useState("");
  const [initialCategory, setInitialCategory] = useState("");
  const router = useRouter();
  const slug = router.query.slug;
  const [file, setFile] = useState(null);
  const [getSlugArticle, { data }] = useLazyGetBySlugArticleQuery();
  const [isShowTypeFileds, setIsShowTypeFileds] = useState(false);
  const [CreateArticle, { isLoading }] = useCreateArticleMutation();
  const [UpdateArticle, { isLoading: isLoadingUpdate }] =
    useUpdateArticleMutation();
  const isEditing = router.query.isediting;
  const { data: dataCategory } = useGetAllCategoryQuery();
  const [filepath, setfilepath] = useState("");
  const [IsType, setIsType] = useState(false);
  const maxChars = 15;
  const [valueTextEditor, setValueTextEditor] = useState(data?.primary_message);
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      setFile(file);
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = function () {
        setfilepath(reader?.result);
      };
    }
  };
  useEffect(() => {
    if (isEditing) {
      setValueTextEditor(data?.primary_message);
      setfilepath(data?.image ? data?.image : placeholderImg);
      setInitialCategory(data?.category?._id);
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setIsShowTypeFileds(true);
    }, 1000);
  }, []);

  const handleFileClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    if (slug) {
      getSlugArticle(slug);
    }
  }, [slug]);

  const ageOptions = Array.from({ length: 48 }, (_, i) => (i + 18).toString());
  return (
    <div className="w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mx-auto bg-white rounded-md px-7 mb-5">
      <div>
        <p className="text-2xl font-bold">Share Your Story</p>
        <Formik
          initialValues={{
            headline: isEditing === "true" ? data?.headline : "",
            primary_message: isEditing === "true" ? data?.primary_message : "",
            type: isEditing === "true" ? data?.type : "",
            age: isEditing === "true" ? data?.age?.toString() : 18,
            gender: isEditing === "true" ? data?.gender : "Male",
            user_id: isEditing === "true" ? data?.user_id : "",
            STI_status: isEditing === "true" ? data?.STI_status : "",
            image: isEditing === "true" ? data?.image : "",
            readTime: isEditing === "true" ? data?.readTime : "",
            category: initialCategory?.toString(),
            status: isEditing === "true" ? data?.status : "",
            publishDate: isEditing === "true" ? data?.publishDate : "",
            slug: isEditing === "true" ? data?.slug : "",
            featuring_text: isEditing === "true" ? data?.featuring_text : "",
            front_page: isEditing === "true" ? data?.front_page : false,
            question_answers:
              isEditing && data?.question_answers
                ? data?.question_answers
                : [
                    {
                      question:
                        "How has your STI diagnosis impacted your daily life?",
                      answer: "",
                    },
                    {
                      question:
                        "What have been the biggest challenges you've faced?",
                      answer: "",
                    },
                    {
                      question:
                        "How do you manage your STI, both physically and emotionally?",
                      answer: "",
                    },
                    {
                      question:
                        "What advice would you give to someone newly diagnosed?",
                      answer: "",
                    },
                    {
                      question:
                        "What misconceptions about STIs would you like to correct?",
                      answer: "",
                    },
                    {
                      question:
                        "What are your goals moving forward in managing your STI?",
                      answer: "",
                    },
                  ],
            details:
              isEditing && data?.details
                ? data?.details.map((detail) => {
                    return {
                      ...detail,
                      iconPreview: detail.icon,
                    };
                  })
                : [],
          }}
          enableReinitialize
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            let data = {
              ...values,
              primary_message: valueTextEditor,
            };
            if (file) {
              data = {
                ...data,
                image: file,
              };
            }
            const formdata = new FormData();
            formdata.append("headline", data.headline);
            formdata.append("primary_message", data.primary_message);
            formdata.append("type", data.type);
            formdata.append("age", data.age ? data.age : "");
            formdata.append("gender", data.gender);
            formdata.append("STI_status", data.STI_status);
            formdata.append("publishDate", data.publishDate);
            formdata.append("readTime", data.readTime);
            formdata.append("image", data.image);
            formdata.append("status", data.status);
            formdata.append("category", data.category);
            formdata.append("featuring_text", data.featuring_text);
            formdata.append("front_page", data.front_page);
            formdata.append(
              "question_answers",
              JSON.stringify(values.question_answers)
            );

            const slugfiy = generateSlug(data.slug);
            formdata.append("slug", slugfiy);
            const filteredetails = values.details.map((detail) => {
              return {
                icon: detail.icon,
                title: detail.title,
                description: detail.description,
                keywords: detail.keywords,
              };
            });
            formdata.append("details", JSON.stringify(filteredetails));
            if (isEditing === "false") {
              try {
                const response = await CreateArticle(formdata).unwrap();
                if (response.success) {
                  resetForm();
                  toast.success(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    transition: Slide,
                    type: "success",
                  });
                  router.push("/app/articles");
                }
              } catch (error) {
                toast.error(error.data.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "error",
                });
              } finally {
                setSubmitting(false);
                setFile("");
                setHeadline("");
                resetForm();
                setValueTextEditor("");
                setfilepath("");
              }
            }
            if (isEditing === "true") {
              try {
                const response = await UpdateArticle({
                  id: slug,
                  body: formdata,
                }).unwrap();
                if (response.success) {
                  console.log("response", response);
                  getSlugArticle(slug);
                  resetForm();
                  toast.success(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    transition: Slide,
                    type: "success",
                  });
                  router.push("/app/articles");
                }
              } catch (error) {
                if (error.status == 404) {
                  toast.error(error.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "colored",
                    transition: Slide,
                    type: "error",
                  });
                }
              } finally {
                setSubmitting(false);
                setFile("");
                setHeadline("");
                resetForm();
                setValueTextEditor("");
                setfilepath("");
              }
            }
          }}
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
          }) => (
            <Form onSubmit={handleSubmit} id="share_story">
              <div className="mt-8">
                <div>
                  <label htmlFor="headline" className="text-sm font-semibold">
                    Headline*
                  </label>
                  <Field
                    type="text"
                    id="headline"
                    value={values.headline}
                    onChange={(e) => {
                      handleChange(e);
                      setHeadline(e.target.value);
                    }}
                    name="headline"
                    placeholder="Type here"
                    className="w-full text-sm border border-[#C8C8C8] rounded-md focus:outline-none placeholder:text-[#414141] mt-1 px-4 py-3"
                  />
                  {errors.headline && touched.headline && (
                    <div id="feedback" className="text-[12px]  text-red-500	">
                      {errors.headline}
                    </div>
                  )}

                  <p className="text-end text-xs font-semibold text-[#414141] mt-1">
                    {headline.length}/{maxChars}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold mb-2">Primary Message</p>
                  <Quill
                    name="primary_message"
                    valueText={valueTextEditor}
                    onSetValueTextEditor={(value) => {
                      setValueTextEditor(value);
                      handleChange({
                        target: { name: "primary_message", value: value },
                      });
                    }}
                  />
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
                          if (value === "personal_story") {
                            setIsType("personal_story");
                          } else if (value === "artical") {
                            setIsType("artical");
                          } else {
                            setIsType(null);
                          }
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
                        <Label htmlFor="airplane-mode">
                          Show on Front Page
                        </Label>
                      </div>
                    )}
                  </Field>
                </div>

                {(IsType === "personal_story" ||
                  IsType === "artical" ||
                  data?.type === "personal_story" ||
                  data?.type === "artical") &&
                  isShowTypeFileds && (
                    <div className="grid grid-cols-12  justify-between gap-4 mt-3">
                      <div className="col-span-4">
                        <p className="text-sm font-semibold">Age</p>
                        <div className="mt-1">
                          <Field name="age">
                            {({ field, form }) => {
                              return (
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
                              );
                            }}
                          </Field>
                        </div>
                      </div>

                      <div className="col-span-4">
                        <label id="gender" className="text-sm font-semibold">
                          Gender
                        </label>
                        <div className="mt-1">
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
                                    <SelectItem value={"Female"}>
                                      Female
                                    </SelectItem>
                                    <SelectItem value={"Other"}>
                                      Other
                                    </SelectItem>
                                    <SelectItem value={"none"}>None</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <p className="text-sm font-semibold">STI Status</p>
                        <div className="mt-1">
                          <Field name="STI_status">
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
                                    <SelectItem value={"HIV"}>HIV</SelectItem>
                                    <SelectItem value={"HPV"}>HPV</SelectItem>
                                    <SelectItem value={"Hepatitis B & C"}>
                                      Hepatitis B & C
                                    </SelectItem>
                                    <SelectItem value={"Hepatitis B & C(CMV)"}>
                                      Hepatitis B & C
                                    </SelectItem>
                                    <SelectItem value={"Molluscum"}>
                                      Molluscum
                                    </SelectItem>
                                    <SelectItem value={"None"}>None</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  )}

                <div className="flex flex-col md:flex-row justify-between gap-4 mt-3">
                  <div className="w-full">
                    <p className="text-sm font-semibold">Published Date*</p>
                    <div className="mt-1">
                      <DatePickerPopover initialDate={data?.publishDate} />
                      {errors.publishDate && touched.publishDate && (
                        <div
                          id="feedback"
                          className="text-[12px]  text-red-500	"
                        >
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
                        <div
                          id="feedback"
                          className="text-[12px]  text-red-500	"
                        >
                          {errors.readTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="category" className="text-sm font-semibold">
                    Category*
                  </label>
                  <Field id="category" name="category">
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
                            {dataCategory?.categoryData?.map((item, index) => {
                              return (
                                <SelectItem key={index} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.category && touched.category && (
                    <div id="feedback" className="text-[12px]  text-red-500	">
                      {errors.category}
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="status"
                    className="text-sm font-semibold mb-2"
                  >
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
                            Upload file
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <ShareAccordion />
                </div>
                <div className="my-5">
                  <AdditionalDetails />
                </div>
              </div>
              <div className="mt-10 ">
                <Button
                  type="submit"
                  disabled={(!isValid || isSubmitting) && isEditing === "false"}
                >
                  {isEditing === "true" ? (
                    isLoadingUpdate ? (
                      <div className="flex gap-x-2 justify-center">
                        <Loader /> <p> Loading...</p>
                      </div>
                    ) : (
                      " Update the Story"
                    )
                  ) : isLoading ? (
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
}

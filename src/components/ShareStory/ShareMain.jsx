import React, { useState, useEffect } from "react";
import { OptionSelection } from "./DropDowns/OptionSelection";
import { AgeSelection } from "./DropDowns/AgeSelection";
import { GenderSelection } from "./DropDowns/GenderSelection";
import { ShareAccordion } from "./ShareAccordion";
import ProgressBar from "./ProgressBar";
import Quill from "./TextEditor";
import { Field, Form, Formik, useFormikContext } from "formik";
import { getUser } from "@/lib/utils/helper";
import * as Yup from "yup";
import Image from "next/image";
import { Slide, toast } from "react-toastify";
import {
  useCreateArticleMutation,
  useGetAllArticleQuery,
  useGetByIdArticleQuery,
  useUpdateArticleMutation,
} from "@/lib/services/articleApi";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import Loader from "../loader";

export default function ShareMain() {
  const [headline, setHeadline] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [CreateArticle, { isLoading }] = useCreateArticleMutation();
  const [UpdateArticle, { isLoading:isLoadingUpdate }] = useUpdateArticleMutation();
  const {refetch:allarticle}=useGetAllArticleQuery()

  const [option, setOption] = useState("Select Type");
  const router = useRouter();
  const [ageOption, setAgeOption] = useState("Select");
  const [genderOption, setGenderOption] = useState("Select");
  const user = useSelector((state) => state.auth.user);
  const id = router.query.id;
  const isEditing = router.query.isediting;
  const { data,refetch } = useGetByIdArticleQuery(id);
  const [filepath, setfilepath] = useState("");


  console.log("data", data);
  const validationSchema = Yup.object().shape({
    headline: Yup.string().required("Headline is required "),
    primary_message: Yup.string().required("Primary message is required"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const [valueTextEditor, setValueTextEditor] = useState("");

  const maxChars = 15;
  useEffect(()=>{
    if(isEditing){
      setfilepath(data?.image)
      setValueTextEditor(data?.primary_message)
    }
  },[])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      setFile(file);
      setFileName(file.name);
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = function () {
        setfilepath(reader?.result);
      };
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mx-auto bg-white rounded-md px-7 mb-5">
      <div>
        <p className="text-2xl font-bold">Share Your Story</p>
        <Formik
          initialValues={{
            headline: isEditing ? data?.headline : "",
            primary_message: isEditing ? data?.primary_message : "",
            type: "",
            age: isEditing ? data?.age : "",
            gender: isEditing ? data?.gender : "",
            user_id: "",
            image: "",
            question_answers: [
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
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            let data = {
              ...values,
              primary_message: valueTextEditor,
              type: option,
              age: ageOption,
              gender: genderOption,
            };
            console.log("data share main",data)
            if(file){
              data={
                ...data,
                image: file
              }
            }
            console.log("data",data)
            const formdata = new FormData();
            formdata.append("headline", data.headline);
            formdata.append("primary_message", data.primary_message);
            formdata.append("type", data.type);
            formdata.append("age", data.age);
            formdata.append("gender", data.gender);
            formdata.append("image", data.image);
            formdata.append(
              "question_answers",
              JSON.stringify(values.question_answers)
            );
            if(isEditing==="false"){
              formdata.append("user_id", user._id);
            try {
              const response = await CreateArticle(formdata).unwrap();
              if (response.success) {
                console.log("response", response);
                resetForm();
                toast.success(response.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "success",
                });
                allarticle()
                router.push("/app/articles");
              }
            } catch (error) {
              if (error.status == 404) {
                toast.error(error.data.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "error",
                
                });
              }
            } finally {
              setSubmitting(false);
              setFile("");
              setGenderOption("Select");
              setAgeOption("Select");
              setHeadline("");
              resetForm();
              setOption("Full annonymus");
              setValueTextEditor("");
              setFileName("");
              setfilepath("");
              allarticle()
            }
           }
           if(isEditing==="true"){
            try {
              const response = await UpdateArticle({id:id,body:formdata}).unwrap();
              if (response.success) {
                console.log("response", response);
                resetForm();
                toast.success(response.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type: "success",
                });
                refetch()
                allarticle()
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
              setGenderOption("Select");
              setAgeOption("Select");
              setHeadline("");
              resetForm();
              setOption("Full annonymus");
              setValueTextEditor("");
              setFileName("");
              setfilepath("");
              allarticle()
            }
           }
            resetForm();
          }}
        >
          {({ errors, touched, handleSubmit, values, handleChange }) => (
            <Form onSubmit={handleSubmit} id="share_story">
              <div className="mt-8">
                <div>
                  <p className="text-sm font-semibold">Headline</p>
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
                    <div id="feedback" className="text-[12px] text-red-500">
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
                  {errors.primary_message && touched.primary_message && (
                    <div id="feedback" className="text-[12px] text-red-500">
                      {errors.primary_message}
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold mb-2">Type</p>
                  <OptionSelection setOption={setOption} option={option} />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4 mt-3">
                  <div className="w-full">
                    <p className="text-sm font-semibold">Age</p>
                    <div className="mt-1">
                      <AgeSelection
                      ageOption={ageOption}
                      setAgeOption={setAgeOption}
                      />
                    

                      {errors.age && touched.age && (
                        <div
                          id="feedback"
                          className="text-[12px]  text-red-500  "
                        >
                          {errors.age}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-sm font-semibold">Gender</p>
                    <div className="mt-1">
                      <GenderSelection
                        genderOption={genderOption}
                        setGenderOption={setGenderOption}
                      />
                      {errors.gender && touched.gender && (
                        <div
                          id="feedback"
                          className="text-[12px]  text-red-500  "
                        >
                          {errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold">
                    Upload picture (optional)
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
                          src={filepath}
                          alt=""
                          width={100}
                          height={50}
                          className=" hover:cursor-pointer rounded-full "
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
              </div>
              <div className="my-4 text-right">
                <Button type="submit">
                  {isEditing==="true" ? 
                  ( isLoadingUpdate ? (
                    <div className="flex gap-x-2 justify-center">
                      <Loader /> <p> Loading...</p>
                    </div>
                  ) : (
                    " Post the Story"
                  ))
                  : ( isLoading ? (
                    <div className="flex gap-x-2 justify-center">
                      <Loader /> <p> Loading...</p>
                    </div>
                  ) : (
                    " Post the Story"
                  ))}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

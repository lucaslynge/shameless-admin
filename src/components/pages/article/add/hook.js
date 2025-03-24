import {
  useCreateArticleMutation,
  useLazyGetBySlugArticleQuery,
  useUpdateArticleMutation,
} from "@/lib/services/articleApi";
import { yup } from "@/lib/utils/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import slugify from "slugify";
import placeholderImg from "@/public/assest/placeholder_img.png";
import { generateSlug } from "@/lib/utils/helper";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  headline: yup.string().required("headline is required"),
  slug: yup
    .string()
    .required("Slug is required")
    .test("is-slug", "Slug is not valid", function (value) {
      const { title } = this.parent;
      const slug = slugify(title || value || "", { lower: true, strict: true });
      return value === slug;
    }),
  status: yup.string().required("status is required"),
  readTime: yup.string().required("readTime is required"),
  publishDate: yup.string().required("publishdate is required"),
  writtenBy: yup.string().optional(),
});

export const useAddArticle = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const isEditing = router.query.isediting === "true";
  const [file, setFile] = useState(null);
  const [getSlugArticle, { data }] = useLazyGetBySlugArticleQuery();
  const [CreateArticle, { isLoading }] = useCreateArticleMutation();
  const [UpdateArticle, { isLoading: isLoadingUpdate }] =
    useUpdateArticleMutation();
  const [filepath, setfilepath] = useState("");
  const [verifiedByFile, setVerifiedByFile] = useState(null);
  const [verifiedByFilePath, setVerifiedByFilePath] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (!file) return;

    setFile(file);

    reader.readAsDataURL(file);
    reader.onload = function () {
      setfilepath(reader?.result);
    };
  };

  const handleAddVerifiedByImage = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (!file) return;

    setVerifiedByFile(file);

    reader.readAsDataURL(file);
    reader.onload = function () {
      setVerifiedByFilePath(reader?.result);
    };
  };

  const getInitialValues = () => ({
    headline: isEditing ? data?.headline : "",
    primary_message: isEditing ? data?.primary_message : "",
    type: isEditing ? data?.type : "",
    age: isEditing ? data?.age?.toString() : 18,
    gender: isEditing ? data?.gender : "Male",
    user_id: isEditing ? data?.user_id?._id : "",
    STI_status: isEditing ? data?.STI_status : "",
    image: isEditing ? data?.image : "",
    readTime: isEditing ? data?.readTime : "",
    status: isEditing ? data?.status : "",
    publishDate: isEditing ? data?.publishDate : "",
    slug: isEditing ? data?.slug : "",
    featuring_text: isEditing ? data?.featuring_text : "",
    front_page: isEditing ? data?.front_page : false,
    medicallyReviewedDate: isEditing ? data?.medicallyReviewedDate : "",
    writtenBy: isEditing ? data?.writtenBy : "",
    tags: isEditing ? data?.tags : [],
    question_answers: defaultQandA,
    details:
      isEditing && data?.details
        ? data?.details.map((detail) => {
            return {
              ...detail,
              iconPreview: detail.icon,
            };
          })
        : [],
    verifiedBy:
      isEditing && data?.verifiedBy?.name !== "undefined"
        ? data?.verifiedBy?.name
        : "",
    isVerified: isEditing ? data?.isVerified ?? false : false,
    verificationSources:
      isEditing && data?.verificationSources?.length
        ? data?.verificationSources
        : [{ label: "", url: "" }],
    content: isEditing && data?.content ? data.content : "",
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    let data = {
      ...values,
      image: file,
      verifiedByImage: verifiedByFile,
    };
    const formdata = new FormData();

    formdata.append("headline", data.headline);
    formdata.append("primary_message", data.primary_message);
    formdata.append("content", data.content);
    formdata.append("type", data.type);
    formdata.append("age", data.age ? data.age : "");
    formdata.append("gender", data.gender);
    formdata.append("STI_status", data.STI_status);
    formdata.append("publishDate", data.publishDate);
    formdata.append("medicallyReviewedDate", data.medicallyReviewedDate);
    formdata.append("readTime", data.readTime);
    formdata.append("image", data.image);
    formdata.append("status", data.status);
    formdata.append("featuring_text", data.featuring_text);
    formdata.append("front_page", data.front_page);
    formdata.append("tags", JSON.stringify(data.tags));
    formdata.append(
      "question_answers",
      JSON.stringify(values.question_answers)
    );
    formdata.append("writtenBy", data.writtenBy);
    formdata.append("verifiedByImage", data.verifiedByImage);
    formdata.append("verifiedBy", data.verifiedBy);
    formdata.append("isVerified", data.isVerified);
    formdata.append(
      "verificationSources",
      data?.verificationSources?.length
        ? JSON.stringify(data.verificationSources)
        : "[]"
    );

    const slugfiy = generateSlug(data.slug);
    formdata.append("slug", slugfiy);
    const filteredetails = values.details.map((detail) => ({
      icon: detail.icon,
      title: detail.title,
      description: detail.description,
      keywords: detail.keywords,
    }));
    formdata.append("details", JSON.stringify(filteredetails));

    if (isEditing) {
      try {
        const response = await UpdateArticle({
          id: slug,
          body: formdata,
        }).unwrap();

        if (response.success) {
          getSlugArticle(slug);
          resetForm();
          toast.success(response.message);
          setFile("");
          setfilepath("");
          router.push("/app/articles");
        } else {
          toast.error(response.message, { theme: "colored" });
        }
      } catch (error) {
        toast.error(error.data.message, { theme: "colored" });
      } finally {
        setSubmitting(false);
      }

      return;
    }

    try {
      const response = await CreateArticle(formdata).unwrap();
      if (response.success) {
        toast.success(response.message);
        router.push("/app/articles");
      } else {
        toast.error(response.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setSubmitting(false);
      setFile("");
      resetForm();
      setfilepath("");
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("fileInput");

    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    if (isEditing === "true") {
      setfilepath(data?.image ? data?.image : placeholderImg);
      setVerifiedByFilePath(
        data?.verifiedBy?.image ? data?.verifiedBy?.image : placeholderImg
      );
    }
  }, [data]);

  useEffect(() => {
    if (slug) {
      getSlugArticle(slug);
    }
  }, [slug]);

  return {
    getInitialValues,
    handleFormSubmit,
    handleFileClick,
    isCreatingArticle: isLoading,
    isUpdatingArticle: isLoadingUpdate,
    handleFileChange,
    validationSchema,
    data,
    filepath,
    isEditing,
    handleAddVerifiedByImage,
    verifiedByFilePath,
  };
};

const defaultQandA = [
  {
    question: "How has your STI diagnosis impacted your daily life?",
    answer: "",
  },
  {
    question: "What have been the biggest challenges you've faced?",
    answer: "",
  },
  {
    question: "How do you manage your STI, both physically and emotionally?",
    answer: "",
  },
  {
    question: "What advice would you give to someone newly diagnosed?",
    answer: "",
  },
  {
    question: "What misconceptions about STIs would you like to correct?",
    answer: "",
  },
  {
    question: "What are your goals moving forward in managing your STI?",
    answer: "",
  },
];

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useFormik } from "formik";
import Loader from "../../../loader";
import Input from "../../../form-input";
import TextAreaInput from "@/components/form-textarea-input";
import * as Yup from "yup";
import { useUpdateDoctorMutation } from "@/lib/services/doctorsApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctor } from "@/lib/features/doctorsSlice";
import { ReactTags } from "react-tag-autocomplete";
import { selectArticles } from "@/lib/features/articlesSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
});

export const EditDoctorDialog = ({ isOpen, handleCloseEditDoctor, doctor }) => {
  const { picks } = useSelector(selectArticles);
  const dispatch = useDispatch();
  const [updateDoctorMutation, { isLoading }] = useUpdateDoctorMutation();
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      email: doctor?.email || "",
      name: doctor?.name || "",
      bio: doctor?.bio || "",
      avatar: doctor?.avatar || "",
      video: doctor?.video || {
        link: "",
        headline: "",
        description: "",
      },
      education: doctor?.education || [""],
      socialLinks: {
        linkedin: doctor?.socialLinks?.linkedin || "",
        facebook: doctor?.socialLinks?.facebook || "",
      },
      picks: doctor?.picks || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      if (isLoading) return;

      try {
        const { response, message } = await updateDoctorMutation({
          id: doctor._id,
          body: values,
        }).unwrap();

        dispatch(updateDoctor(response));
        resetForm();
        toast.success(message);
        handleCloseEditDoctor();
      } catch (error) {
        toast.error("Something went wrong. Please try again later");
      }
    },
    enableReinitialize: true,
  });

  const handleAddEducation = () => {
    setFieldValue("education", [...values.education, ""]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = values.education.filter((_, i) => i !== index);
    setFieldValue("education", newEducation);
  };

  const getSuggestions = () => {
    return picks.map((article) => ({
      value: article._id,
      label: article.headline,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseEditDoctor}>
      <DialogContent className="max-h-screen overflow-y-scroll max-w-2xl with-react-tags">
        <DialogTitle>Edit Doctor</DialogTitle>
        <form onSubmit={handleSubmit} className="py-2">
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Email address *
            </label>
            <Input
              field={{
                name: "email",
                onChange: handleChange,
                value: values.email,
              }}
              placeholder="your@email.com"
            />
            {errors.email && (
              <div className="text-[12px] text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Name</label>
            <Input
              field={{
                name: "name",
                onChange: handleChange,
                value: values.name,
              }}
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <TextAreaInput
              field={{ name: "bio", onChange: handleChange, value: values.bio }}
              placeholder="Doe's Bio"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Avatar Link
            </label>
            <Input
              field={{
                name: "avatar",
                onChange: handleChange,
                value: values.avatar,
              }}
              placeholder="avatar.com"
            />
          </div>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">
              Featured Video
            </legend>
            <div className="mb-4">
              <label className="text-sm font-semibold block mb-1">Link</label>
              <Input
                field={{
                  name: "video.link",
                  onChange: handleChange,
                  value: values.video.link,
                }}
                placeholder="video.com"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold block mb-1">
                Headline
              </label>
              <Input
                field={{
                  name: "video.headline",
                  onChange: handleChange,
                  value: values.video.headline,
                }}
                placeholder="Video headline"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold block mb-1">
                Description
              </label>
              <TextAreaInput
                field={{
                  name: "video.description",
                  onChange: handleChange,
                  value: values.video.description,
                }}
                placeholder="Doe's description"
              />
            </div>
          </fieldset>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">Education</legend>
            {values.education.map((edu, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <Input
                  field={{
                    name: `education[${index}]`,
                    onChange: handleChange,
                    value: edu,
                  }}
                  placeholder={`Education ${index}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  disabled={values.education.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEducation}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Education
            </button>
          </fieldset>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">Social Links</legend>
            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">LinkedIn</label>
              <Input
                field={{
                  name: "socialLinks.linkedin",
                  onChange: handleChange,
                  value: values.socialLinks.linkedin,
                }}
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">Facebook</label>
              <Input
                field={{
                  name: "socialLinks.facebook",
                  onChange: handleChange,
                  value: values.socialLinks.facebook,
                }}
                placeholder="facebook.com/username"
              />
            </div>
          </fieldset>
          <div className="mb-4">
            <label htmlFor="tags" className="text-sm font-semibold">
              Article picks
              <span className="ml-1 text-xs font-normal">(limited to 3)</span>
            </label>
            <ReactTags
              labelText="Add articles"
              selected={values.picks}
              suggestions={getSuggestions()}
              onAdd={(tag) => {
                if (values.picks.length >= 3) return;

                setFieldValue("picks", values.picks.concat(tag));
              }}
              onDelete={(tagIndex) => {
                setFieldValue(
                  "picks",
                  values.picks.filter((tag, index) => index !== tagIndex)
                );
              }}
              noOptionsText="No matching article"
              placeholderText="Add an article"
            />
          </div>
          <button
            type="submit"
            className="mx-auto px-10 text-base text-center font-semibold bg-[#00132F] rounded-md text-white py-3 mt-4"
          >
            {isLoading ? (
              <div className="text-center flex gap-2 justify-center mx-auto">
                <Loader color="#00132f" /> <span>Loading...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

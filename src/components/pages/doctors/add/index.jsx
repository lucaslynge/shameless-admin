import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import Loader from "../../../loader";
import Input from "../../../form-input";
import TextAreaInput from "@/components/form-textarea-input";

export const AddDoctorDialog = ({ isOpen, handleCloseAddDoctor }) => {
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      email: "",
      name: "",
      avatar: "",
      education: [""],
      socialLinks: {
        linkedin: "",
        facebook: "",
      },
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleAddEducation = () => {
    setFieldValue("education", [...values.education, ""]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = values.education.filter((_, i) => i !== index);
    console.log(newEducation);
    setFieldValue("education", newEducation);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleCloseAddDoctor}
      className="testing"
    >
      <DialogContent className="max-h-screen overflow-y-scroll">
        <div className="max-h-0 overflow-hidden">
          <DialogTitle>Create doctor</DialogTitle>
        </div>
        <form onSubmit={handleSubmit} className="py-2">
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Email address
            </label>
            <Input
              field={{
                name: "email",
                onChange: handleChange,
              }}
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Name</label>
            <Input
              field={{
                name: "name",
                onChange: handleChange,
              }}
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <TextAreaInput
              field={{
                name: "bio",
                onChange: handleChange,
              }}
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
              }}
              placeholder="avatar.com"
            />
          </div>
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
                  disabled={values.education.length === 1} // Prevent removing last item
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
                }}
                placeholder="facebook.com/username"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className=" mx-auto px-10 text-base text-center font-semibold bg-[#00132F] rounded-md text-white py-3 mt-4"
          >
            {false ? (
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

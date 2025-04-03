import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFormik } from "formik";
import Loader from "../../../loader";
import Input from "../../../form-input";
import TextAreaInput from "@/components/form-textarea-input";

export const AddAuthorDialog = ({ isOpen, handleCloseAddAuthor }) => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      name: "",
      avatar: "",
      education: [""]
    },
    onSubmit: async (values) => {},
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAddAuthor}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="py-2">
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Email address
            </label>
            <Input
              field={{
                name: "email",
              }}
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Name
            </label>
            <Input
              field={{
                name: "name",
              }}
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <TextAreaInput
              field={{
                name: "bio",
              }}
              placeholder="Doe's Bio"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Avatar Link
            </label>
            <Input
              field={{
                name: "avatar",
              }}
              placeholder="avatar.com"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">
              Education
            </label>
            {}
            <Input
              field={{
                name: "avatar",
              }}
              placeholder="avatar.com"
              onChange={handleChange}
            />
          </div>
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

import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Input from "../form-input";
import { useCreateUserMutation } from "@/lib/services/userApi";
import { Slide, toast } from "react-toastify";
import Loader from "../loader";
export default function AddArticel({ isOpen, setIsOpen }) {
  const [CreateUser,{isLoading}]=useCreateUserMutation()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
      <Formik
          initialValues={{
            email: "",
            password: "",
            expression:""
          }}
          onSubmit={async (
            values,
            { setSubmitting, resetForm }
          ) => {
            console.log("values",values)
            try {
              const response = await CreateUser(values).unwrap();
              toast.success(response.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored",
                transition: Slide,
                type: "success",
              });
              resetForm();
              setIsOpen(false)
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
              resetForm();

            }

          }}
        >
          {({ errors, touched, handleSubmit, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center "
            >
              <div className="w-full flex flex-col gap-y-2 gap-1">
                <label className="text-sm font-semibold">Email address</label>
                <Field
                  component={Input}
                  name="email"
                  placeholder="your@email.com"
                />
                {errors.email && touched.email && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.email}
                  </div>
                )}
                <label className="text-sm font-semibold">Password</label>
                <Field
                  component={Input}
                  type="password"
                  name="password"
                  placeholder="************"
                />
                {errors.password && touched.password && (
                  <div id="feedback" className="text-[12px]  text-red-500	">
                    {errors.password}
                  </div>
                )}
                <label className="text-sm font-semibold">2+2</label>
                <Field
                  component={Input}
                  type="number"
                  name="expression"
                  id="expression"
                />
                <ErrorMessage name="expression" component="div" />
              </div>
              <button
                type="submit"
                className=" mx-auto px-10 text-base text-center font-semibold bg-[#00132F] rounded-md text-white py-3 mt-4"
              >
                {isLoading ? (
                  <div className="text-center flex gap-2 justify-center mx-auto">
                     <Loader color="#00132f" /> <span>Loading...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

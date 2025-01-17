import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, Form, Formik } from "formik";
import Loader from "../loader";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/lib/services/userApi";
import { Slide, toast } from "react-toastify";
import Input from "../form-input";

export default function EidtUser({ customer, isOpen, setIsOpen, customerId }) {
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();
  const { refetch: refetchUser } = useGetAllUsersQuery();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Formik
          initialValues={{
            email: customer?.email,
            password: customer?.password,
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await UpdateUser({
                id: customerId,
                body: values,
              }).unwrap();
              toast.success(response.message, {
                theme: "colored",
              });
              refetchUser();
              setIsOpen(false);
            } catch (error) {
              toast.error(error.data.message, {});
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center py-2 items-center "
            >
              <div className="w-full flex flex-col gap-y-5 gap-1">
                <label className="text-sm font-semibold">Email address</label>
                <Field
                  component={Input}
                  name="email"
                  placeholder="your@email.com"
                />

                <label className="text-sm font-semibold">Password</label>
                <Field
                  component={Input}
                  type="text"
                  name="password"
                  placeholder="************"
                />
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
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

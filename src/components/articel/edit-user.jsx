import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "../ui/label";
import Loader from "../loader";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/lib/services/userApi";
import { Slide, toast } from "react-toastify";
import { Switch } from "../ui/switch";
export default function EidtUser({ customer,isOpen, setIsOpen, customerId }) {
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();
  const { refetch: refetchUser } = useGetAllUsersQuery()

  console.log("customerId", customerId);
  console.log("customer", customer);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent >
        <Formik
          initialValues={{
            is_paid: customer.is_paid,
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await UpdateUser({
                id: customerId,
                body: values,
              }).unwrap();
              toast.success(response.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored",
                transition: Slide,
                type: "success",
              });
              refetchUser()
              setIsOpen(false);
              
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
            }
          }}
        >
          {({ errors, touched, handleSubmit, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center "
            >
              <div className="w-full flex flex-col gap-y-2 gap-1">
                <div>
                  <Field name="is_paid" id="is_paid">
                    {({ field, form }) => (
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                          id="airplane-mode"
                        />
                        <Label htmlFor="airplane-mode">Is Paid</Label>
                      </div>
                    )}
                  </Field>
                </div>
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

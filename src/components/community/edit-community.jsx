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
import { useGetAllCommunityQuery, useUpdateCommunityMutation } from "@/lib/services/communityApi";
import Input from "../form-input";
export default function EidtCommunity({ community,isOpen, setIsOpen, communityId }) {
  const [UpdateCommunity, { isLoading }] = useUpdateCommunityMutation();
  const { refetch: refetchCommunity } = useGetAllCommunityQuery()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent >
        <Formik
          initialValues={{
            is_paid: community?.is_paid,
            status: community?.status,
            email:community?.email,



          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await UpdateCommunity({
                id: communityId,
                body: values,
              }).unwrap();
              toast.success(response.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "success",
              });
              refetchCommunity()
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
              className="flex flex-col py-5 gap-2 "
            >
              <div className="w-full  flex flex-col gap-y-5 ">
                <div className="flex flex-col gap-2">
                  <Label>Paid</Label>
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
                <div className="flex flex-col gap-2">
                <Label>Future mailings. </Label>

                  <Field name="status" id="status">
                    {({ field, form }) => (
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                          id="airplane-mode"
                        />
                        <Label htmlFor="airplane-mode">Active</Label>
                      </div>
                    )}
                  </Field>
                </div>
                <div>           
                <Label>Email address</Label>
                <Field
                  component={Input}
                  name="email"
                  placeholder="your@email.com"
                />
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

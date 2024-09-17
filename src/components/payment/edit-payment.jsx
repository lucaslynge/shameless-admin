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
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/lib/services/userApi";
import { Slide, toast } from "react-toastify";
import { Switch } from "../ui/switch";
import Input from "../form-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUpdatePaymentMutation } from "@/lib/services/paymentApi";
export default function EidtPayemnt({  isOpen, setIsOpen, paymentId,refetch }) {
  const [UpdatePayment, { isLoading }] = useUpdatePaymentMutation();

  return (
    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent >
        <Formik
          initialValues={{
            amount: "",
            name: "",
            subscription_type: "",
            payment_status: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await UpdatePayment({
                id: paymentId,
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
              refetch();
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
                  <label className="text-sm font-semibold">Name</label>
                  <Field component={Input} name="name" placeholder="ex jon" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Amount</label>
                  <Field component={Input} name="amount" placeholder="ex 50.00" />
                </div>
            
                <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Status</label>
                  <Field name="payment_status">
                    {({ field, form }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      >
                        <SelectTrigger className="min-w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"active"}>Active</SelectItem>
                            <SelectItem value={"inactive"}>InActive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                </div>
                <div>
                  <label className="text-sm font-semibold">Subscription Type</label>
                  <Field name="subscription_type">
                    {({ field, form }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      >
                        <SelectTrigger className="min-w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"Monthly"}>Monthly</SelectItem>
                            <SelectItem value={"Lifetime"}>Lifetime</SelectItem>

                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                </div>
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

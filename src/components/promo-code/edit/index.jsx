import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUpdatePromoCodeMutation } from "@/lib/services/promoCodeApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loader from "@/components/loader";
import { updatePromoCode } from "@/lib/features/promoCodesSlice";

export const EditPromoCodeDialog = ({
  isOpen,
  onOpenChange,
  promoCode,
  setIsOpen,
}) => {
  const [mutateUpdatePromoCode, { isLoading: isLoadingUpdate }] =
    useUpdatePromoCodeMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const body = {
        status: values.status === "Active",
      };

      const response = await mutateUpdatePromoCode({
        id: promoCode._id,
        body,
      }).unwrap();

      if (response.success) {
        toast.success("Promo Code Created Successfuly");
      }

      dispatch(updatePromoCode({ ...promoCode, status: values.status }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsOpen(true);
    }
  };

  const getInitialValues = () => {
    return {
      status: "Active",
    };
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Edit promo code</DialogTitle>
          <Formik initialValues={getInitialValues()} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center gap-5 items-center bg-white rounded-xl px-5 py-4 md:px-2 md:py-2"
              >
                <div className="grid grid-cols-1 w-full gap-4">
                  <div id="status-input w-full">
                    <Label>Status</Label>
                    <Field name="status" className="w-full">
                      {({ field, form }) => (
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        >
                          <SelectTrigger className=" py-[22px]">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={"Active"}>Active</SelectItem>
                              <SelectItem value={"InActive"}>
                                InActive
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5"
                >
                  {isLoadingUpdate ? <Loader /> : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

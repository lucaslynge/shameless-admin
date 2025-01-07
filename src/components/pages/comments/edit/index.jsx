import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateComment } from "@/lib/features/commentsSlice";
import { useEditCommentMutation } from "@/lib/services/commentsApi";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

export const EditCommentModal = ({ comment, isOpen, setIsOpen }) => {
  const [mutateEditComment, { isLoading }] = useEditCommentMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      content: comment.content,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isLoading) return;

      const response = await mutateEditComment({
        id: comment._id,
        body: values,
      }).unwrap();

      if (response.status) {
        toast.success(response.message);
        dispatch(
          updateComment({
            ...comment,
            content: values.content,
          })
        );
      } else {
        toast.error(response.message);
      }

      setIsOpen(false);
      resetForm();
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="font-semibold text-black block mb-2"
            >
              Comment *
            </label>
            <textarea
              className="block w-full resize-none border border-[#C8C8C8] rounded p-4"
              rows={5}
              id="content"
              name="content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              required
            ></textarea>
          </div>
          <Button
            className="mr-auto bg-blue-500 hover:bg-blue-400"
            type="submit"
          >
            {isLoading ? (
              <div className="text-center flex gap-2 justify-center mx-auto">
                <Loader color="#00132f" /> <span>Loading...</span>
              </div>
            ) : (
              "Edit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

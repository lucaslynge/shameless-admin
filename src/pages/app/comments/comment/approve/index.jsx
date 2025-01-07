import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateComment } from "@/lib/features/commentsSlice";
import { useApproveCommentMutation } from "@/lib/services/commentsApi";
import { tryCatchWrapper } from "@/lib/utils/tryCatchWrapper";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const ApproveCommentModal = ({ comment, isOpen, setIsOpen }) => {
  const [approveComment, { isLoading }] = useApproveCommentMutation();
  const dispatch = useDispatch();

  const handleApproveComment = async () => {
    tryCatchWrapper(async () => {
      const response = await approveComment(comment._id).unwrap();

      if (response.status) {
        toast.success("Comment approved");
        dispatch(
          updateComment({
            ...comment,
            status: "approved",
          })
        );
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve comment?</DialogTitle>
          <DialogDescription>
            This will make the comment now be visible in the shameless
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="mr-auto bg-green-500 hover:bg-green-400"
            type="button"
            onClick={handleApproveComment}
          >
            {isLoading ? (
              <div className="text-center flex gap-2 justify-center mx-auto">
                <Loader color="#00132f" /> <span>Loading...</span>
              </div>
            ) : (
              "Approve"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

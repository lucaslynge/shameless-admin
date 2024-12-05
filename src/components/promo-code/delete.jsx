import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Loader from "../loader";
import { useDeletePromoCodeMutation } from "@/lib/services/promoCodeApi";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";
import { deletePromocode } from "@/lib/features/promoCodesSlice";

export const DeletePromoCodeDialog = ({ isOpen, onOpenChange, promoCode }) => {
  const [deleteMutation, { isLoading }] = useDeletePromoCodeMutation();
  const dispatch = useDispatch();

  const handleDeletePromoCode = async () => {
    try {
      await deleteMutation(promoCode.id).unwrap();
      dispatch(deletePromocode(promoCode));
      toast.success("Successfully deleted promo code");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this promo code?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeletePromoCode}
          >
            {isLoading ? (
              <div className="text-center flex gap-2 justify-center mx-auto">
                <Loader color="#00132f" /> <span>Loading...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

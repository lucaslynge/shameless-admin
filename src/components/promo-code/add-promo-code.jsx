import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PromoForm from "./form";

export default function AddPromoCode({
  isOpen,
  setIsOpen,
  refetch,
  isedit,
  object,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>Add promo code</DialogTitle>
        <PromoForm
          setIsOpen={setIsOpen}
          isedit={isedit}
          refetch={refetch}
          promocode={object}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import Text from "../ui/text";
import Title from "../ui/title";
export default function ViewReview({ isOpen, setIsOpen,refetch,isedit,object }) {
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <Title heading={'h5'} title="Review"/>
            <p>
                {object.review}
            </p>
        </DialogContent>
      </Dialog>
    );
  }
  
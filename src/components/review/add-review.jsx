import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import ContactForm from "./form";
import WriteComment from "./write-comment";
  export default function AddReview({ isOpen, setIsOpen,refetch,isedit,object }) {
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <WriteComment setIsOpen={setIsOpen} refetchReviews={refetch} isedit={isedit} review={object}/>
        </DialogContent>
      </Dialog>
    );
  }
  
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import Text from "../ui/text";
import Title from "../ui/title";
export default function ViewReview({ isOpen, setIsOpen,refetch,isedit,object }) {
  console.log("object",object)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <Title heading={'h5'} title="Review"/>
            <p dangerouslySetInnerHTML={{ __html: object.review.replace(/\n/g, '<br />') }}></p>
            </DialogContent>
      </Dialog>
    );
  }
  
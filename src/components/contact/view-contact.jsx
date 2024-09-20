import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import Text from "../ui/text";
import Title from "../ui/title";
export default function ViewContact({ isOpen, setIsOpen,refetch,isedit,object }) {
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <Title heading={'h5'} title="Message"/>
            <p>
                {object.message}
            </p>
        </DialogContent>
      </Dialog>
    );
  }
  
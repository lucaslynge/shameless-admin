import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import Title from "../ui/title";
export default function ViewCategory({ isOpen, setIsOpen,refetch,isedit,object }) {
     return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <Title heading={'h5'} title="Description"/>
            <p>
                {object.description}
            </p>
        </DialogContent>
      </Dialog>
    );
  }
  
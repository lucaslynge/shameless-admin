import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import ContactForm from "./form";
  export default function AddContact({ isOpen, setIsOpen,refetch,isedit,object }) {  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <ContactForm setIsOpen={setIsOpen} isedit={isedit} refetch={refetch} contact={object}/>
        </DialogContent>
      </Dialog>
    );
  }
  
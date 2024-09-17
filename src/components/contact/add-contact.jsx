import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import ContactForm from "./form";
  export default function AddContact({ isOpen, setIsOpen,refetch,isedit,contact }) {
    console.log('refetch',refetch)
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <ContactForm setIsOpen={setIsOpen} isedit={isedit} refetch={refetch} contact={contact}/>
        </DialogContent>
      </Dialog>
    );
  }
  
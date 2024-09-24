import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
import CategoryForm from "./form";
  export default function AddCatgory({ isOpen, setIsOpen,refetch,isedit,object }) {  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <CategoryForm setIsOpen={setIsOpen} isedit={isedit} refetch={refetch} category={object}/>
        </DialogContent>
      </Dialog>
    );
  }
  
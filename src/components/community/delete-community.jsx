import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Loader from "../loader";
import { Slide, toast } from "react-toastify";
import { useDeleteCommunityMutation, useGetAllCommunityQuery } from "@/lib/services/communityApi";
export default function DeleteCommunity({ isOpen, setIsOpen,refetch,communityId }) {
  const [DeleteCommunity,{isLoading}]=useDeleteCommunityMutation()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
          type="button"
          variant="destructive"
          onClick={async() =>{
            try {
              const response = await DeleteCommunity(communityId).unwrap();
              toast.success(response.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "warning",
              });
              setIsOpen(false)
              refetch()
            } catch (error) {
              toast.error(error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "error",
              });
            } finally{
              refetch()
            }

          }}
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
}

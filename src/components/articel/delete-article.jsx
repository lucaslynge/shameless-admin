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
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/lib/services/userApi";
import { useDeleteArticleMutation, useGetAllArticleQuery } from "@/lib/services/articleApi";
export default function DeleteArticle({ isOpen, setIsOpen,articelId,refetch }) {
  const [DeleteArticle,{isLoading}]=useDeleteArticleMutation()
  const { refetch: refetchArticle } = useGetAllArticleQuery()

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
              const response = await DeleteArticle(articelId).unwrap();
              toast.success(response.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "warning",
              });
              refetchArticle()
              setIsOpen(false)
            } catch (error) {
              toast.error(error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "error",
              });
            } finally {
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

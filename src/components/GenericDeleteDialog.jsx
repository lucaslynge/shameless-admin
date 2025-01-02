import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Loader from "../components/loader";
import { Slide, toast } from "react-toastify";

/**
 * GenericDeleteDialog component
 * @param {Object} props - Component props.
 * @param {Boolean} props.isOpen - Controls dialog visibility.
 * @param {Function} props.setIsOpen - Function to set dialog visibility.
 * @param {Object} props.item - The entity to be deleted (e.g., user, product).
 * @param {Function} props.deleteAction - Function that triggers the delete mutation.
 * @param {Function} props.refetch - Function to refresh data after deletion.
 * @param {String} props.entityName - Name of the entity (for messages).
 */
export default function GenericDeleteDialog({
  isOpen,
  setIsOpen,
  item,
  deleteAction,
  refetch,
  entityName = "item",
}) {
  const [deleteItem, { isLoading }] = deleteAction;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this {entityName} from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              const id = item._id;
              try {
                await deleteItem(id).unwrap();
                toast.warning(`${entityName} deleted successfully.`);
                refetch();
                setIsOpen(false);
              } catch (error) {
                toast.error(
                  error?.data?.message || `Failed to delete ${entityName}.`
                );
              } finally {
                refetch();
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

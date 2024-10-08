import dateFormat from "dateformat";
import GenericTableItem from "../GenericTableItem";
import { useDeleteReviewMutation } from "@/lib/services/reviewApi";
import AddContact from "../contact/add-contact";
import AddReview from "./add-review";
import ViewReview from "./view-review";

export default function ReviewItem({ review, refetch,editComponent }) {
  const onDelete=useDeleteReviewMutation()

  const columns = [
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item._id}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    {
      value: (item) => (
        <div className=" text-sm text-muted-foreground">
          {item.name}
        </div>
      ),
    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.rating}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    
    {
      value: (item) => dateFormat(item.createdAt, "dd-mm-yyyy"),
      className: "hidden md:table-cell",
    },
  ];

  return (
    <GenericTableItem
      item={review}
      refetch={refetch}
      columns={columns}
      onDelete={onDelete}
      EditComponent={AddReview}
      ViewComponent={ViewReview}
      entityName="review"
    />
  );
}

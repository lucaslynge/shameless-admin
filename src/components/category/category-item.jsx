import dateFormat from "dateformat";
import GenericTableItem from "../GenericTableItem";
import { useDeleteContactMutation } from "@/lib/services/contactApi";
import AddCatgory from "./add-category";
import TexTruncate from "../text-truncate";
import ViewCategory from "./view-category";
import { useDeleteCategoryMutation } from "@/lib/services/categoryApi";

export default function CatgoryItem({ category, refetch }) {
  const onDelete=useDeleteCategoryMutation()
  const columns = [
    {
      value: (item) => (
        item?._id
      ),
    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.name}
        </div>
      ),
    },

     
    {
      value: (item) => dateFormat(item.createdAt, "dd-mm-yyyy"),
      className: "hidden md:table-cell",
    },
  ];

  return (
    <GenericTableItem
      item={category}
      refetch={refetch}
      columns={columns}
      onDelete={onDelete}
      EditComponent={AddCatgory}
      ViewComponent={ViewCategory}
      entityName="category"
    />
  );
}

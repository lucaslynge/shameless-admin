import dateFormat from "dateformat";
import GenericTableItem from "../GenericTableItem";
import { useDeleteContactMutation } from "@/lib/services/contactApi";
import AddContact from "./add-contact";
import TexTruncate from "../text-truncate";

export default function ContactItem({ contact, refetch }) {
  const onDelete=useDeleteContactMutation()
  console.log("contact",contact)

  const columns = [
    {
      value: (item) => (
        <TexTruncate text={item?._id}/>

      ),
    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.email}
        </div>
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
        value: (item) => (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item.status}
          </div>
        ),
      },
      {
        value: (item) => (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item.subject}
          </div>
        ),
      },
      {
        value: (item) => (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item.message}
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
      item={contact}
      refetch={refetch}
      columns={columns}
      onDelete={onDelete}
      EditComponent={AddContact}
      entityName="contact"
    />
  );
}

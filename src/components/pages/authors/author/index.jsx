import { TableCell, TableRow } from "../../../ui/table";
import { Button } from "../../../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

export const Author = ({
  author,
  handleEditAuthor,
  handleViewAuthor,
  handleDeleteAuthor,
}) => {
  return (
    <TableRow className="bg-accent">
      <TableCell>
        <div className=" text-sm text-muted-foreground md:inline">
          {author?.name}
        </div>
      </TableCell>
      <TableCell>
        <div className=" text-sm text-muted-foreground md:inline">
          {author?.email}
        </div>
      </TableCell>
      <TableCell className=" md:table-cell">
        <div className="flex gap-1">
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleViewAuthor}
          >
            <IoMdEye size={20} />
          </Button>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleEditAuthor}
          >
            <MdEdit size={20} />
          </Button>

          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={handleDeleteAuthor}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

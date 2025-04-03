import { TableCell, TableRow } from "../../../ui/table";
import { Button } from "../../../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

export const Doctor = ({
  doctor,
  handleEditDoctor,
  handleViewDoctor,
  handleDeleteDoctor,
}) => {
  return (
    <TableRow className="bg-accent">
      <TableCell>
        <div className=" text-sm text-muted-foreground md:inline">
          {doctor?.name}
        </div>
      </TableCell>
      <TableCell>
        <div className=" text-sm text-muted-foreground md:inline">
          {doctor?.email}
        </div>
      </TableCell>
      <TableCell className=" md:table-cell">
        <div className="flex gap-1">
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleViewDoctor}
          >
            <IoMdEye size={20} />
          </Button>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleEditDoctor}
          >
            <MdEdit size={20} />
          </Button>

          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={handleDeleteDoctor}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

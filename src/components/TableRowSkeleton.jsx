import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

const TableRowSkeleton = ({ rows = 4, cell = 5 }) => {
  return Array.from({ length: rows }).map((e, i) => {
    const item = Array.from({ length: cell }).map((e, i) => {
      return (
        <TableCell key={i}>
          <Skeleton className="w-[110px] h-[30px] rounded-full" />
        </TableCell>
      );
    });
    return (
      <TableRow key={i} className="bg-accent">
        {item}
      </TableRow>
    );
  });
};

export default TableRowSkeleton;

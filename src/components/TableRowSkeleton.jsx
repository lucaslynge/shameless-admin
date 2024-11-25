import { Skeleton } from "./ui/skeleton";
import { TableCell } from "./ui/table";

const TableRowSkeleton = ({ rows = 4, cell = 5 }) => {
  return Array.from({ length: rows }).map((e, rowIndex) => {
    const item = Array.from({ length: cell }).map((e, cellIndex) => {
      return (
        <TableCell key={`${rowIndex}-${cellIndex}`}>
          <Skeleton className="w-[110px] h-[30px] rounded-full" />
        </TableCell>
      );
    });

    return item;
  });
};

export default TableRowSkeleton;

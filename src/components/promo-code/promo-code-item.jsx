import TexTruncate from "../text-truncate";
import { TableCell, TableRow } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../ui/button";
import { useState } from "react";
import { DeletePromoCodeDialog } from "./delete";
import { EditPromoCodeDialog } from "./edit";

export default function PromoCodeItem({ promo }) {
  const [showDeletePromocodeDialog, setShowDeletePromocodeDialog] =
    useState(false);
  const [showEditPromocodeDialog, setShowEditPromocodeDialog] = useState(false);

  return (
    <TableRow className="bg-accent">
      <TableCell className="hidden sm:table-cell">
        <div className=" text-sm text-muted-foreground md:inline">
          {TexTruncate({ text: promo._id })}
        </div>
      </TableCell>
      <TableCell>
        <div className=" text-sm text-muted-foreground md:inline">
          {promo.code}
        </div>
      </TableCell>

      <TableCell className="hidden sm:table-cell">
        {promo.coupon.percent_off}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {`${new Date(promo.expires_at * 1000).toLocaleDateString("en-GB")}`}
      </TableCell>
      <TableCell className="md:table-cell ">
        {/* <Button
          variant="secondary"
          size="icon"
          onClick={() => setShowEditPromocodeDialog(true)}
        >
          <MdEdit size={20} />
        </Button> */}

        <Button
          variant="destructive"
          size="icon"
          onClick={() => setShowDeletePromocodeDialog(true)}
        >
          {<MdDelete size={20} />}
        </Button>
        <DeletePromoCodeDialog
          isOpen={showDeletePromocodeDialog}
          onOpenChange={setShowDeletePromocodeDialog}
          promoCode={promo}
        />
        <EditPromoCodeDialog
          isOpen={showEditPromocodeDialog}
          onOpenChange={setShowEditPromocodeDialog}
          promoCode={promo}
          setIsOpen={setShowEditPromocodeDialog}
        />
      </TableCell>
    </TableRow>
  );
}

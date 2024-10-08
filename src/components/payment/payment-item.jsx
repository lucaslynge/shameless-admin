import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import dateFormat, { masks } from "dateformat";
import DeletePayment from "./delete-payment";
import EidtUser from "./edit-payment";
import EidtPayemnt from "./edit-payment";
import TexTruncate from "../text-truncate";

export default function PaymentItem({ payment, refetch }) {
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);

  return (
    <TableRow className="bg-accent">
      <TableCell className="hidden xl:table-cell">
       <TexTruncate text={payment?._id}/>
      </TableCell>
      <TableCell className="hidden xl:table-cell">
       <TexTruncate text={payment?.transaction_id}/>
      </TableCell>
      <TableCell className="hidden xl:table-cell">    
           <TexTruncate text={payment?.customer_id}/>
      </TableCell>
      <TableCell>
        <div className="font-medium">{payment?.community_id?.email}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">${payment.amount}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {payment.subscription_type}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {payment.payment_status}
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {dateFormat(payment.createdAt, "dd-mm-yyyy")}
      </TableCell>
      <TableCell>
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => setIsOpenEdit(true)}
        >
          <MdEdit size={20} />
        </Button>
        <EidtPayemnt
          refetch={refetch}
          paymentId={payment._id}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
        />

        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={async () => {
            setIsOpenDelete(true);
          }}
        >
          {<MdDelete size={20} />}
        </Button>
        <DeletePayment
          refetch={refetch}
          payment={payment}
          isOpen={isOpenDelete}
          paymentId={payment._id}
          setIsOpen={setIsOpenDelete}
        />
      </TableCell>
    </TableRow>
  );
}

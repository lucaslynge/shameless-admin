import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteArticle from "./delete-article";
import { useRouter } from "next/router";
import TexTruncate from "../text-truncate";
import { dateFormated } from "@/lib/utils/helper";
import Link from "next/link";

export default function ArticelItem({ articel, refetch }) {
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);

  return (
    <TableRow className="bg-accent">
      <TableCell className="hidden xl:table-cell">
        <div className="font-medium ">{TexTruncate({ text: articel._id })}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{articel.headline}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{articel.status}</TableCell>
      <TableCell className="hidden xl:table-cell">
        {articel.type !== "medical_trial" ? articel.age : ""}
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        {articel.type !== "medical_trial" ? articel.gender : ""}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{articel.type}</TableCell>

      <TableCell className="hidden sm:table-cell">
        {dateFormated(articel.publishDate)}
      </TableCell>
      <TableCell className="">
        <Link
          className="w-10 h-10 bg-gray-200 inline-grid place-content-center rounded mr-1"
          variant={"secondary"}
          size={"icon"}
          href={`/app/articles/add-article?isediting=true&slug=${articel.slug}`}
          target="_blank"
        >
          <MdEdit size={20} />
        </Link>

        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={async () => {
            setIsOpenDelete(true);
          }}
        >
          {<MdDelete size={20} />}
        </Button>
        <DeleteArticle
          refetch={refetch}
          isOpen={isOpenDelete}
          articelId={articel._id}
          setIsOpen={setIsOpenDelete}
        />
      </TableCell>
    </TableRow>
  );
}

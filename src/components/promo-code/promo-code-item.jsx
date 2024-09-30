import dateFormat from "dateformat";
import GenericTableItem from "../GenericTableItem";
import { useDeleteContactMutation } from "@/lib/services/contactApi";
import TexTruncate from "../text-truncate";
import AddPromoCode from "./add-promo-code";
import ViewContact from "./view-contact";
import { useDeletePromoCodeMutation } from "@/lib/services/promoCodeApi";
import { dateFormated } from "@/lib/utils/helper";

export default function PromoCodeItem({ promo, refetch }) {
  const onDelete=useDeletePromoCodeMutation()


  const columns = [
    {
      value: (item) => (
        <TexTruncate text={item?.id}/>

      ),
      className: "hidden md:table-cell",

    },
    {
      value: (item) => (
        <div className=" text-sm text-muted-foreground ">
          {item.code}
        </div>
      ),
      
    },
   
    
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.coupon.percent_off}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.customer}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.coupon.duration}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    {
      value: (item) => (
        <div className="hidden text-sm text-muted-foreground md:inline">
          {item.active ? "Active":"InActive"}
          { console.log("item.status",item.status)}
        </div>
      ),
      className: "hidden md:table-cell",

    },
    {
        value: (item) => (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {dateFormated(item.expires_at)}
          </div>
        ),
        className: "hidden md:table-cell",

      },
      {
        value: (item) => (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item.product_id}
          </div>
        ),
        className: "hidden md:table-cell",

      },
     
    {
      value: (item) => dateFormat(item.coupon.created, "dd-mm-yyyy"),
      className: "hidden md:table-cell",
    },
  ];

  return (
    <GenericTableItem
      item={promo}
      refetch={refetch}
      columns={columns}
      onDelete={onDelete}
      EditComponent={AddPromoCode}
      ViewComponent={ViewContact}
      entityName="promocode"
      isshowView={false}
      isshowDelete={false}
      
    />
  );
}

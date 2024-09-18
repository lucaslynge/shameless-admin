import CustomerItem from "@/components/user/customer-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddUser from "@/components/user/add-user";
import { useGetAllUsersQuery } from "@/lib/services/userApi";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import { getToken } from "next-auth/jwt";
import { useGetAllPaymentQuery } from "@/lib/services/paymentApi";
import PaymentItem from "@/components/payment/payment-item";
import AddPayment from "@/components/payment/add-payment";
import AuthGuard from "@/components/authgaurd";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading,refetch } = useGetAllPaymentQuery({
    page:currentPage
  });

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-2">
              <CardTitle>Payment</CardTitle>
              <CardDescription>Recent Payment from your shamelessPath.</CardDescription>
            </div>
          
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Subscription Type</TableHead>
                <TableHead className="hidden sm:table-cell">Payment Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan="5" className="w-full">
                    <div className="flex justify-center mx-auto w-full text-center">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                 data?.payment?.map((payment, index) => (
                  <PaymentItem refetch={refetch} key={index} payment={payment} />
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex mt-5 justify-center">
                    <Mypaginations
                      count={data?.pageCount}
                      page={currentPage}
                      onChange={onPageChange}
                    />
                  </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}


// export async function getServerSideProps(context) {
//   const result=await getToken(context)
//   const accessToken=result?.accessToken
//   console.log("getToken",accessToken)
//   if(!accessToken){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return{
//     props:{accessToken}
//   }
  
// }
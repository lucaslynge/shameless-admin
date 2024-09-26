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
import { useState } from "react";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import { useGetAllPaymentQuery } from "@/lib/services/paymentApi";
import PaymentItem from "@/components/payment/payment-item";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import TableRowSkeleton from "@/components/TableRowSkeleton";

 function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
    
  });
  const { data, isLoading,refetch } = useGetAllPaymentQuery(filters);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page:newPage

    })
  };
  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
        <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
        
            <div className="flex flex-col gap-2">
              <CardTitle>Payment</CardTitle>
              <CardDescription>Recent Payment from your shamelessPath.</CardDescription>
            </div>
          
          </div>
          <SearchBox
            onSearch={onSearch}
            query={query}
            searchArray={["item 1", "item 2", "item 3"]}
            setQuery={(searchQuery) => {
              setQuery(searchQuery);
              setFilters({
                search: searchQuery,
              });
              if (searchQuery === "") {
                setFilters({
                  page: currentPage,
                });
              }
            }}/>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
               <TableHead className="hidden sm:table-cell">ID</TableHead>
               <TableHead>Transaction ID</TableHead>   
               <TableHead className="hidden sm:table-cell">Customer ID</TableHead>      
               <TableHead>Email</TableHead>      
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Subscription</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead >Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan="9" className="w-full">
                    {/* <div className="flex justify-center mx-auto w-full text-center">
                      <Loader />
                    </div> */}
                    <TableRowSkeleton cell={7} rows={4}/>

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

export default withAuth(Payment)

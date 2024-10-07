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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout";
import { useState,useEffect } from "react";
import Mypaginations from "@/components/my-paginations";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import TableRowSkeleton from "@/components/TableRowSkeleton";
import PromoCodeItem from "@/components/promo-code/promo-code-item";
import AddPromoCode from "@/components/promo-code/add-promo-code";
import { useGetAllPromoCodeQuery } from "@/lib/services/promoCodeApi";

function PromoCode() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();
  const [dataPromoCode,setDataPromoCode]=useState([])
  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading, refetch,isSuccess } = useGetAllPromoCodeQuery(filters);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = dataPromoCode.filter((promo) =>
        promo.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPromoCodes(filtered);
    } else {  
      setFilteredPromoCodes(dataPromoCode);
    }
  }, [query, dataPromoCode]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page:newPage

    })
  };
  
  useEffect(()=>{
    if(isSuccess){
      setDataPromoCode(data?.data)
    }
  },[isSuccess])
  return (
      <AppLayout>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
        
              <div className="flex flex-col gap-2">
                <CardTitle>Promo Code</CardTitle>
                <CardDescription>
                  Recent Promo Code from your shamelessPath.
                </CardDescription>
              </div>
              <div>
                <Button
                  onClick={() => setIsOpen(true)}
                  size={"sm"}
                  variant={"default"}
                >
                  Add New
                </Button>
                <AddPromoCode
                  isOpen={isOpen}
                  isedit={false}
                  refetch={refetch}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>
            <SearchBox
            onSearch={onSearch}
            query={query}
            placeholder="Search by code..."
            searchArray={["item 1", "item 2", "item 3"]}
            setQuery={(searchQuery) => {
              setQuery(searchQuery);

              setFilters({
                code: searchQuery,
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
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>Promo Code </TableHead>
                  {/* <TableHead className="hidden sm:table-cell">Duration</TableHead> */}
                  <TableHead className="hidden sm:table-cell">Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  
                  <TableHead className="hidden xl:table-cell">Expire Date</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan="8" className="w-full">
                    <TableRowSkeleton cell={6} rows={4}/>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPromoCodes?.map((item, index) => {
                    const updateitem={...item,_id:item.id}
                   return  <PromoCodeItem refetch={refetch} key={index} promo={updateitem} />
                  }
                  )
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

export default withAuth(PromoCode)
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
import { useState } from "react";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import AddContact from "@/components/contact/add-contact";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import { useGetAllCategoryQuery } from "@/lib/services/categoryApi";
import CatgoryItem from "@/components/category/category-item";
import AddCatgory from "@/components/category/add-category";
import TableRowSkeleton from "@/components/TableRowSkeleton";

function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading, refetch } = useGetAllCategoryQuery(filters);

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
                <CardTitle>Category</CardTitle>
                <CardDescription>
                  Recent Category from your shamelessPath.
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
                <AddCatgory
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
            placeholder="Search by name..."
            searchArray={["item 1", "item 2", "item 3"]}
            setQuery={(searchQuery) => {
              setQuery(searchQuery);
              setFilters({
                name: searchQuery,
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
                  <TableHead >Name</TableHead>
            
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan="5" className="w-full">
                      {/* <div className="flex justify-center mx-auto w-full text-center">
                        <Loader />
                      </div> */}
                    <TableRowSkeleton cell={7} rows={4}/>

                    </TableCell>
                  </TableRow>
                ) : (
                  data?.categoryData?.map((item, index) => (
                    <CatgoryItem refetch={refetch} key={index} category={item} />
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

export default withAuth(Category)
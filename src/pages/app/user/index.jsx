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
import AddUser from "@/components/user/add-user";
import { useGetAllUsersQuery } from "@/lib/services/userApi";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import TableRowSkeleton from "@/components/TableRowSkeleton";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();

  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading, refetch } = useGetAllUsersQuery(filters);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7 ">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
              <div className="flex flex-col  gap-2">
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Recent Users from your shamelessPath.
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
                <AddUser isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
            <SearchBox
              onSearch={onSearch}
              query={query}
              placeholder="Search by email..."
              searchArray={["item 1", "item 2", "item 3"]}
              setQuery={(searchQuery) => {
                setQuery(searchQuery);
                setFilters({
                  email: searchQuery,
                });
                if (searchQuery === "") {
                  setFilters({
                    page: currentPage,
                  });
                }
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan="5" className="w-full">
                    <TableRowSkeleton cell={7} />
                  </TableCell>
                </TableRow>
              ) : (
                data?.userData?.map((user, index) => (
                  <CustomerItem refetch={refetch} key={index} customer={user} />
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
export default withAuth(User);

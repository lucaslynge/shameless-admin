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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout";
import { useState } from "react";
import Mypaginations from "@/components/my-paginations";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import { useGetAllReviewsQuery } from "@/lib/services/reviewApi";
import ReviewItem from "@/components/review/review-item";
import AddReview from "@/components/review/add-review";
import TableRowSkeleton from "@/components/TableRowSkeleton";

function Review() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading, refetch } = useGetAllReviewsQuery(filters);
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  };
  console.log("review data", data);
  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
              <div className="flex flex-col gap-2">
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  Recent Reviews from your shamelessPath.
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
                <AddReview
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
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Ratting</TableHead>

                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan="5" className="w-full">
                    <TableRowSkeleton cell={7} rows={4} />
                  </TableCell>
                </TableRow>
              ) : (
                data.review?.map((item, index) => (
                  <ReviewItem refetch={refetch} key={index} review={item} />
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

export default withAuth(Review);

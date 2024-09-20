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
import { useGetAllContactsQuery } from "@/lib/services/contactApi";
import ContactItem from "@/components/contact/contact-item";
import AddContact from "@/components/contact/add-contact";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import { useGetAllReviewsQuery } from "@/lib/services/reviewApi";
import ReviewItem from "@/components/review/review-item";
import AddReview from "@/components/review/add-review";

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
  };
  console.log("review data",data)
  return (
      <AppLayout>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
          <div className="grid grid-cols-2">

            <div className="flex gap-x-4">
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
                  <TableHead className="hidden sm:table-cell">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Ratting</TableHead>
                 
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Actions
                  </TableHead>
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
                  data.review?.map((item, index) => (
                    <ReviewItem  refetch={refetch} key={index} review={item} />
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

export default withAuth(Review)
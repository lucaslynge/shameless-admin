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
import ArticelItem from "@/components/articel/articel";
import { useGetAllArticleQuery } from "@/lib/services/articleApi";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import TableRowSkeleton from "@/components/TableRowSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentArticlePage } from "@/lib/features/authSlice";

function Articel() {
  const router = useRouter();
  const currentPageStored = useSelector(
    (state) => state?.auth?.articles_current_page
  );
  const [currentPage, setCurrentPage] = useState(currentPageStored);
  const [_, onSearch] = useState();
  const dispatch = useDispatch();

  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading, refetch } = useGetAllArticleQuery(filters);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
    dispatch(setCurrentArticlePage(newPage));
  };

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
              <div className="flex flex-col gap-2">
                <CardTitle>Articles</CardTitle>
                <CardDescription>
                  Recent Articels from your shamelessPath.
                </CardDescription>
              </div>
              <div>
                <Button
                  onClick={() => {
                    router.push("/app/articles/add-article?isediting=false");
                  }}
                  size={"sm"}
                  variant={"default"}
                >
                  Add New
                </Button>
              </div>
            </div>
            <SearchBox
              onSearch={onSearch}
              query={query}
              placeholder="Search by articles..."
              searchArray={["item 1", "item 2", "item 3"]}
              setQuery={(searchQuery) => {
                setQuery(searchQuery);
                setFilters({
                  headline: searchQuery,
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
                <TableHead className="hidden xl:table-cell">ID</TableHead>
                <TableHead className="md:w-[200px] sm:w-[100px] w-[150px] ">
                  Headline
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden xl:table-cell">Age</TableHead>
                <TableHead className="hidden xl:table-cell">Gender</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableRowSkeleton cell={5} rows={4} />
                </TableRow>
              ) : (
                data?.artical?.map((articel, index) => (
                  <ArticelItem
                    refetch={refetch}
                    key={index}
                    articel={articel}
                  />
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

export default withAuth(Articel);

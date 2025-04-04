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
import { useDispatch } from "react-redux";
import { setCurrentArticlePage } from "@/lib/features/authSlice";
import { useDebounce } from "@uidotdev/usehooks";

function Articel() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
    sortBy: "most_recent",
    type: "personal_story",
  });
  const debouncedFilters = useDebounce(filters, 300);
  const { data, isLoading, refetch } = useGetAllArticleQuery(debouncedFilters);

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
                <CardTitle>Personal Stories</CardTitle>
                <CardDescription>
                  Recent Personal Stories from your shamelessPath.
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
              onSearch={() => {}}
              query={query}
              placeholder="Search by articles..."
              searchArray={["item 1", "item 2", "item 3"]}
              setQuery={(searchQuery) => {
                setQuery(searchQuery);
                const newFilters = {
                  headline: searchQuery ?? "",
                };
                if (searchQuery === "") {
                  newFilters.page = currentPage;
                }
                setFilters((prev) => ({
                  ...prev,
                  ...newFilters,
                }));
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

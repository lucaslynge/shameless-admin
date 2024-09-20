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
import ArticelItem from "@/components/articel/articel";
import { useGetAllArticleQuery } from "@/lib/services/articleApi";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";

 function Articel() {
  const router=useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [search, onSearch] = useState();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: currentPage,
  });
  const { data, isLoading,refetch } = useGetAllArticleQuery(filters);

  console.log("data",data)

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
        <div className="grid grid-cols-2">

          <div className="flex gap-x-4">
            <div className="flex flex-col gap-2">
              <CardTitle>Articles</CardTitle>
              <CardDescription>Recent Articels from your shamelessPath.</CardDescription>
            </div>
            <div>
              <Button
                onClick={() => {
                    router.push('/app/articles/add-article?isediting=false')
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
                <TableHead>ID</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead >Age</TableHead>
                <TableHead >Gender</TableHead>
                <TableHead >Type</TableHead>
                <TableHead >Date</TableHead>
                <TableHead >Actions</TableHead>
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
                data?.artical?.map((articel, index) => (
                  <ArticelItem refetch={refetch} key={index} articel={articel} />
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

export default withAuth(Articel)


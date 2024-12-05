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
import { useState, useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import TableRowSkeleton from "@/components/TableRowSkeleton";
import PromoCodeItem from "@/components/promo-code/promo-code-item";
import AddPromoCode from "@/components/promo-code/add-promo-code";
import { useGetAllPromoCodeQuery } from "@/lib/services/promoCodeApi";
import { useSelector } from "react-redux";

function PromoCode() {
  const { promoCodes } = useSelector((store) => store.promoCodes);
  const [isOpen, setIsOpen] = useState(false);
  const [_, onSearch] = useState();
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState({
    page: 1,
  });
  const { isLoading, refetch } = useGetAllPromoCodeQuery(filters);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState([]);

  const renderPromoCodes = () => {
    const mappedPromoCodes = filteredPromoCodes?.map((item) => {
      const updateitem = { ...item, _id: item.id };

      return <PromoCodeItem key={updateitem._id} promo={updateitem} />;
    });

    return mappedPromoCodes;
  };

  useEffect(() => {
    if (query) {
      const filtered = promoCodes.filter((promo) =>
        promo.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPromoCodes(filtered);
    } else {
      setFilteredPromoCodes(promoCodes);
    }
  }, [query, promoCodes]);

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
                    page: 1,
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
                <TableHead>Promo Code </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Percent Off
                </TableHead>
                <TableHead className="hidden xl:table-cell">
                  Expire Date
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableRowSkeleton cell={6} rows={4} />
                </TableRow>
              ) : (
                renderPromoCodes()
              )}
            </TableBody>
          </Table>
          <div className="flex mt-5 justify-center">
            <Button
              variant="outlined"
              onClick={() => {
                setFilters({
                  ending_before: filteredPromoCodes[0]?.id,
                  page: 1,
                });
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                setFilters({
                  starting_after: filteredPromoCodes[9]?.id,
                  page: 1,
                });
              }}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default withAuth(PromoCode);

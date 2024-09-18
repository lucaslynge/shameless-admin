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
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddUser from "@/components/user/add-user";
import { useGetAllUsersQuery } from "@/lib/services/userApi";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import { useGetAllCommunityQuery } from "@/lib/services/communityApi";
import CummunityItem from "@/components/community/community-item";
import AddCommunity from "@/components/community/add-community";
import { getToken } from "next-auth/jwt";
import AuthGuard from "@/components/authgaurd";

export default function Community() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetAllCommunityQuery({
    page: currentPage,
  });

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  console.log("data", data);
  return (
    <AuthGuard>
      <AppLayout>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-2">
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Recent Community from your shamelessPath.
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
                <AddCommunity isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden sm:table-cell">IsPaid</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
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
                  data.commmunity?.map((community, index) => (
                    <CummunityItem
                      refetch={refetch}
                      key={index}
                      community={community}
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
    </AuthGuard>
  );
}



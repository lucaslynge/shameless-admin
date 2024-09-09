import CustomerItem from "@/components/user/customer-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppLayout>
     <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <div className="flex gap-x-4">
                <div className="flex flex-col gap-2">
                  <CardTitle>Articel</CardTitle>
                  <CardDescription>
                    Recent Users from your store.
                  </CardDescription>
                </div>
                <div>
                <Button onClick={()=>setIsOpen(true)} size={'sm'} variant={'default'}>
                        Add New
                      </Button>  
                      <AddUser isOpen={isOpen} setIsOpen={setIsOpen}/>

                </div>
              </div>

            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>

                    <TableHead className="hidden sm:table-cell">
                      Role
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      key
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {isLoading ? [1, 2, 3, 4, 5, 6]?.map((customer, index) =>
                    <TableRow key={index} className="bg-accent">
                      <TableCell>
                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded mb-2"></div>
                        </Skeleton>
                        <Skeleton >
                          <div className="font-medium h-3 bg-gray-300 rounded"></div>
                        </Skeleton>


                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded"></div>
                        </Skeleton>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded"></div>
                        </Skeleton>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">

                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded"></div>
                        </Skeleton>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded"></div>
                        </Skeleton>
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton >
                          <div className="font-medium h-2 bg-gray-300 rounded"></div>
                        </Skeleton>
                      </TableCell>
                    </TableRow>) : data?.map((customer, index) => <CustomerItem key={index}  customer={customer}/>)
                  } */}
                    {[
                      {
                        email:'aon094944@gmail.com',
                        role:'user',
                        api_key:'23456789',
                      }
                    ]?.map((customer, index) => <CustomerItem key={index}  customer={customer}/>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
    </AppLayout>
  );
}

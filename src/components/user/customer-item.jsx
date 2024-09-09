import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/lib/services/userApi'
import { Badge } from '../ui/badge'
import Loader from '../loader'
import EidtUser from './edit-user'
import DeleteUser from './delete-user'

export default function CustomerItem({customer}) {
    const [isOpenEdit, setIsOpenEdit] = React.useState(false)
    const [isOpenDelete, setIsOpenDelete] = React.useState(false)

    // const { refetch: refetchUser } = useGetAllUsersQuery()
    // const [DeleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation()

  return (
    <TableRow  className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.role}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.api_key}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs"
                          variant="secondary"
                        >
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-06-23
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button variant={'secondary'} size={'icon'} onClick={()=>setIsOpenEdit(true)}>
                          <MdEdit size={20} />
                        </Button>
                        <EidtUser customer={customer} isOpen={isOpenEdit} customerId={customer._id} setIsOpen={setIsOpenEdit}/>

                        <Button variant={'destructive'}  size={'icon'} onClick={async () => {
                          console.log("helooo")
                          setIsOpenDelete(true)
                          // try {
                          //   const response =await DeleteUser(customer._id).unwrap()
                          //   console.log("response",response)
                          //   if (response.status) {
                              // toast({
                              //   itemID: "email",
                              //   title: "Customer Removed",
                              //   variant: 'destructive'
                              // });
                          //     refetchUser()
                          //   }
                          // } catch (error) {
                            // toast({
                            //   itemID: "email",
                            //   title: "Server Error",
                            //   variant: "destructive",
                            // });
                          // }
                        }}>
                          {<MdDelete size={20} />}

                        </Button>
                        <DeleteUser customer={customer} isOpen={isOpenDelete} customerId={customer._id} setIsOpen={setIsOpenDelete}/>

                      </TableCell>
                    </TableRow>
  )
}

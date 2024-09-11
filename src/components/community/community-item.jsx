import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/lib/services/userApi'
import { Badge } from '../ui/badge'
import Loader from '../loader'
import EidtUser from './edit-community'
import DeleteUser from './delete-community'
import DeleteCommunity from './delete-community'
import EidtCommunity from './edit-community'

export default function CummunityItem({community}) {
    const [isOpenEdit, setIsOpenEdit] = React.useState(false)
    const [isOpenDelete, setIsOpenDelete] = React.useState(false)

  return (
    <TableRow  className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{community.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {community.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {community.is_paid ? 'Yes':'No'}
                      </TableCell>
                  
                  
                      <TableCell className="hidden md:table-cell">
                        2023-06-23 
                      </TableCell>
                      <TableCell className="hidden md:table-cell ">
                        <Button variant={'secondary'} size={'icon'} onClick={()=>setIsOpenEdit(true)}>
                          <MdEdit size={20} />
                        </Button>
                        <EidtCommunity community={community} isOpen={isOpenEdit} communityId={community._id} setIsOpen={setIsOpenEdit}/>

                        <Button variant={'destructive'}  size={'icon'} onClick={async () => {
                          setIsOpenDelete(true)
             
                        }}>
                          {<MdDelete size={20} />}

                        </Button>
                        <DeleteCommunity community={community} isOpen={isOpenDelete} communityId={community._id} setIsOpen={setIsOpenDelete}/>

                      </TableCell>
                    </TableRow>
  )
}

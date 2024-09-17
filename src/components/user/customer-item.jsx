import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { MdDelete, MdEdit } from 'react-icons/md'
import EidtUser from './edit-user'
import DeleteUser from './delete-user'
import dateFormat from 'dateformat'
import { useState } from 'react'

export default function CustomerItem({customer,refetch}) {
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

  return (
    <TableRow  className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.is_paid ? 'Yes':'No'}
                      </TableCell>
                  
                      <TableCell className="hidden sm:table-cell">
                        {customer.role}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dateFormat(customer?.createdAt,'dd-mm-yyyy')}
                        
                      </TableCell>
                      <TableCell className="hidden md:table-cell ">
                        <Button variant={'secondary'} size={'icon'} onClick={()=>setIsOpenEdit(true)}>
                          <MdEdit size={20} />
                        </Button>
                        <EidtUser customer={customer} isOpen={isOpenEdit} customerId={customer._id} setIsOpen={setIsOpenEdit}/>

                        <Button variant={'destructive'}  size={'icon'} onClick={async () => {
                          setIsOpenDelete(true)
             
                        }}>
                          {<MdDelete size={20} />}

                        </Button>
                        <DeleteUser refetch={refetch} customer={customer} isOpen={isOpenDelete} customerId={customer._id} setIsOpen={setIsOpenDelete}/>

                      </TableCell>
                    </TableRow>
  )
}

import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { MdDelete, MdEdit } from 'react-icons/md'
import DeleteArticle from './delete-article'
import { useRouter } from 'next/router'

export default function ArticelItem({articel,refetch}) {
    const [isOpenDelete, setIsOpenDelete] = React.useState(false)
    const router=useRouter()

  return (
       <TableRow  className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{articel.headline}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {articel.age}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {articel.gender}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {articel.type}
                      </TableCell>
                     
                      <TableCell className="hidden md:table-cell">
                        2023-06-23 
                      </TableCell>
                      <TableCell className="hidden md:table-cell ">
                        <Button variant={'secondary'} size={'icon'} onClick={()=>{
                               router.push(`/app/articles/add-article?isediting=true&id=${articel._id}`)

                        }}>
                          <MdEdit size={20} />
                        </Button>
                    

                        <Button variant={'destructive'}  size={'icon'} onClick={async () => {
                          setIsOpenDelete(true)
             
                        }}>
                          {<MdDelete size={20} />}

                        </Button>
                        <DeleteArticle refetch={refetch} isOpen={isOpenDelete} articelId={articel._id} setIsOpen={setIsOpenDelete}/>

                      </TableCell>
                    </TableRow>
  )
}

import { TableCell, TableRow } from './ui/table';
import { Button } from './ui/button';
import { MdDelete, MdEdit } from 'react-icons/md';
import dateFormat from 'dateformat';
import { useState } from 'react';
import GenericDeleteDialog from './GenericDeleteDialog';
import AddContact from './contact/add-contact';

/**
 * GenericTableItem component
 * @param {Object} props - Component props.
 * @param {Object} props.item - The entity (e.g., customer, product) to render.
 * @param {Function} props.onEdit - Function to handle edit action.
 * @param {Function} props.onDelete - Function to handle delete action.
 * @param {Function} props.refetch - Function to refresh data after an action.
 * @param {Array} props.columns - Array of column objects with label and accessor for the item data.
 * @param {String} props.entityName - Name of the entity being displayed (for edit/delete dialogs).
 */
export default function GenericTableItem({ item, onEdit, onDelete, refetch, columns, entityName }) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  

  return (
    <TableRow className="bg-accent">
     {/* Dynamically render each column based on the columns array */}
     {columns.map((column, index) => (
        <TableCell key={index} className={column.className || ''}>
          {column.value(item)}
        </TableCell>
      ))}
      {/* Action buttons for Edit/Delete */}
      <TableCell className="actions-cell">
        <Button variant={'secondary'} size={'icon'} onClick={() => setIsOpenEdit(true)}>
          <MdEdit size={20} />
        </Button>
        <AddContact isOpen={isOpenEdit} refetch={refetch} isedit={true}  setIsOpen={setIsOpenEdit} contact={item} />

        <Button variant={'destructive'} size={'icon'} onClick={() => setIsOpenDelete(true)}>
          <MdDelete size={20} />
        </Button>
        <GenericDeleteDialog
          isOpen={isOpenDelete}
          setIsOpen={setIsOpenDelete}
          item={item}
          deleteAction={onDelete}
          refetch={refetch}
          entityName={entityName}
        />
      </TableCell>
    </TableRow>
  );
}

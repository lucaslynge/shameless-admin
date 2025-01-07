import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import GenericDeleteDialog from "@/components/GenericDeleteDialog";
import { useState } from "react";
import { useDeleteCommentMutation } from "@/lib/services/commentsApi";
import { deleteComment } from "@/lib/features/commentsSlice";
import { useDispatch } from "react-redux";
import { ApproveCommentModal } from "../approve";
import { EditCommentModal } from "../edit";

export const Comment = ({ comment }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const onDelete = useDeleteCommentMutation();
  const [showApproveComment, setShowApproveComment] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  return (
    <>
      <li
        className="bg-[#F5F6FF] flex items-center rounded-2xl p-4 lg:px-8 mb-2 list-none"
        key={comment._id}
      >
        <div>
          <div className="mb-5 flex items-center gap-3 pr-10">
            <div className="bg-[#7480E7] rounded-full w-6 lg:w-8 h-6 lg:h-8 grid place-content-center overflow-hidden">
              <span className="capitalize text-sm lg:text-lg text-white font-bold">
                {comment.firstName[0]}
              </span>
            </div>

            <div>
              <p className="text-[#001C46] !leading-[1] text-sm lg:text-base font-semibold">
                {comment.firstName}
              </p>
              <p className="text-sm font-light">
                {formatDistanceToNow(new Date(comment.date), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <p className="text-[#001C46] font-light">{comment.content}</p>
        </div>
        <div className="flex gap-x-2 ml-auto">
          <Button
            variant="secondary"
            className="!bg-blue-500 w-9 h-9"
            size="icon"
            title="Edit comment"
            onClick={() => setShowEditComment(true)}
          >
            <MdEdit className="text-white" size={16} />
          </Button>
          <Button
            variant="secondary"
            className="!bg-green-500 w-9 h-9"
            size="icon"
            title="Approve comment"
            onClick={() => setShowApproveComment(true)}
          >
            <FaCheck className="text-white" size={16} />
          </Button>
          <Button
            variant="destructive"
            className=" w-9 h-9"
            size="icon"
            title="Delete comment"
            onClick={() => setIsOpenDelete(true)}
          >
            <MdDelete className="text-white" size={16} />
          </Button>
        </div>
      </li>
      <GenericDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        item={comment}
        deleteAction={onDelete}
        refetch={() => dispatch(deleteComment(comment))}
        entityName="comment"
      />
      <ApproveCommentModal
        comment={comment}
        isOpen={showApproveComment}
        setIsOpen={setShowApproveComment}
      />
      <EditCommentModal
        comment={comment}
        isOpen={showEditComment}
        setIsOpen={setShowEditComment}
      />
    </>
  );
};

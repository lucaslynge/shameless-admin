import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/AppLayout";
import withAuth from "@/hoc/withAuth";
import { useGetAllCommentsQuery } from "@/lib/services/commentsApi";
import { useSelector } from "react-redux";
import { selectComments } from "@/lib/features/commentsSlice";
import { Comment } from "./comment";

function Comments() {
  useGetAllCommentsQuery();

  const comments = useSelector(selectComments);
  
  const renderComments = () => {
    const combinedComments = comments
      .reduce((accu, curr) => accu.concat(curr.comments), [])
      .filter((comment) => comment.status === "pending");
    const mappedComments = combinedComments.map((comment) => (
      <Comment comment={comment} key={comment._id} />
    ));

    return mappedComments;
  };

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <div>
            <CardTitle className="mb-1">Comments</CardTitle>
            <CardDescription>
              Recent pending comments from your shamelessPath.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul>{renderComments()}</ul>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default withAuth(Comments);

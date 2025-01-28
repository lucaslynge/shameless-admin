import { AddArticleMain } from "@/components/pages/article/add";
import withAuth from "@/hoc/withAuth";
import AppLayout from "@/layouts/AppLayout";

function AddArticle() {
  return (
    <AppLayout>
      <AddArticleMain />
    </AppLayout>
  );
}
export default withAuth(AddArticle);

import ShareMain from "@/components/ShareStory/ShareMain";
import withAuth from "@/hoc/withAuth";
import AppLayout from "@/layouts/AppLayout";

 function AddArticle() {
  return (
    <AppLayout>
      <ShareMain/>
    </AppLayout>
  )
}
export default withAuth(AddArticle)

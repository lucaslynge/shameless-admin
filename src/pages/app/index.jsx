import withAuth from "@/hoc/withAuth";
import AppLayout from "@/layouts/AppLayout";

function MainApp() {
  return (
      <AppLayout></AppLayout>
  );
}
export default withAuth(MainApp)


import AuthGuard from "@/components/authgaurd";
import AppLayout from "@/layouts/AppLayout";
import { getToken } from "next-auth/jwt";

export default function MainApp() {
  return (
    <AuthGuard>
      <AppLayout></AppLayout>
    </AuthGuard>
  );
}




import AppLayout from "@/layouts/AppLayout";
import { getToken } from "next-auth/jwt";

export default function MainApp() {
  return (
    <AppLayout>

    </AppLayout>
  );
}


// export async function getServerSideProps(context) {
//   const result=await getToken(context)
//   const accessToken=result?.accessToken
//   console.log("getToken",accessToken)
//   if(!accessToken){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return{
//     props:{accessToken}
//   }
  
// }

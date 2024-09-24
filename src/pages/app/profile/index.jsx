import CustomerItem from "@/components/user/customer-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout";
import { useState } from "react";
import AddUser from "@/components/user/add-user";
import { useGetAllUsersQuery } from "@/lib/services/userApi";
import Loader from "@/components/loader";
import Mypaginations from "@/components/my-paginations";
import withAuth from "@/hoc/withAuth";
import SearchBox from "@/components/search-box";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Input from "@/components/form-input";
import FileUpload from "@/components/file-upload";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7 ">
          <div className="grid grid-cols-2">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-2">
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update Profile from your shamelessPath.
                </CardDescription>
              </div>
           
            </div>
            
          </div>
        </CardHeader>
        <CardContent>
        <Formik
          initialValues={{
            name: "",
            image:"",
            email:"",
            password:""
          }}
          onSubmit={async (
            values,
            { setSubmitting, resetForm }
          ) => {
            console.log("values",values)
        

          }}
        >
          {({ errors, touched, handleSubmit, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-10  justify-center items-center "
            >
              <div>
                <FileUpload name="image" label="Upload Profile Picture" previewKey="image"/>
              </div>
              <div>
              <div className="w-full mb-5 gap-y-2 gap-1">
                <label className="text-sm font-semibold">Name</label>
                <Field
                  component={Input}
                  name="name"
                  placeholder="Enter Your Name"
                />
             
              </div>  
              <div className="w-full mb-5 gap-y-2 gap-1">
                <label className="text-sm font-semibold">Email</label>
                <Field
                  component={Input}
                  name="email"
                  placeholder="Enter Your Email"
                />
             
              </div>
            
              <button
                type="submit"
                className=" ml-auto float-right px-10 text-base text-center font-semibold bg-[#00132F] rounded-md text-white py-3 mt-4"
              >
                {/* {isLoading ? (
                  <div className="text-center flex gap-2 justify-center mx-auto">
                     <Loader color="#00132f" /> <span>Loading...</span>
                  </div>
                ) : ( */}
                  Save
                {/* )} */}
              </button>
              </div>
            </Form>
          )}
        </Formik>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
export default withAuth(Profile);

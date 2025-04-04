import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/AppLayout";
import withAuth from "@/hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { Doctor } from "@/components/pages/doctors/doctor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddDoctorDialog } from "@/components/pages/doctors/add";
import SearchBox from "@/components/search-box";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowSkeleton from "@/components/TableRowSkeleton";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/lib/services/doctorsApi";
import { removeDoctor, selectDoctors } from "@/lib/features/doctorsSlice";
import GenericDeleteDialog from "@/components/GenericDeleteDialog";
import { ViewDoctorDialog } from "@/components/pages/doctors/view";
import { EditDoctorDialog } from "@/components/pages/doctors/edit";

function Doctors() {
  const { isLoading } = useGetAllDoctorsQuery();
  const deleteDoctor = useDeleteDoctorMutation();
  const doctors = useSelector(selectDoctors);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isViewDoctorOpen, setIsViewDoctorOpen] = useState(false);
  const [isEditDoctorOpen, setIsEditDoctorOpen] = useState(false);
  const [isDeleteDoctorOpen, setIsDeleteDoctorOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [doctorToUse, setDoctorToUse] = useState(null);
  const dispatch = useDispatch();

  const handleCloseAddDoctor = () => setIsAddDoctorOpen(false);

  const handleSetSearchEmail = (search) => setSearchEmail(search);

  const handleRemoveDoctorToUse = () => setDoctorToUse(null);

  const handleEditDoctor = (doctor) => {
    setDoctorToUse(doctor);
    setIsEditDoctorOpen(true);
  };

  const handleCloseEditDoctor = () => {
    handleRemoveDoctorToUse();
    setIsEditDoctorOpen(false);
  };

  const handleViewDoctor = (doctor) => {
    setDoctorToUse(doctor);
    setIsViewDoctorOpen(true);
  };

  const handleCloseViewDoctor = () => {
    handleRemoveDoctorToUse();
    setIsViewDoctorOpen(false);
  };

  const handleDeleteDoctor = (doctor) => {
    setDoctorToUse(doctor);
    setIsDeleteDoctorOpen(true);
  };

  const renderDoctors = () => {
    const mappedDoctors = doctors
      .filter((doctor) => {
        if (searchEmail)
          return doctor.name.toLowerCase().includes(searchEmail.toLowerCase());

        return true;
      })
      .map((doctor) => (
        <Doctor
          doctor={doctor}
          key={doctor._id}
          handleDeleteDoctor={() => handleDeleteDoctor(doctor)}
          handleViewDoctor={() => handleViewDoctor(doctor)}
          handleEditDoctor={() => handleEditDoctor(doctor)}
        />
      ));

    return mappedDoctors;
  };

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7 ">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
              <div className="flex flex-col  gap-2">
                <CardTitle>Doctors</CardTitle>
                <CardDescription>ShamelessPath doctors</CardDescription>
              </div>
              <div>
                <Button
                  onClick={() => setIsAddDoctorOpen(true)}
                  size="sm"
                  variant="default"
                >
                  Add New
                </Button>
              </div>
            </div>
            <SearchBox
              onSearch={() => {}}
              query={searchEmail}
              placeholder="Search by email..."
              searchArray={[]}
              setQuery={(search) => handleSetSearchEmail(search)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableRowSkeleton cell={3} />
                </TableRow>
              ) : (
                renderDoctors()
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddDoctorDialog
        isOpen={isAddDoctorOpen}
        handleCloseAddDoctor={handleCloseAddDoctor}
      />
      <EditDoctorDialog
        isOpen={isEditDoctorOpen}
        handleCloseEditDoctor={handleCloseEditDoctor}
        doctor={doctorToUse}
      />
      <ViewDoctorDialog
        isOpen={isViewDoctorOpen}
        handleCloseViewDoctor={handleCloseViewDoctor}
        doctor={doctorToUse}
      />
      <GenericDeleteDialog
        isOpen={isDeleteDoctorOpen}
        setIsOpen={setIsDeleteDoctorOpen}
        item={doctorToUse}
        deleteAction={deleteDoctor}
        refetch={() => dispatch(removeDoctor(doctorToUse))}
        entityName="Doctor"
      />
    </AppLayout>
  );
}

export default withAuth(Doctors);

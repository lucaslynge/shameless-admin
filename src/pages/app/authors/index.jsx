import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/AppLayout";
import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { useGetAllAuthorsQuery } from "@/lib/services/authorsApi";
import { selectAuthors } from "@/lib/features/authorsSlice";
import { Author } from "@/components/pages/authors/author";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAuthorDialog } from "@/components/pages/authors/add";
import SearchBox from "@/components/search-box";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowSkeleton from "@/components/TableRowSkeleton";

function Authors() {
  const { isLoading } = useGetAllAuthorsQuery();
  const authors = useSelector(selectAuthors);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isViewAuthorOpen, setIsViewAuthorOpen] = useState(false);
  const [isEditAuthorOpen, setIsEditAuthorOpen] = useState(false);
  const [isDeleteAuthorOpen, setIsDeleteAuthorOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [authorToUse, setAuthorToUse] = useState(null);

  const handleCloseAddAuthor = () => setIsAddAuthorOpen(false);

  const handleSetSearchEmail = (search) => setSearchEmail(search);

  const handleRemoveAuthorToUse = () => setAuthorToUse(null);

  const handleEditAuthor = (author) => {
    setAuthorToUse(author);
    setIsEditAuthorOpen(true);
  };

  const handleCloseEditAuthor = () => {
    handleRemoveAuthorToUse();
    setIsEditAuthorOpen(false);
  };

  const handleViewAuthor = (author) => {
    setAuthorToUse(author);
    setIsViewAuthorOpen(true);
  };

  const handleCloseViewAuthor = () => {
    handleRemoveAuthorToUse();
    setIsViewAuthorOpen(false);
  };

  const handleDeleteAuthor = (author) => {
    setAuthorToUse(author);
    setIsDeleteAuthorOpen(true);
  };

  const handleCloseDeleteAuthor = () => {
    handleRemoveAuthorToUse();
    setIsDeleteAuthorOpen(false);
  };

  const renderAuthors = () => {
    const mappedAuthors = authors.map((author) => (
      <Author
        author={author}
        key={author._id}
        handleDeleteAuthor={() => handleDeleteAuthor(author)}
        handleViewAuthor={() => handleViewAuthor(author)}
        handleEditAuthor={() => handleEditAuthor(author)}
      />
    ));

    return mappedAuthors;
  };

  return (
    <AppLayout>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7 ">
          <div className="grid lg:grid-cols-2 gap-2 col-span-1">
            <div className="flex  lg:justify-normal justify-between gap-x-4">
              <div className="flex flex-col  gap-2">
                <CardTitle>Authors</CardTitle>
                <CardDescription>ShamelessPath authors</CardDescription>
              </div>
              <div>
                <Button
                  onClick={() => setIsAddAuthorOpen(true)}
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
                renderAuthors()
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddAuthorDialog
        isOpen={isAddAuthorOpen}
        handleCloseAddAuthor={handleCloseAddAuthor}
      />
    </AppLayout>
  );
}

export default withAuth(Authors);

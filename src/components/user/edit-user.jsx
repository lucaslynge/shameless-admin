import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import { Label } from "../ui/label";
export default function EidtUser({ isOpen, setIsOpen,customerId }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Formik>
          <Form className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              {/* <Input type="email" id="email" placeholder="Email" /> */}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              {/* <Input type="text" id="username" placeholder="Username" /> */}
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

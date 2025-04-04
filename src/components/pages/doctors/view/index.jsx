import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export const ViewDoctorDialog = ({ isOpen, handleCloseViewDoctor, doctor }) => {
  if (!doctor) return <></>;

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseViewDoctor}>
      <DialogContent className="max-h-screen overflow-y-scroll p-6">
        <div className="flex flex-col items-center text-center mb-4">
          {doctor.avatar ? (
            <Image
              src={doctor.avatar}
              alt="Doctor Avatar"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mb-2 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
              <span className="text-gray-500">N/A</span>
            </div>
          )}
          <DialogTitle className="text-lg font-bold">
            {doctor.name || "N/A"}
          </DialogTitle>
          <p className="text-gray-500 text-sm">{doctor.email || "N/A"}</p>
        </div>
        <div className="py-2">
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <p className="text-gray-800 text-sm">{doctor.bio || "N/A"}</p>
          </div>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">Education</legend>
            {doctor.education?.length ? (
              <ul className="list-disc pl-4">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="text-gray-800 text-sm">
                    {edu}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800 text-sm">N/A</p>
            )}
          </fieldset>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">Social Links</legend>
            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">LinkedIn</label>
              {doctor.socialLinks?.linkedin ? (
                <a
                  href={doctor.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm underline"
                >
                  {doctor.socialLinks.linkedin}
                </a>
              ) : (
                <p className="text-gray-800 text-sm">N/A</p>
              )}
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">Facebook</label>
              {doctor.socialLinks?.facebook ? (
                <a
                  href={doctor.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm underline"
                >
                  {doctor.socialLinks.facebook}
                </a>
              ) : (
                <p className="text-gray-800 text-sm">N/A</p>
              )}
            </div>
          </fieldset>
        </div>
      </DialogContent>
    </Dialog>
  );
};

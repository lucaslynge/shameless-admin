import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export const ViewAuthorDialog = ({ isOpen, handleCloseViewAuthor, author }) => {
  if (!author) return <></>;

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseViewAuthor}>
      <DialogContent className="max-h-screen overflow-y-scroll p-6">
        <div className="flex flex-col items-center text-center mb-4">
          {author.avatar ? (
            <Image
              src={author.avatar}
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
            {author.name || "N/A"}
          </DialogTitle>
          <p className="text-gray-500 text-sm">{author.email || "N/A"}</p>
        </div>
        <div className="py-2">
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <p className="text-gray-800 text-sm">{author.bio || "N/A"}</p>
          </div>
          <fieldset className="mb-4 border border-gray-300 rounded-lg p-4">
            <legend className="text-sm font-semibold px-2">Education</legend>
            {author.education?.length ? (
              <ul className="list-disc pl-4">
                {author.education.map((edu, index) => (
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
              {author.socialLinks?.linkedin ? (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm underline"
                >
                  {author.socialLinks.linkedin}
                </a>
              ) : (
                <p className="text-gray-800 text-sm">N/A</p>
              )}
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">Facebook</label>
              {author.socialLinks?.facebook ? (
                <a
                  href={author.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm underline"
                >
                  {author.socialLinks.facebook}
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

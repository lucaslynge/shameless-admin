import { Field, useFormikContext } from "formik";
import Image from "next/image";

export default function FileUpload({ name, label = "Upload File", previewKey }) {
  const { values, setFieldValue } = useFormikContext();

  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the file and its preview URL in Formik values
        setFieldValue(name, file); // Store the file itself
        setFieldValue(previewKey, reader.result); // Store the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-5">
      <p className="text-lg font-bold mb-2">{label}</p>
      <div className="bg-gray-50 p-4">
        <Field name={name}>
          {() => (
            <div>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div
                className="h-40 flex flex-col justify-center items-center border border-dashed border-gray-300 rounded-md cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {values[previewKey] ? (
                  <Image
                    src={values[previewKey]} // Use the preview URL here
                    alt="File preview"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                ) : (
                  <>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.0007 19.9999V23.9999H8.00065V19.9999H5.33398V23.9999C5.33398 25.4666 6.53398 26.6666 8.00065 26.6666H24.0007C25.4673 26.6666 26.6673 25.4666 26.6673 23.9999V19.9999H24.0007ZM9.33398 11.9999L11.214 13.8799L14.6673 10.4399V21.3333H17.334V10.4399L20.7873 13.8799L22.6673 11.9999L16.0007 5.33325L9.33398 11.9999Z"
                        fill="#BEBEBE"
                      />
                    </svg>
                    <p className="text-xs text-center text-gray-500">
                      {label}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Field>
      </div>
    </div>
  );
}

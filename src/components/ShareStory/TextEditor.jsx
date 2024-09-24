import dynamic from "next/dynamic";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Quill = ({ valueText, onSetValueTextEditor }) => {
  return (
    <div className="quill-container">
      <ReactQuill
        theme="snow"
        value={valueText}
        onChange={(value) => onSetValueTextEditor(value)}
        placeholder="Enter your text here"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ align: "" }, { align: "center" }, { align: "right" }],
            ["image"],
            [{ 'header': [1, 2, 3, false] }], // Heading options: H1, H2, H3, and normal text

          ],
        }}
      />
    </div>
  );
};

export default Quill;

import React from "react";

function MultipleFileUpload({
  className,
  selectedFiles,
  handleFileChange,
  name,
}) {
  return (
    <div className="mt-2">
      <input
        name={name}
        type="file"
        multiple
        onChange={handleFileChange}
        className={
          "rounded-md " +
          className +
          "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 block w-full text-sm text-slate-500"
        }
      />
      <div>
        {selectedFiles?.length > 0 && (
          <div>
            <h3>Selected Files:</h3>
            <ul>
              {Array?.from(selectedFiles)?.map((file, index) => (
                <li key={index}>{file?.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultipleFileUpload;

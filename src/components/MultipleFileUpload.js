import React, { useState } from "react";

function MultipleFileUpload({
  className,
  selectedFiles,
  handleFileChange,
  name,
}) {
  return (
    <div>
      <input
        name={name}
        type="file"
        multiple
        onChange={handleFileChange}
        className={className}
      />
      <div>
        {selectedFiles.length > 0 && (
          <div>
            <h3>Selected Files:</h3>
            <ul>
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultipleFileUpload;

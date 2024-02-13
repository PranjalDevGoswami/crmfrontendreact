import React, { useState } from 'react';

function MultipleFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  return (
    <div>
      <h2>Multiple File Upload</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
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

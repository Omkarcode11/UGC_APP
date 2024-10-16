import React, { useState } from "react";
import classes from "./ContentUpload.module.css";
import { useNavigate } from "react-router-dom";
import closeSVG from './../../assets/close.svg'

interface ContentUploadProps {
  allowedFileTypes: string[];
}

const ContentUpload: React.FC<ContentUploadProps> = ({ allowedFileTypes }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const fileType = selectedFile.type.split("/")[0];
      if (!allowedFileTypes.includes(fileType)) {
        setErrorMessage(
          `Invalid file type. Only ${allowedFileTypes.join(", ")} are allowed.`
        );
        setFile(null);
        setFilePreview(null);
        return;
      }

      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setErrorMessage(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    // Simulate file upload process
    setTimeout(() => {
      setIsUploaded(true);
      setErrorMessage(null);
    }, 1000);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Only navigate if the user clicks on the background (container)
    if (e.target === e.currentTarget) {
      navigate("..");
    }
  };

  return (
    <div className={classes.container} onClick={handleContainerClick} >
    <div className={classes.contentUpload}>
     <img className={classes.closeSVG} src={closeSVG} onClick={()=>navigate('..')}/>
      <h2>Upload Your Content</h2>

      <div className={classes.uploadForm}>
        <input
          type="file"
          onChange={handleFileChange}
          // accept={allowedFileTypes.join(", ")}
          />
        {filePreview && (
          <div className={classes.filePreview}>
            {file?.type.startsWith("image/") ? (
              <img
              className={classes.img}
              src={filePreview}
              alt="File Preview"
              />
            ) : (
              <video className={classes.video} src={filePreview} controls />
            )}
          </div>
        )}
        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        <button className={classes.button} onClick={handleUpload}>
          Upload Content
        </button>
      </div>

      {isUploaded && (
        <p className={classes.successMessage}>Content uploaded successfully!</p>
      )}
    </div>
      </div>
  );
};

export default ContentUpload;

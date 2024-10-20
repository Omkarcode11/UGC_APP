import React, { useState } from "react";
import classes from "./ContentUpload.module.css";
import { useNavigate } from "react-router-dom";
import closeSVG from "./../../assets/close.svg";
import axios from "axios";

interface ContentUploadProps {
  allowedFileTypes: string[];
}

const ContentUpload: React.FC<ContentUploadProps> = ({ allowedFileTypes }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [upload, setUpload] = useState<string>(""); // For tracking upload progress
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const fileType = selectedFile.type.split("/")[0];
      const allowedFileTypes = ["image", "video"]; // Update this based on your allowed types

      if (!allowedFileTypes.includes(fileType)) {
        setErrorMessage(
          `Invalid file type. Only ${allowedFileTypes.join(", ")} are allowed.`
        );
        setFile(null);
        setFilePreview(null);
        return;
      }

      // Create a preview
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setErrorMessage(null);
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    // Reset progress for new upload
    setUpload("Uploading...");

    // Cloudinary Upload Logic
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Set your upload preset from Cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dulamnm2q/upload", // Use the appropriate endpoint for image/video
        formData
      );

      // Handle the response from Cloudinary
      const uploadedFileUrl = res.data.secure_url;
      console.log("File uploaded successfully: ", uploadedFileUrl);
      setIsUploaded(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Failed to upload the file. Please try again.");
    }
    setUpload("");
  };

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Only navigate if the user clicks on the background (container)
    if (e.target === e.currentTarget) {
      navigate("..");
    }
  };

  return (
    <div className={classes.container} onClick={handleContainerClick}>
      <div className={classes.contentUpload}>
        <img
          className={classes.closeSVG}
          src={closeSVG}
          onClick={() => navigate("..")}
        />
        <h2>Upload Your Content</h2>

        <div className={classes.uploadForm}>
          <input type="file" onChange={handleFileChange} />
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
          {errorMessage && (
            <p className={classes.errorMessage}>{errorMessage}</p>
          )}
          <button className={classes.button} onClick={handleUpload}>
            Upload Content
          </button>

          {/* Show progress bar if the file is uploading */}
          {upload && (
            <div className={classes.progressBarContainer}>
              <div className={classes.progressBar}></div>
              <span>{upload}</span>
            </div>
          )}
        </div>

        {isUploaded && (
          <p className={classes.successMessage}>
            Content uploaded successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentUpload;

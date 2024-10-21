import React, { useState } from "react";
import classes from "./ContentUpload.module.css";
import { useNavigate, useParams } from "react-router-dom";
import closeSVG from "./../../assets/close.svg";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

interface ContentUploadProps {
  allowedFileTypes: string[];
}

const ContentUpload: React.FC<ContentUploadProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const { id } = useParams();
  const [upload, setUpload] = useState<string>(""); // For tracking upload progress
  const [progress, setProgress] = useState<number>(0); // For actual progress bar
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const fileType = selectedFile.type.split("/")[0];
      const allowedFileTypes = ["image", "video"]; // Define allowed file types

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
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    setUpload("Uploading...");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Cloudinary upload preset

    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dulamnm2q/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setProgress(percentCompleted);
          },
        }
      );

      const uploadedFileUrl = cloudinaryResponse.data.secure_url;
      setIsUploaded(true);
      setErrorMessage(null); // Clear any previous errors
      let token = localStorage.getItem("token");

      try {
        const submissionResponse = await axios.post(
          `${BASE_URL}/api/submission/${id}`,
          { contentUrl: uploadedFileUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (submissionResponse.status === 200) {
          toast.success("Content uploaded and submission successful.");
          navigate("/dashboard/creator"); // Navigate on successful upload and submission
        } else {
          setErrorMessage("Failed to submit the uploaded content.");
          toast.error("Submission failed. Please try again.");
        }
      } catch (submissionError: any) {
        handleSubmissionError(submissionError);
      }
    } catch (uploadError) {
      handleUploadError(uploadError);
    } finally {
      setUpload(""); // Reset upload state regardless of success or failure
      URL.revokeObjectURL(filePreview!); // Clean up the preview URL after upload
    }
  };

  const handleSubmissionError = (error: any) => {
    console.error("Error during submission:", error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        // Handle 400 error response specifically
        setErrorMessage("Bad request. Please check your input and try again.");
        toast.error("Bad request. Please check your input and try again.");
      } else {
        setErrorMessage(error.response?.data || "An error occurred.");
        toast.error(error.response?.data || "Submission error.");
      }
    } else {
      setErrorMessage("Submission failed. Please try again.");
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleUploadError = (error: any) => {
    console.error("Upload failed:", error);
    if (error instanceof AxiosError && error.response?.status === 400) {
      setErrorMessage("File upload failed due to a bad request.");
      toast.error("File upload failed. Bad request.");
    } else {
      setErrorMessage("Failed to upload the file. Please try again.");
      toast.error("File upload failed. Please try again.");
    }
  };

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      navigate("/dashboard/creator");
    }
  };

  return (
    <div className={classes.container} onClick={handleContainerClick}>
      <div className={classes.contentUpload}>
        <img
          className={classes.closeSVG}
          src={closeSVG}
          alt="Close"
          onClick={() => navigate("/dashboard/creator")}
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
              <div
                className={classes.progressBar}
                style={{ width: `${progress}%` }}
              ></div>
              <span>{progress}%</span>
            </div>
          )}
        </div>

        {isUploaded && (
          <p className={classes.successMessage}>Link is Generated</p>
        )}
      </div>
    </div>
  );
};

export default ContentUpload;

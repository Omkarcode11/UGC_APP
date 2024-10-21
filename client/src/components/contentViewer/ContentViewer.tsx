import React, { useState } from "react";
import styles from "./ContentViewer.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

interface ContentViewerProps {
  contentType: "image" | "video";
  contentSrc: string;
  onApprove: () => void;
  onReject: () => void;
  name: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  id: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  contentType,
  contentSrc,
  name,
  onApprove,
  onReject,
  status,
  id,
}) => {
  const [feedback, setFeedback] = useState("");

  async function handleUpdateSubmissionStatus(status: "APPROVED" | "REJECTED") {
    try {
      debugger
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/api/submission/updateSubmission/${id}`,
        { status, feedback },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  }

  const handleApprove = () => {
    handleUpdateSubmissionStatus("APPROVED");
    onApprove();
  };

  const handleReject = () => {
    handleUpdateSubmissionStatus("REJECTED");
    onReject();
  };

  return (
    <div className={styles.viewerContainer}>
      <h2 className={styles.title}>Submission from {name}</h2>
      <div className={styles.contentContainer}>
        {contentType === "image" ? (
          <img src={contentSrc} alt="Content" className={styles.content} />
        ) : (
          <video controls className={styles.content}>
            <source src={contentSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {status === "PENDING" ? (
        <>
          <textarea
            className={styles.feedbackInput}
            placeholder="Provide feedback or revision requests here..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFeedback(e.target.value)
            }
            value={feedback}
          />
          <div className={styles.actions}>
            <button className={styles.approveButton} onClick={handleApprove}>
              Approve
            </button>
            <button className={styles.rejectButton} onClick={handleReject}>
              Reject
            </button>
          </div>
        </>
      ) : (
        <h2>Submission status is {status}</h2>
      )}
    </div>
  );
};

export default ContentViewer;

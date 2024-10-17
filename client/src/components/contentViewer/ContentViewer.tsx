import React from 'react';
import styles from './ContentViewer.module.css';

interface ContentViewerProps {
  contentType: 'image' | 'video';
  contentSrc: string;
  onApprove: () => void;
  onReject: () => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  contentType,
  contentSrc,
  onApprove,
  onReject,
}) => {
  return (
    <div className={styles.viewerContainer}>
      <h2 className={styles.title}>Submission from Alice Smith</h2>
      <div className={styles.contentContainer}>
        {contentType === 'image' ? (
          <img src={contentSrc} alt="Content" className={styles.content} />
        ) : (
          <video controls className={styles.content}>
            <source src={contentSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <textarea 
        className={styles.feedbackInput} 
        placeholder="Provide feedback or revision requests here..."
      />
      <div className={styles.actions}>
        <button className={styles.approveButton} onClick={onApprove}>Approve</button>
        <button className={styles.rejectButton} onClick={onReject}>Reject</button>
      </div>
    </div>
  );
};

export default ContentViewer;

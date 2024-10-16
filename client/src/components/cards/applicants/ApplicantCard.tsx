import styles from "./ApplicantCard.module.css";
import pendingSVG from "./../../../assets/pending.svg";
import approvedSVG from "./../../../assets/approved.svg";
import rejectSVG from "./../../../assets/reject.svg";

type Props = {
  name: string;
  status: "pending" | "approved" | "rejected";
  updateApplicantStatus: (
    name: string,
    status: "approved" | "rejected"
  ) => void;
};

// Helper function to capitalize status text
const capitalize = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

function ApplicantCard({ name, status, updateApplicantStatus }: Props) {
  let svg =
    status == "approved"
      ? approvedSVG
      : status == "pending"
      ? pendingSVG
      : rejectSVG;
  return (
    <li key={name} className={styles.applicant}>
      <div className={styles.applicantDetails}>
        <p className={styles.name}>{name}</p>
        <p
          className={`${styles.status} ${
            styles[`status${capitalize(status)}`]
          }`}
        >
          <img className={styles.image} src={svg} />
          {capitalize(status)}
        </p>
      </div>

      {status === "pending" && (
        <div className={styles.buttons}>
          <button
            className={`${styles.approve}  ${styles.button}`}
            onClick={() => updateApplicantStatus(name, "approved")}
          >
            Approve
          </button>
          <button
            className={`${styles.reject} ${styles.button}`}
            onClick={() => updateApplicantStatus(name, "rejected")}
          >
            Reject
          </button>
        </div>
      )}
    </li>
  );
}

export default ApplicantCard;

import styles from "./ApplicantCard.module.css";
import pendingSVG from "./../../../assets/pending.svg";
import approvedSVG from "./../../../assets/approved.svg";
import rejectSVG from "./../../../assets/reject.svg";

type Props = {
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  updateApplicantStatus: (
    name: string,
    status: "APPROVED" | "REJECTED",
    id: string
  ) => void;
  id: string;
};

// Helper function to capitalize status text
const capitalize = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

function ApplicantCard({ name, status, updateApplicantStatus, id }: Props) {
  let svg =
    status == "APPROVED"
      ? approvedSVG
      : status == "PENDING"
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

      {status === "PENDING" && (
        <div className={styles.buttons}>
          <button
            className={`${styles.approve}  ${styles.button}`}
            onClick={() => updateApplicantStatus(name, "APPROVED", id)}
          >
            Approve
          </button>
          <button
            className={`${styles.reject} ${styles.button}`}
            onClick={() => updateApplicantStatus(name, "REJECTED", id)}
          >
            Reject
          </button>
        </div>
      )}
    </li>
  );
}

export default ApplicantCard;

import React, { useState } from "react";
import styles from "./Applicants.module.css";
import ApplicantCard from "../cards/applicants/ApplicantCard";
import { useNavigate } from "react-router-dom";

interface Applicant {
  name: string;
  status: "pending" | "approved" | "rejected";
}

const Applicants: React.FC = () => {
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState<Applicant[]>([
    { name: "Alice Smith", status: "pending" },
    { name: "Bob Johnson", status: "approved" },
    { name: "Charlie Brown", status: "rejected" },
  ]);

  const updateApplicantStatus = (
    name: string,
    status: "approved" | "rejected"
  ) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.name === name ? { ...applicant, status } : applicant
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.applicantsContainer}>
        <div className={styles.header}>
          <h2>Fashion Shoot</h2>
          <button className={styles.management} onClick={()=>navigate('/brand/management/sdfsadf')}>Content Management</button>
        </div>
        <div className={styles.description}>
          Showcase our new summer collection in creative and engaging ways.
        </div>

        <h3>Applicants</h3>
        <ul className={styles.applicantsList}>
          {applicants.map((applicant) => (
            <ApplicantCard
              name={applicant.name}
              status={applicant.status}
              updateApplicantStatus={updateApplicantStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Applicants;

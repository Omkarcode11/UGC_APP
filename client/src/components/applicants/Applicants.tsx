import React, { useState } from "react";
import styles from "./Applicants.module.css";
import ApplicantCard from "../cards/applicants/ApplicantCard";
import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { filterApplicants } from "../../utils/dataFilteration";

interface Applicant {
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  id: string;
}

const Applicants: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as any;
  const { campaign, applicants } = filterApplicants(data);
  const [applicantsData, setApplicantsData] = useState<Applicant[]>(applicants);

  const updateApplicantStatus = async (
    name: string,
    status: "APPROVED" | "REJECTED",
    id: string
  ) => {
    try {
      // Call the API to update the application status
      let isUpdated = await updateApplicationStatus(status, id);

      if (!isUpdated) {
        throw new Error("Failed to update applicant status.");
      }

      // Update the state if status update is successful
      setApplicantsData((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.name === name ? { ...applicant, status } : applicant
        )
      );
    } catch (error) {
      // Catch any errors and show a user-friendly message
      console.error("Error updating applicant status:", error);
    }
  };

  async function updateApplicationStatus(
    status: "APPROVED" | "REJECTED",
    id: string
  ) {
    try {
      // Retrieve token from localStorage
      let token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      // Make the API call to update the application status
      let res = await axios.post(
        `${BASE_URL}/api/campaigns/updateStatus/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if the request was successful
      if (res.status === 200) {
        toast.success("Status updated successfully.");
        return true;
      } else {
        toast.error("Failed to update status.");
        return false;
      }
    } catch (err) {
      // Handle different types of errors
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      } else {
        toast.error("An unexpected error occurred.");
      }

      console.error("Error in updateApplicationStatus:", err);
      return false;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.applicantsContainer}>
        <div className={styles.header}>
          <h2>{campaign.title}</h2>
          {applicantsData.length ?
          <button
          className={styles.management}
          onClick={() => navigate(`/brand/management/${campaign.id}`)}
          >
            Content Management
          </button>
          :<></>}
        </div>
        <div className={styles.description}>{campaign.description}</div>

        <h3>Applicants</h3>
        <ul className={styles.applicantsList}>
          {applicantsData.map((applicant) => (
            <ApplicantCard
              name={applicant.name}
              status={applicant.status}
              updateApplicantStatus={updateApplicantStatus}
              id={applicant.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Applicants;

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Extract ID from URL and token from localStorage
    let id = request.url.split("/").pop();
    let token = localStorage.getItem("token");

    if (!token) {
      toast.error("Your not Login or Session is Expire")
      return redirect('/')
    }

    // Check if id and token are present
    if (!id) {
      toast.error("Invalid campaign ID");
      throw new Error("Invalid campaign ID");
    }

    if (!token) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    // Make the API request
    let res = await axios.get(`${BASE_URL}/api/campaigns/applicants/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check for response status
    if (res.status === 200) {
      return res.data;
    } else {
      toast.error("Failed to fetch campaign applicants");
      throw new Error("Failed to fetch campaign applicants");
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data:", error);
    // Show a toast error message
    toast.error("An error occurred while loading data");
    // Return an appropriate error response or empty data
    return { error: "Failed to load data" };
  }
}

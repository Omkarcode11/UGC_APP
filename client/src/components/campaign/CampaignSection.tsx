import { useEffect, useState } from "react";
import CampaignCard from "../cards/campaign/CampaignCard";
import classes from "./CampaignSection.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

type Props = {};

type Campaign = {
  title: string;
  applicationsCount: number;
  deadline: string;
};

function CampaignSection({}: Props) {
  const campaigns = useLoaderData() as Campaign[]; // Cast to Campaign[]

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <h4 className={classes.header}>Your Campaign</h4>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Campaign Title</th>
              <th>Status</th>
              <th>Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns && campaigns.length > 0 ? (
              campaigns.map((ele: Campaign) => (
                <CampaignCard
                  key={ele.title} // Ensure unique key
                  applicants={ele.applicationsCount}
                  name={ele.title}
                  status={ele.deadline}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4}>No campaigns found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignSection;

export async function loader() {
  console.log("Loader called"); // Log loader calls
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/campaigns`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return response.data.message.campaigns; // Return campaigns data directly
    }
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message); // Display server error
    } else {
      toast.error("Something went wrong. Please try again."); // Generic error message
    }
    console.error("Error during getting Campaign: ", err); // Log actual error
  }
}

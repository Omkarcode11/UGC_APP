import { Outlet } from "react-router-dom";
import AppliedCampaign from "../../../components/appliedCampaign/AppliedCampaign";
import AvailableCampaign from "../../../components/availableCampaign/AvailableCampaign";
import classes from "./Creator.module.css";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import toast from "react-hot-toast";

type Props = {};

function Creator({}: Props) {
  return (
    <div className={classes.container}>
      <h1>Creator Dashboard</h1>
      <AvailableCampaign />
      <AppliedCampaign />
      <Outlet />
    </div>
  );
}

export default Creator;

export async function loader() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token is missing.");

    const [availableCampaignsRes, appliedCampaignsRes] = await Promise.all([
      axios.get(`${BASE_URL}/api/creator/campaign/available`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${BASE_URL}/api/creator/applied`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (availableCampaignsRes.status === 200 && appliedCampaignsRes.status === 200) {
      return {
        campaign: availableCampaignsRes.data.data,
        appliedCampaigns: appliedCampaignsRes.data.data,
      };
    } else {
      throw new Error(
        `Unexpected response status: ${availableCampaignsRes.status} or ${appliedCampaignsRes.status}`
      );
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || err.message || "Server Error";
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      toast.error(`Error: ${err.message}`);
    } else {
      toast.error("An unexpected error occurred.");
    }

    // Return a default value when an error occurs
    return {
      campaign: [],
      appliedCampaigns: [],
    };
  }
}


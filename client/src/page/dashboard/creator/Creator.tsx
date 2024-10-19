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

async function loader1() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    // Make API request to fetch campaigns
    const res = await axios.get(`${BASE_URL}/api/creator/campaign/available`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if response is successful
    if (res.status === 200) {
      return res.data.data;
    }

    // Handle non-200 status code
    throw new Error(`Unexpected response status: ${res.status}`);
  } catch (err: any) {
    // Proper error handling
    if (axios.isAxiosError(err)) {
      // Axios error handling (request issues)
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      // General error handling (token missing, etc.)
      toast.error(`Error: ${err.message}`);
    } else {
      // Catch-all for unknown errors
      toast.error("An unexpected error occurred.");
    }
  }
}
async function loader2() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    // Make API request to fetch campaigns
    const res = await axios.get(`${BASE_URL}/api/creator/campaign/applied`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if response is successful
    if (res.status === 200) {
      return res.data.data;
    }

    // Handle non-200 status code
    throw new Error(`Unexpected response status: ${res.status}`);
  } catch (err: any) {
    // Proper error handling
    if (axios.isAxiosError(err)) {
      // Axios error handling (request issues)
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      // General error handling (token missing, etc.)
      toast.error(`Error: ${err.message}`);
    } else {
      // Catch-all for unknown errors
      toast.error("An unexpected error occurred.");
    }
  }
}

export async function loader() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    // Fetch data from both API endpoints in parallel
    const [availableCampaignsRes, appliedCampaignsRes] = await Promise.all([
      axios.get(`${BASE_URL}/api/creator/campaign/available`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${BASE_URL}/api/creator/applied`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Check if both responses are successful
    if (
      availableCampaignsRes.status === 200 &&
      appliedCampaignsRes.status === 200
    ) {
      return {
        campaign: availableCampaignsRes.data.data,
        appliedCampaigns: appliedCampaignsRes.data.data,
      };
    }

    // Handle non-200 status codes
    throw new Error(
      `Unexpected response status: ${availableCampaignsRes.status} or ${appliedCampaignsRes.status}`
    );
  } catch (err: any) {
    // Error handling for both API calls
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      toast.error(`Error: ${err.message}`);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
}

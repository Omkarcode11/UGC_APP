import classes from "./ApplyCampaign.module.css";
import calenderSVG from "./../../assets/calender.svg";
import correctSVG from "./../../assets/approved.svg";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
type Props = {};

type Campaign = {
  title: string;
  description: string;
  deadline: string;
  _id: string;
};

function ApplyCampaign({}: Props) {
  let navigate = useNavigate();
  let campaign = useLoaderData() as Campaign;
  let deadline = new Date(campaign.deadline);
  let actionData = useActionData()

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <header className={classes.header}>
          <h1>{campaign.title} </h1>
          <p className={classes.deadline}>
            <img className={classes.svg} src={calenderSVG} />
            Deadline: {deadline.toLocaleDateString()}
          </p>
        </header>
        <p className={classes.status}>Open</p>
        <p className={classes.info}>{campaign.description}</p>
        <h3>Requirements</h3>

        <p className={classes.task}>
          Create 3-5 photos or a 30-second video featuring our product in
          outdoor summer setting{" "}
        </p>
        <Form method="post" className={classes.form}>
          {!actionData ? (
            <textarea
              className={classes.input}
              name="application"
              placeholder="Tell us why your're a great fit for this campaign..."
              rows={5}
            />
          ) : (
            <div>
              <div className={classes.applied}>
                <img className={classes.correct} src={correctSVG} /> Your
                application has been submitted successfully!
              </div>
              <div className={classes.message}>
                Your application is currently under review.
              </div>
            </div>
          )}
          {!actionData && (
            <button type="submit" className={classes.btn}>
              Apply for Campaign
            </button>
          )}
          <button
            className={classes.btn}
            type="button"
            onClick={() => navigate("/dashboard/creator")}
          >
            Go to the Dashboard
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ApplyCampaign;

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Extract the campaign ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    let token = localStorage.getItem("token");

    // Validate that we have a valid ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid campaign ID.");
    }

    // Make the API request to get campaign details
    const res = await axios.get(
      `${BASE_URL}/api/creator/campaign/detail/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Check for a successful response
    if (res.status === 200) {
      return res.data.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (err: any) {
    // Error handling
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      toast.error(`Error: ${err.message}`);
    } else {
      toast.error("An unexpected error occurred.");
    }

    return null; // Return null if there's an error
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Extract form data
    const data = await request.formData();
    const text = data.get("application");

    // Ensure text is provided
    if (!text) {
      throw new Error("Text is required.");
    }

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    // Extract the campaign ID from the URL
    const id = request.url.split("/").pop();
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid campaign ID.");
    }

    // Make the API request
    const res = await axios.post(
      `${BASE_URL}/api/creator/${id}/apply`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Handle successful response
    if (res.status === 200) {
      toast.success(res.data.message)
      return res.data.message;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (err: any) {
    // Error handling
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`API Error: ${errorMessage}`);
    } else if (err instanceof Error) {
      toast.error(`Error: ${err.message}`);
    } else {
      toast.error("An unexpected error occurred.");
    }

    return null; // Return null if there's an error
  }
}

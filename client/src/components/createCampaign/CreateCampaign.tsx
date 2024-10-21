// CreateCampaign.tsx
import React from "react";
import { ActionFunctionArgs, Form, useNavigate } from "react-router-dom";
import classes from "./CreateCampaign.module.css";
import closeSVG from "./../../assets/close.svg";
import { validateCampaign } from "../../utils/validateCampaign";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";

import { redirect } from "react-router-dom";
import axios from "axios";

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      navigate("/dashboard/brand");
    }
  };

  return (
    <div className={classes.container} onClick={handleContainerClick}>
      <div className={classes.modal}>
        <div className={classes.modalContent}>
          <div className={classes.headers}>
            <h2>Create New Campaign</h2>
            <img
              className={classes.image}
              src={closeSVG}
              alt="Close"
              onClick={() => navigate("..")}
            />
          </div>
          <Form method="post">
            <div className={classes.formGroup}>
              <label htmlFor="title">Campaign Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className={classes.input}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className={classes.textarea}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className={classes.input}
                required
              />
            </div>
            <button type="submit" className={classes.button}>
              Create Campaign
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
// routes.js or wherever your routes are defined

export const createCampaignAction = async ({ request }: ActionFunctionArgs) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Your not Login or Session is Expire");
    return redirect("/");
  }

  const data = await request.formData();

  const obj = {
    title: data.get("title")?.toString().trim(),
    description: data.get("description")?.toString().trim(),
    deadline: data.get("deadline")?.toString().trim(),
  };

  // Validate the form data
  const isValid = validateCampaign(obj);
  // If validation fails, show an error and stop execution
  if (isValid.length) {
    toast.error(isValid); // Display a validation error
    return null; // Prevent navigation
  }

  // Get token from localStorage

  try {
    // Make API request with axios
    console.log("still here working ");
    const res = await axios.post(`${BASE_URL}/api/campaigns`, obj, {
      headers: {
        Authorization: `Bearer ${token}`, // Use token for authorization
      },
    });

    // Handle success response
    if (res.status === 200) {
      toast.success("Campaign created successfully!");
      return redirect("/dashboard/brand"); // Redirect after success
    }
  } catch (error) {
    console.error(error);
    toast.error("Error creating campaign");
  }
};

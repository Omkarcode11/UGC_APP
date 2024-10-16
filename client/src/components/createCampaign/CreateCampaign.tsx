import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CreateCampaign.module.css";
import closeSVG from './../../assets/close.svg'

const CreateCampaign: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    // Handle campaign creation logic
    console.log({ title, description, deadline });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Only navigate if the user clicks on the background (container)
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
          <img className={classes.image} src={closeSVG} onClick={()=>navigate('..')}/>
           </div>
          <div className={classes.formGroup}>
            <label htmlFor="title">Campaign Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.textarea}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={classes.input}
            />
          </div>
          <button onClick={handleCreateCampaign} className={classes.button}>
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;

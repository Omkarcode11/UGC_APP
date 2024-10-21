import { useLoaderData } from "react-router-dom";
import AppliedCampaignCard from "../cards/appliedCampaign/AppliedCampaignCard";
import classes from "./AppliedCampaign.module.css";

type Props = {};

export default function AppliedCampaign({}: Props) {
  let { appliedCampaigns } = useLoaderData() as any;
  console.log(appliedCampaigns);
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Applied Campaign</h2>

      {appliedCampaigns &&
        appliedCampaigns.map((ele: any) => (
          <AppliedCampaignCard
            status={ele.status}
            title={ele.campaignId.title}
            id={ele._id}
            key = {ele._id}
          />
        ))}
    </div>
  );
}

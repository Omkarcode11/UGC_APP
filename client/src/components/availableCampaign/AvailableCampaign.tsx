import classes from "./AvailableCampaign.module.css";
import AvailableCampaignCard from "../cards/availableCampaign/AvailableCampaignCard";
import { useLoaderData } from "react-router-dom";

type Props = {};

type Campaign = {
  title: string;
  deadline: string;
  description: string;
  _id: string;
};


function AvailableCampaign({}: Props) {
  let {campaign}  = useLoaderData() as any;
  console.log(campaign, "from creator");
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Available Campaign</h2>
      {campaign &&
        campaign?.map((campaign: Campaign) => (
          <AvailableCampaignCard
            id={campaign._id}
            date={campaign.deadline.toString()}
            key={campaign._id}
            description={campaign.description}
            title={campaign.title}
          />
        ))}
    </div>
  );
}

export default AvailableCampaign;

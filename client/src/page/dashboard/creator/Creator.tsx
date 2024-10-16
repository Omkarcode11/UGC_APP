import AvailableCampaign from "../../../components/availableCampaign/AvailableCampaign";
import classes from "./Creator.module.css";

type Props = {};

function Creator({}: Props) {
  return <div className={classes.container}>
    <h1>Creator Dashboard</h1>
    <AvailableCampaign/>
    
  </div>;
}

export default Creator;

import classes from "./AvailableCampaignCard.module.css";
import calenderSVG from "./../../../assets/calender.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  id : string,
  title: string;
  description: string;
  date: string;
};

function AvailableCampaignCard({ id,title, description, date }: Props) {
  let navigate = useNavigate();
  let deadline = new Date(date);
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.subTitle}>{description}</p>
      <p>
        <img className={classes.image} src={calenderSVG} /> Deadline :
        {deadline.toLocaleDateString()}
      </p>
      <button
        className={classes.btn}
        onClick={() => navigate("/dashboard/creator/detail/"+id)}
      >
        Apply
      </button>
    </div>
  );
}

export default AvailableCampaignCard;

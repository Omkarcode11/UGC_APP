import classes from "./AvailableCampaignCard.module.css";
import calenderSVG from "./../../../assets/calender.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  subTitle: string;
  date: string;
};

function AvailableCampaignCard({ title, subTitle, date }: Props) {
  let navigate = useNavigate()
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.subTitle}>{subTitle}</p>
      <p>
      <img className={classes.image} src={calenderSVG} /> Deadline :{date}
      </p>
      <button className={classes.btn} onClick={()=>navigate('/dashboard/creator/detail/sadf')}>Apply</button>
    </div>

  );
}

export default AvailableCampaignCard;

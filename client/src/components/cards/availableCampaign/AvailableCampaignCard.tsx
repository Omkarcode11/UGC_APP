import classes from "./AvailableCampaignCard.module.css";
import calenderSVG from "./../../../assets/calender.svg";

type Props = {
  title: string;
  subTitle: string;
  date: string;
};

function AvailableCampaignCard({ title, subTitle, date }: Props) {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.subTitle}>{subTitle}</p>
      <p>
      <img className={classes.image} src={calenderSVG} /> Deadline :{date}
      </p>
      <button className={classes.btn}>Apply</button>
    </div>

  );
}

export default AvailableCampaignCard;

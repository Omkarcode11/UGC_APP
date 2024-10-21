import classes from "./AppliedCampaignCard.module.css";
import pendingSVG from "./../../../assets/pending.svg";
import approvedSVG from "./../../../assets/approved.svg";
import rejectSVG from "./../../../assets/reject.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  id: string;
};

function AppliedCampaignCard({ title, status, id }: Props) {
  const navigate = useNavigate();
  let svg =
    status == "APPROVED"
      ? approvedSVG
      : status == "PENDING"
      ? pendingSVG
      : rejectSVG;

  return (
    <div className={classes.container}>
      <div>
        <h2>{title}</h2>
        {status == "APPROVED" && (
          <button className={classes.btn} onClick={() => navigate(`upload/${id}`)}>
            Upload Content
          </button>
        )}
      </div>
      <p className={classes.status}>
        <img className={classes.image} src={svg} /> {status}
      </p>
    </div>
  );
}

export default AppliedCampaignCard;

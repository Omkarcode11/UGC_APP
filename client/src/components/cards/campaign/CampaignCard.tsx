import { useNavigate } from "react-router-dom";
import classes from "./CampaignCard.module.css";

type Props = {
  name: string;
  applicants: number;
  status: string;
  id: string;
};

function CampaignCard({ name, applicants, status, id }: Props) {
  let navigate = useNavigate();
  
  let currentDate = new Date();
  let selectedDate = new Date(status);
  
  let state =
  currentDate.valueOf() > selectedDate.valueOf() ? "completed" : "active";
  
  let cls = state == "active" ? classes.active : classes.completed;
  return (
    <tr>
      <td>{name}</td>
      <td className={classes.status}>
        <span className={cls}>{state}</span>
      </td>
      <td>{applicants}</td>
      <td>
        <button
          className={classes.btn}
          onClick={() => navigate(`detail/${id}`)}
        >
          Manage
        </button>
      </td>
    </tr>
  );
}

export default CampaignCard;

import { useNavigate } from "react-router-dom";
import classes from "./CampaignCard.module.css";

type Props = {
  name: string;
  applicants: number;
  status: "active" | "completed";
};

function CampaignCard({ name, applicants, status }: Props) {
let navigate = useNavigate()
  let cls = status == "active" ? classes.active : classes.completed;
  

  return (
    <tr>
      <td>{name}</td>
      <td className={classes.status} ><span className={cls}>
        {status}
        </span>
        </td>
      <td>{applicants}</td>
      <td>
        <button className={classes.btn} onClick={()=>navigate('detail/sdfsdaf')} >
          Manage
        </button>
      </td>
    </tr>
  );
}

export default CampaignCard;

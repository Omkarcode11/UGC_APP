import CampaignCard from '../cards/campaign/CampaignCard';
import classes from './CampaignSection.module.css'

type Props = {};

function CampaignSection({}: Props) {
  return (
    <div className={classes.container}>
      
      <div className={classes.innerContainer}>
      <h4 className={classes.header}>Your Campaign</h4>
      <table className={classes.table}>
        <tr>
          <th>Campaign Title</th>
          <th>Status</th>
          <th>Application</th>
          <th>Action</th>
        </tr>
        <CampaignCard applicants={15} name='React.js' status='active'/>
        <CampaignCard applicants={48} name='Next.js' status='completed'/>
        <tr>
        </tr>
      </table>
      </div>
    </div>
  );
}

export default CampaignSection;

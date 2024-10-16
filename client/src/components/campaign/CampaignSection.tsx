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
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Manage</td>
        </tr>
      </table>
      </div>
    </div>
  );
}

export default CampaignSection;

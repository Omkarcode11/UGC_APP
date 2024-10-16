import classes from './AppliedCampaign.module.css'

type Props = {}

export default function AppliedCampaign({}: Props) {
  return (
    <div className={classes.container}>
        <h2 className={classes.title}>Applied Campaign</h2>
        <AppliedCampaignCard/>
    </div>
  )
}
import classes from './AvailableCampaign.module.css'
import AvailableCampaignCard from '../cards/availableCampaign/AvailableCampaignCard'

type Props = {}

function AvailableCampaign({}: Props) {
  return (
    <div className={classes.container}>
        <h2 className={classes.header}>Available Campaign</h2>
        
        <AvailableCampaignCard date='2024-11-11' subTitle='create new always join us' title='React.js' key={'title'}/>
        <AvailableCampaignCard date='2024-11-11' subTitle='create new always join us' title='React.js' key={'title'}/>
        <AvailableCampaignCard date='2024-11-11' subTitle='create new always join us' title='React.js' key={'title'}/>
        <AvailableCampaignCard date='2024-11-11' subTitle='create new always join us' title='React.js' key={'title'}/>
    </div>
  )
}

export default AvailableCampaign
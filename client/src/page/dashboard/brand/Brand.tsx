import CampaignSection from "../../../components/campaign/CampaignSection"
import classes from './Brand.module.css'
import createSVG from './../../../assets/add.svg'

type Props = {}

function Brand({}: Props) {
  return (
    <div className={classes.container}>
     <header className={classes.header}>
    <h1>Brand Dashboard</h1>
    <button className={classes.createBtn}><img className={classes.image} src={createSVG}/> Create Campaign</button>
     </header>
     <CampaignSection/>
    </div>
  )
}

export default Brand
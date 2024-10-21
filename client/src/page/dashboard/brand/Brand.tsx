import CampaignSection from "../../../components/campaign/CampaignSection"
import classes from './Brand.module.css'
import createSVG from './../../../assets/add.svg'
import { Outlet, useNavigate } from "react-router-dom"

type Props = {}

function Brand({}: Props) {
  let navigate = useNavigate()
  return (
    <>
    <div className={classes.container}>
     <header className={classes.header}>
    <h1>Brand Dashboard</h1>
    <button className={classes.createBtn} onClick={()=>navigate('create')}><img className={classes.image} src={createSVG}/> Create Campaign</button>
     </header>
    <p className={classes.logout} onClick={()=>navigate('/logout')}>Logout</p>
     <CampaignSection/>
    </div>
    <Outlet/>
    </>
  )
}

export default Brand
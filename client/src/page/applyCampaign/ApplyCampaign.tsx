import classes from './ApplyCampaign.module.css'
import calenderSVG from './../../assets/calender.svg'
import correctSVG from './../../assets/approved.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
type Props = {}

function ApplyCampaign({}: Props) {
    let navigate = useNavigate()
    let [applyStatus,setApplyStatus] = useState(true)
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
        
    <header className={classes.header}>
        <h1>Summver Collections  </h1>
        <p className={classes.deadline}><img className={classes.svg} src={calenderSVG}/>Deadline: 2024-07-31</p>
    </header>
    <p className={classes.status}>Open</p>
    <p className={classes.info}>We are looking for creative individuals to showcase oru new summer collection in unique and engaging ways </p>
    <h3>Requirements</h3>
    
    <p className={classes.task}>Create 3-5 photos or a 30-second video featuring our product in outodoo summer setting </p>
    <form className={classes.form}>
    {!applyStatus ?
    <textarea className={classes.input} placeholder="Tell us why your're a great fit for this campaign..." rows={5} />
:<div>
    <div className={classes.applied}><img className={classes.correct} src={correctSVG}/> Your application has been submitted successfully!</div>
    <div className={classes.message}>Your application is currently under review.</div>
    </div>}
    {!applyStatus &&
    <button className={classes.btn}>Apply for Campaign</button>
    }
    <button className={classes.btn} onClick={()=>navigate('/dashboard/creator')}>Go to the Dashboard</button>
    </form>
        </div>
    </div>
  )
}

export default ApplyCampaign
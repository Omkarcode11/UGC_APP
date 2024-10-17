import ContentViewer from '../../components/contentViewer/ContentViewer'
import classes from './CampaignContentManagement.module.css'

type Props = {}

function CampaignContentManagement({}: Props) {
  return (
    <div className={classes.container}>
        <h1>Campaign Management</h1>
        <ContentViewer contentSrc='https://picsum.photos/201' contentType='image' onApprove={()=>{}} onReject={()=>{}}/>
        <ContentViewer contentSrc='https://youtu.be/amjtK6nadcM?si=Gv_gpuN0Vak2WaZ0' contentType='video' onApprove={()=>{}} onReject={()=>{}}/>
    </div>
  )
}

export default CampaignContentManagement
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ContentViewer from "../../components/contentViewer/ContentViewer";
import classes from "./CampaignContentManagement.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

type Props = {};

function CampaignContentManagement({}: Props) {
  let data = useLoaderData() as any;
  let submissions = data.campaign.submissions;
   if(!data){
    return <h1>No Submission is there</h1>
   }
  return (
    <div className={classes.container}>
      <h1>Campaign Management</h1>

      {submissions.length &&
        submissions.map((ele: any) => (
          <ContentViewer
            id={ele._id}
            name={ele.applicationId.creatorId.name}
            contentSrc={ele.contentUrl}
            contentType={ele.contentUrl.includes("image") ? "image" : "video"}
            status={ele.status}
            onApprove={() => {}}
            onReject={() => {}}
          />
        ))}
    </div>
  );
}

export default CampaignContentManagement;

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Extract the ID from the request URL
    let id = request.url.split("/").pop();

    if (!id) {
      throw new Error("ID not found in the URL");
    }

    // Retrieve token from cookies (or headers, depending on your setup)
    // localStorage is client-side only and might not work in a loader function.
    // Adjust token retrieval method accordingly.
    const token = localStorage.getItem("token");

    // Make the API call with the token in Authorization headers
    let res = await axios.get(`${BASE_URL}/api/submission/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is successful
    if (res.status === 200) {
      toast.success("Success");
      return res.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (error) {
    console.error("Error loading submission:", error);
    toast.error("Failed to load submission");
    return null; // Return a fallback value or handle the error appropriately
  }
}

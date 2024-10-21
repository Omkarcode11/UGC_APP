type data = {
  _id: string;
  creatorId: {
    _id: string;
    name: string;
  };
  campaignId: {
    _id: string;
    title: string;
    description: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export function filterApplicants(data: data[]) {
  let applicants: {
    status: "PENDING" | "APPROVED" | "REJECTED";
    name: string;
    id: string;
  }[] = []; // Properly initializing as an empty array
  let campaign = {
    id: "",
    title: "",
    description: "",
  };

  // Check if data array is empty
  if (data.length === 0) {
    return { campaign, applicants };
  }

  // Check if the first item and its campaignId are defined
  if (data[0]?.campaignId) {
    campaign.id = data[0].campaignId._id || "Error Id Not Found"; //Fallback if id is missing
    campaign.title = data[0].campaignId.title || "Unknown Title"; // Fallback if title is missing
    campaign.description =
      data[0].campaignId.description || "No description provided"; // Fallback if description is missing
  }

  for (let applicant of data) {
    // Check for undefined/null applicant data
    if (applicant && applicant.creatorId) {
      let obj = {
        status: applicant.status || "Unknown Status", // Handle missing status
        name: applicant.creatorId.name || "Anonymous", // Handle missing creator name
        id: applicant._id || "Unknown ID", // Handle missing _id
      };
      applicants.push(obj);
    }
  }

  return { campaign, applicants };
}

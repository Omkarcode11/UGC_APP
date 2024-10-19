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
  let applicants = [];
  let campaign = {
    title: data[0].campaignId.title,
    description: data[0].campaignId.description,
  };

  for (let applicant of data) {
    let obj = {
      status: applicant.status,
      name: applicant.creatorId.name,
      id: applicant._id,
    };
    applicants.push(obj);
  }

  return { campaign, applicants };
}

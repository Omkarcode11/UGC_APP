export const isValidateCampaign = (campaign: {
  title: string;
  description: string;
  deadline: string;
}) => {
  if (!campaign.title || campaign.title.trim().length == 0) {
    return "Title is invalid";
  }
  if (!campaign.description || campaign.description.trim().length == 0) {
    return "Description is invalid";
  }
  if (!campaign.deadline || campaign.deadline.trim().length == 0) {
    return "Deadline is invalid";
  }

  let currentDate = new Date();
  let selectedDate = new Date(campaign.deadline);

  if (currentDate.valueOf() > selectedDate.valueOf()) {
    return "Deadline is invalid";
  }
  return "";
};

export const validateCampaign = (obj: {
  title: string | undefined;
  description: string | undefined;
  deadline: string | undefined;
}) => {
  if (!obj.title || obj.title.trim().length == 0) {
    return "Title is invalid";
  }
  if (!obj.description || obj.description.trim().length == 0) {
    return "Description is invalid";
  }
  if (!obj.deadline || obj.deadline.trim().length == 0) {
    return "Invalid Deadline";
  }
  let currentDate = new Date();
  let selectedDate = new Date(obj.deadline);

  if (currentDate.valueOf() > selectedDate.valueOf()) {
    return "Invalid Deadline";
  }

  return "";
};

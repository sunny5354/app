import axiosInstance from "./axiosInstance";


export const fetchNotificationlist = async () => {
  const result = await axiosInstance.get("/clinician/notification");
  return result.data;
}

export const readNotification = async (formID:string) => {
  const result = await axiosInstance.put("/clinician/notification/"+formID, {"activeStatus": 2});
  return result.data;
}
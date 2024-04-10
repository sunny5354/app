import axiosInstance from "../axiosInstance";




export const getBackgroundCheckInfo = async () => {
  const result = await axiosInstance.get("/clinician/background");
  return result.data;
}

export const startBackgroundCheck = async () => {
  const result = await axiosInstance.get("/clinician/background/start");
  return result.data;
}
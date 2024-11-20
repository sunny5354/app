import axiosInstance from "./axiosInstance";




export const fetchHomeServices = async () => {
  const result = await axiosInstance.get("/clinician/app/home");
  return result.data;
}


export const getStatus = async () => {
  const result = await axiosInstance.get("/user/status");
  return result.data;
}
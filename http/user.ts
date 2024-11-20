import axiosInstance from "./axiosInstance"
import axiosInstanceAuth from "./axiosInstanceAuth";



export const getProfile = async () => {
  const result = await axiosInstance.get("/clinician/profile");
  return result.data;
}

export const getBasicProfile = async () => {
  const result = await axiosInstanceAuth.get("/clinician/basic");
  return result.data;
}

export const updatePushToken = async (token: string) => {
  const result = await axiosInstanceAuth.post("/user/expopushtoken", { expoPushToken: token });
  return result.data;
}

import { WorkPrefrenceProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addWorkPrefrence = async (formValues: WorkPrefrenceProps) => {
  const result = await axiosInstance.put("/clinician/preference", formValues);
  return result.data;
}

export const getWorkPrefrence = async () => {
  const result = await axiosInstance.get("/clinician/preference");
  return result.data;
}

export const getWorkProfileDropDown = async () => {
  const result = await axiosInstance.get("/dropdown/" + "65e98815829fb11975af0854");
  return result.data;
}
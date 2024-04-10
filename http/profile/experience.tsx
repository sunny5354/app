import { ExperienceProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addExperience = async (formValues: ExperienceProps) => {
  const result = await axiosInstance.post("/clinician/experience", formValues);
  return result.data;
}
export const addTotalExperience = async (year: string, month: string) => {
  const result = await axiosInstance.put("/clinician/experience/total/update", {
    "totalExperience": {
      "year": +year,
      "month": +month
    }
  });
  return result.data;
}
export const getExperience = async () => {
  const result = await axiosInstance.get("/clinician/experience");
  return result.data;
}
export const editExperience = async (formValues: ExperienceProps, formID: string) => {
  const result = await axiosInstance.put("/clinician/experience/" + formID, formValues);
  return result.data;
}
export const deleteExperience = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/experience/" + formId);
  return result.data;
}
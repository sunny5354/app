import { CovidProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addCovid = async (formValues: CovidProps) => {
  const result = await axiosInstance.post("/clinician/covid", formValues);
  return result.data;
}
export const getCovid = async () => {
  const result = await axiosInstance.get("/clinician/covid");
  return result.data;
}
export const editCovid = async (formValues: CovidProps, formID: string) => {
  const result = await axiosInstance.put("/clinician/covid/" + formID, formValues);
  return result.data;
}
export const deleteCovid = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/covid/" + formId);
  return result.data;
}
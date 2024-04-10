import { LicenseProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addLicense = async (formValues: LicenseProps) => {
  const result = await axiosInstance.post("/clinician/license", formValues);
  return result.data;
}
export const getLicense = async () => {
  const result = await axiosInstance.get("/clinician/license");
  return result.data;
}
export const editLicense = async (formValues: LicenseProps,formID:string) => {
  const result = await axiosInstance.put("/clinician/license/"+formID, formValues);
  return result.data;
}
export const deleteLicense = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/license/" + formId);
  return result.data;
}
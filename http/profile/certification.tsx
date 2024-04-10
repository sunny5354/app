import { CertificationProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addCertification = async (formValues: CertificationProps) => {
  const result = await axiosInstance.post("/clinician/certification", formValues);
  return result.data;
}
export const getCertification = async () => {
  const result = await axiosInstance.get("/clinician/certification");
  return result.data;
}
export const editCertification = async (formValues: CertificationProps,formID:string) => {
  const result = await axiosInstance.put("/clinician/certification/"+formID, formValues);
  return result.data;
}
export const deleteCertification = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/certification/" + formId);
  return result.data;
}
import { TaxProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addTax = async (formValues: TaxProps) => {
  const result = await axiosInstance.post("/clinician/tax", formValues);
  return result.data;
}
export const getTax = async () => {
  const result = await axiosInstance.get("/clinician/tax");
  return result.data;
}
export const deleteTax = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/tax/" + formId);
  return result.data;
}
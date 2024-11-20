import { PaymentProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const editPayment = async (formValues: PaymentProps) => {
  const result = await axiosInstance.put("/clinician/payment", formValues);
  return result.data;
}
export const getPayment = async () => {
  const result = await axiosInstance.get("/clinician/payment");
  return result.data;
}

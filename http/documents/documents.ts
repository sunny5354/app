import {DocumentDataProps } from "../../types/documents";
import axiosInstance from "../axiosInstance";

export const getDocumentDetails = async (id: string) => {
  const result = await axiosInstance.get("/clinician/document/" + id);
  return result.data;  
}
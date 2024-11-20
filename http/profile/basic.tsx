import { BasicInfoProps, PersonalInfoProps } from "../../types/http";
import axiosInstance from "../axiosInstance";
import axiosInstanceAuth from "../axiosInstanceAuth";


export const addBasicInfoUser = async (formValues: BasicInfoProps) => {
  const result = await axiosInstanceAuth.post("/clinician/basic", formValues);
  return result.data;
}

export const getBasicInfoUser = async () => {
  const result = await axiosInstance.get("/clinician/personal");
  return result.data;
}

export const editPersonalInforUser = async (formValues: PersonalInfoProps) => {
  const result = await axiosInstance.put("/clinician/personal", formValues);
  return result.data;
}


export const deleteIdProof = async()=>{
  const result = await axiosInstance.delete("/clinician/personal/idproof");
  return result.data;
}
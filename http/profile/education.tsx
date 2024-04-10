import { EducationProps } from "../../types/http";
import axiosInstance from "../axiosInstance";




export const addEducation = async (formValues: EducationProps) => {
  const result = await axiosInstance.post("/clinician/education", formValues);
  return result.data;
}


export const getEducation = async () => {
  const result = await axiosInstance.get("/clinician/education");
  return result.data;
}

export const editEducation = async (formValues: EducationProps,formID:string) => {
  const result = await axiosInstance.put("/clinician/education/"+formID, formValues);
  return result.data;
}

export const deleteEducation = async (formID: string) => {
  const result = await axiosInstance.delete("/clinician/education/" + formID);
  return result.data;
}





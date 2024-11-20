import { SkillProps } from "../../types/http";
import axiosInstance from "../axiosInstance";



export const addSkill = async (formValues: SkillProps) => {
  const result = await axiosInstance.post("/clinician/skill", formValues);
  return result.data;
}
export const getSkill = async () => {
  const result = await axiosInstance.get("/clinician/skill");
  return result.data;
}
export const editSkill = async (formValues: SkillProps,formID:string) => {
  const result = await axiosInstance.put("/clinician/skill/"+formID, formValues);
  return result.data;
}
export const deleteSkill = async (formId: string) => {
  const result = await axiosInstance.delete("/clinician/skill/" + formId);
  return result.data;
}
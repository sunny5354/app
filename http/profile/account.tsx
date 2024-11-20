import { DocumentPickerAsset } from "expo-document-picker";
import { AccountInfoProps, ChangePasswordProps } from "../../types/http";
import axiosInstance from "../axiosInstance";
import axiosInstanceAuth from "../axiosInstanceAuth";


export const getAccount = async () => {
  const result = await axiosInstance.get("/user/account");
  return result.data;
}
export const editAccount = async (formValues: AccountInfoProps) => {
  const result = await axiosInstance.put("/user/account", formValues);
  return result.data;
}


export const editPassword = async (formValues: ChangePasswordProps) => {
  const result = await axiosInstance.put("/user/password", formValues);
  return result.data
}

export const updateProfilePicture = async(file:DocumentPickerAsset)=>{
  const data = new FormData();
    // @ts-ignore
    data.append('file',{
      uri:file.uri,
      type:file.mimeType,
      name:file.name
    });
    const result = await axiosInstance.put("/user/avatar",data);
    return result.data;
}
export const updateBasicProfilePicture = async(file:DocumentPickerAsset)=>{
  const data = new FormData();
    // @ts-ignore
    data.append('file',{
      uri:file.uri,
      type:file.mimeType,
      name:file.name
    });
    const result = await axiosInstanceAuth.put("/user/avatar",data);
    return result.data;
}

export const sendAccountPhoneCode = async (phone: string) => {
  const res = await axiosInstance.post("/auth/verify/phone/code", { phone: phone })
  return res.data;
}
export const sendAccountVerifyPhoneCode = async (phone: string) => {
  const res = await axiosInstanceAuth.post("/auth/verify/phone/code", { phone: phone })
  return res.data;
}
export const verifyAccountPhoneCode = async (otp: string) => {
  const res = await axiosInstance.post("/auth/verify/phone/", { code: parseInt(otp) })
  return res.data;
}
export const verifyAccountAuthPhoneCode = async (otp: string) => {
  const res = await axiosInstanceAuth.post("/auth/verify/phone/", { code: parseInt(otp) })
  return res.data;
}
export const sendAccountEmailCode = async () => {
  const res = await axiosInstance.get("/auth/verify/email/code")
  return res.data;
}
export const verifyAccountEmailCode = async (otp: string) => {
  const res = await axiosInstance.post("/auth/verify/email/", { code: +otp })
  return res.data;
}
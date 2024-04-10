import { DocumentPickerAsset } from "expo-document-picker";
import axiosInstance from "../axiosInstance";



export const deleteFile = async(fileName:string)=>{
    const result = await axiosInstance.delete("/file/"+fileName);
    return result.data;
}
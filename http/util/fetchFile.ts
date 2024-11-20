import { DocumentPickerAsset } from "expo-document-picker";
import axiosInstance from "../axiosInstance";



export const fetchFile = async(fileName:string)=>{
    const result = await axiosInstance.get("/file/"+fileName);
    return result.data;
}
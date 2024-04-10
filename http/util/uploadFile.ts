import { DocumentPickerAsset } from "expo-document-picker";
import axiosInstance from "../axiosInstance";



export const uploadFile = async(file:DocumentPickerAsset)=>{

    const data = new FormData();
    // @ts-ignore
    data.append('file',{
      uri:file.uri,
      type:file.mimeType,
      name:file.name
    });
    const result = await axiosInstance.post("/file/upload/pdf",data);
    return result.data;
}
export const uploadImage = async(file:DocumentPickerAsset)=>{

    const data = new FormData();
    // @ts-ignore
    data.append('file',{
      uri:file.uri,
      type:file.mimeType,
      name:file.name
    });
    const result = await axiosInstance.post("/file/upload/image",data);
    return result.data;
}
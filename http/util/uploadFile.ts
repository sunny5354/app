import { DocumentPickerAsset } from "expo-document-picker";
import axiosInstance from "../axiosInstance";

export const uploadFile = async (file: DocumentPickerAsset) => {
  try {
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      type: file.mimeType || 'application/pdf',
      name: file.name || 'document.pdf',
    } as any);
    
    // Set timeout to a higher value for larger files
    const result = await axiosInstance.post("/file/upload/pdf", data, {
      timeout: 60000, // 60 seconds
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (error) {
    console.error('Upload File Error:', error);
    throw error;
  }
}

export const uploadImage = async (file: DocumentPickerAsset) => {
  try {
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      type: file.mimeType || 'image/jpeg',
      name: file.name || 'image.jpg',
    } as any);
    
    // Set timeout to a higher value for larger files
    const result = await axiosInstance.post("/file/upload/image", data, {
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (error) {
    console.error('Upload Image Error:', error);
    throw error;
  }
}
// Save QA Document pdf
export const saveQADocpdfData = async (jobId: string,formId: string,qaDoc: string) => {
  const data = {
    jobId: jobId,
    form: formId,
    qaDoc: qaDoc,
    qaStatus: "QA Submitted"
  }
  console.log("data", data);
  const res = await axiosInstance.post("/clinician/qadocument", data);
  return res.data;
}
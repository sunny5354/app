import axiosInstance from "./axiosInstance";


export const fetchList = async () => {
  const result = await axiosInstance.get("/clinician/earning/finance");
  return result.data;
}


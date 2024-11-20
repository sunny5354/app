import { FilterOptionsProps, JobTypeFilterOptionProps, LogMileageProps } from "../../types/jobs";
import axiosInstance from "../axiosInstance";



export const getPublishedJobs = async () => {
  const result = await axiosInstance.get("/clinician/jobs");
  return result.data;
}

export const getSignleJobDetail = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/" + _id);
  return result.data;
}
export const applyJob = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/apply/" + _id);
  return result.data;
}


export const getAppliedJobs = async () => {
  const result = await axiosInstance.get("/clinician/jobs/applied");
  return result.data;
}
export const getAssignedJobs = async () => {
  const result = await axiosInstance.get("/clinician/jobs/assigned");
  return result.data;
}

export const acceptJob = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/accept/" + _id);
  return result.data;
}

export const declineJob = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/decline/" + _id);
  return result.data;
}


export const filterJobs = async (formValues: FilterOptionsProps) => {
  const result = await axiosInstance.post("/clinician/jobs/published/filter", formValues);
  return result.data;
}




// Scheduled Jobs

export const getJobsByType = async (type: string) => {
  const result = await axiosInstance.get("/clinician/jobs/" + type);
  return result.data;
}

export const filterOfJobType = async (formValues: JobTypeFilterOptionProps) => {
  const result = await axiosInstance.post("/clinician/jobs/scheduled/filter", formValues);
  return result.data;
}

export const getSignleScheduledJobDetail = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/scheduled/job/" + _id);
  return result.data;
}

export const getJobMarkAsComplete = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/markascomplete/" + _id);
  return result.data;
}



// 

export const getPatientDetails = async (id: string) => {
  const result = await axiosInstance.get("/clinician/job/patient/" + id);
  return result.data;
}

export const getClinicianBadgeDetails = async (id: string) => {
  const result = await axiosInstance.get("/clinician/job/badge/" + id);
  return result.data;
}



// point of care

export const getJobsPOC = async () => {
  const result = await axiosInstance.get("/clinician/jobs/poc");
  return result.data;
}

export const getSignlePOCJobDetail = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/scheduled/job/" + _id);
  return result.data;
}

export const getLogMileageDetails = async (_id: string) => {
  const result = await axiosInstance.get("/clinician/job/poc/logmileage/" + _id);
  return result.data;
}
export const uploadLogMileageDetails = async (_id: string, formValues: LogMileageProps) => {
  const result = await axiosInstance.post("/clinician/job/poc/logmileage/" + _id, formValues);
  return result.data;
}


// completed jobs
export const getCompleteJobs = async () => {
  const result = await axiosInstance.get("/clinician/jobs/completed/past");
  return result.data;
}

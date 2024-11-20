import { imagePdfFileTypeProps } from "../types";


export interface JobDataProps {
  _id: string;
  createdAt: string;
  jobId: string;
  jobExpireIn?: string;
  jobType: string;
  taskType: string;
  staffProfile: string;
  patientName?: string;
  patientId?: string;
  jobDateAndTime: string;
  jobStatus?: string;
  agencyName: string;
  agencyId: string;
  agencyPhone?: string;
  location: string;
  payRate: string;
  away: string;
  "jobDescription"?: string,
  qaStatus?:string;
}

export interface FilterOptionsProps {
  location?: string;
  startDate?: string;
  endDate?: string;
  minPayRate?: number;
  isInternal?: boolean;
  applied?: string;
}

export interface JobTypeFilterOptionProps {
  "startDate"?: string,
  "endDate"?: string,
  "agencyName"?: string,
  "qaStatus"?: string
}



// Patient Props
export interface Family {
  name: string;
  relationship: string;
  age: string;
  gender: string;
  attendantMobNo: string;
  attendantEmail: string;
}

export interface Treatment {
  status: string;
  careStartDate: string;
  physician: string;
  treatmentHistory: string;
  symptoms: string;
  vitalSigns: string;
  medicationProfile: string;
  allergyProfile: string;
  carePlan: string;
  advanceCarePlan: string;
}

export interface PatientDetailProps {
  _id: string;
  avatar: {
    _id: string;
    name: string;
    url: string;
  };
  name: string;
  patientId: string;
  age: number;
  dob:string;
  gender: string;
  insuranceName: string;
  careStartDate: string;
  dob: string;
  location: string;
  height: number;
  weight: number;
  phone: string;
  family: Family;
  treatment: Treatment;
}

export interface ClinicianBadgeProps {
  _id: string;
  staffAvatar: {
    _id: string;
    name: string;
    url: string;
  };
  staffName: string;
  staffId: string;
  staffProfile: string;
  agencyName: string;
  agencyPhone: string;
  staffMemberSince:string;
  agencyLocation:string;
}


export interface LogMileageProps {
  inDate: string;
  inTime: string;
  outDate: string;
  outTime: string;
  mileage: string;
  notes: string;
  patientSignature: string;
}
export interface LogMileageDataProps {
  inDate: string;
  inTime: string;
  outDate: string;
  outTime: string;
  mileage: string;
  notes: string;
  patientSignature: imagePdfFileTypeProps;
}
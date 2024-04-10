import { imagePdfFileTypeProps } from "./types"



export type AccountDataInfoProps = {
  "_id": string,
  "fullName": string,
  "avatar": string,
  "email": string,
  "isEmailVerified": boolean,
  "isPhoneVerified": boolean,
  "role": string,
  "createdAt": string,
  "updatedAt": string,
  "location": {
    "country"?: string,
    "county": string,
    "state": string,
    "city": string,
    "_id": string
  },
  "phone": string
}

export type BasicDataInfoProps = {
  "_id": string,
  "maritalStatus": boolean,
  "gender": string,
  "address": {
    "country": string,
    "state": string,
    "city": string,
    "street": string,
    "houseNo": string,
    "zipCode": number,
    "_id": string
  },
  "bio": string,
  "user": string,
  "createdAt": string,
  "updatedAt": string,
  "idProof"?: {
    "idType": string,
    "front": string,
    "back": string
  },
  resume?: string
}

export type EducationDataInfoProps =
  {
    "_id": string,
    "qualification": string,
    "degree": string,
    "institution": string,
    "year": number,
    "certificate": imagePdfFileTypeProps,
    "user": string,
    "createdAt"?: string,
    "updatedAt"?: string,
  }


export type SkillDataProps = {
  "_id": string,
  "CompetencyName": string,
  "level": string,
  "user": string,
  "createdAt": string,
  "updatedAt": string,
}


export type CertificationDataProps = {
  "_id": string,
  "certificate": imagePdfFileTypeProps,
  "createdAt": string,
  "credentialName": string,
  "credentialType": string,
  "institution": string,
  "updatedAt": string,
  "user": string,
  "validFrom": string,
  "validTo": string,
  "state": string,
  status: string
}


export type ExperienceDataProps = {
  "_id": string,
  "organization": string,
  "jobTitle": string,
  "from": string,
  "till": string,
  "user": string,
  "createdAt": string,
  "updatedAt": string,
}

export type PaymentDataProps = {
  "_id": string,
  "bankName": string,
  "accountNumber": string,
  "routingNumber": string,
  "user": string,
  "createdAt": string,
  "updatedAt": string,
}


export type LicenseDataProps = {
  "_id": string,
  "credential": string,
  "licenseNumber": string,
  "initialVerificationDate": string,
  "verifiedDate": string,
  "state": string,
  "expiresOn": string,
  "verification": string,
  "user": string,
  "createdAt": string,
  "updatedAt": string,
}


export interface Certificate {
  _id: string;
  name: string;
  url: string;
}

export interface BackgroundCheckProp {
  status: string;
  verificationDate: string;
  _id: string;
  certificate?: Certificate;
}

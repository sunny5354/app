
export type AccountInfoProps = {
  "avatar"?: string,
  "email"?: string,
  "location"?: {
    "country"?: string,
    "county": string,
    "state": string,
    "city": string,
  },
  "phone"?: string
}


export type BasicInfoProps = {
  "fullName": string,
  "phone": string,
  "dob": Date,
  "gender": string,
  "address": {
    "country"?: string,
    "county": string,
    "state": string,
    "city": string,
    "zipCode": string,
    "street": string,
    "houseNo": string
  }
  agency?:string;
}

export type PersonalInfoProps = {
  "maritalStatus"?: boolean,
  "gender"?: string,
  dob?: string;
  "address"?: {
    "country"?: string,
    "county": string,
    "state": string,
    "city": string,
    "street": string,
    "houseNo": string,
    "zipCode": number,
  },
  "bio"?: string,
  "idProof"?: {
    "idType": string,
    "front": string,
    "back": string
  },
  resume?: string,
  primaryArea: string,
  professionalReference1?: {
    "name": string,
    "designation": string,
    "organization": string,
    "mobileNo": string
  },
  professionalReference2?: {
    "name": string,
    "designation": string,
    "organization": string,
    "mobileNo": string
  },
}

export type EducationProps = {
  credential: string,
  courseType: string,
  institution: string,
  degree: string;
  city: string;
  state: string;
  courseName: string;
  issued: string;
  hasValidity: string;
  validUpTo: string;
  certificate: string;
}

export type CertificationProps = {
  "credentialType": string,
  "credentialName": string,
  "credential": string,
  "institution": string,
  "validUpTo": Date,
  "city": string,
  "state": string,
  "certificate": string,
  "hasValidity": string,
  "issued": Date
}


export type SkillProps = {
  "CompetencyName": string,
  "level": string
}

export type ExperienceProps = {
  "organization": string,
  "jobTitle": string,
  "from": string,
  "till": string
}


export type LicenseProps = {
  "credential": string,
  "licenseNumber": string,
  "initialVerificationDate": string,
  "verifiedDate": string,
  "state": string,
  "expiresOn": string,
  "verification": string
}


export type CovidProps = {
  "riskLevel": string,
  "certificate": string,
  "assessmentDate": string
}

export type ChangePasswordProps = {
  "oldPassword": string,
  "newPassword": string,
  "confirmPassword": string
}

export type PaymentProps = {
  "routingNumber": string,
  "bankName": string,
  "accountNumber": string
}

export type TaxProps = {
  document: string;
}

export type WorkPrefrenceProps = {
  "workProfile": string,
  "workType": string,
  "shiftPreference": string[],
  "availableDays": string[],
  "onCalls": boolean,
  onCallDays?:string[],
  "location": {
    "state": string,
    "county": string,
    "city": string
  },
  "payRate": string
}
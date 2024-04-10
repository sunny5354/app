
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
  resume?: string
}

export type EducationProps = {
  // "qualification": string,
  "degree": string,
  "institution": string,
  "year": string,
  "certificate": string
}

export type CertificationProps = {
  // "credentialType": string,
  "credentialName": string,
  "institution": string,
  "validFrom": string,
  "validTo": string,
  "state": string,
  "certificate": string
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
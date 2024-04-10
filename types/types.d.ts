import { DocumentPickerAsset } from "expo-document-picker";
import { ImageProps, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";



export type imagePdfFileTypeProps = {
    _id: string;
    name: string;
    url: string;
}


export type CardProps = {
    title: string;
    img: ImageData;
};


export type OptionProps = {
    label: string,
    value: string
}

type ProductCardProps = {
    title: string;
    title2?: string;
    sunCarbon?: boolean;
    onPress?: () => void;
};

export type DropDownProps = {
    value: string;
    setValue: Dispatch<SetStateCallback<any>>;
    items: OptionProps[];
    label: string,
    dropDownDirection?: string,
    listModeType?: string,
    style?: StyleProp<ViewStyle>
};

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobileNumber: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
    gstNumber: string;
    panNumber: string;
    aadharNumber: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    branchAddress: string;
    accountHolderName: string;
    accountType: string;
    category: string;
    methodPrepration: string;
    storeImageVideo: string;
    explainStorage: string;
    socialLinks: string;
    quantityManufacture: string;
    productionMothly: string;
    typeManufacture: string;
}

export interface buyerRegisterProps {
    address: string;
    city: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    pincode: string;
    state: string;
    street: string;
}

export type selectedValueProp = {
    label: string;
    value: string;
    img?: ImageSourcePropType;
}

export type DocumentPickerResult = {
    uri: string;
    type: string;
    name: string;
    size: number;
}

export type UploadCardProps = {
    title: string;
    shortDesc: string;
    img: ImageSourcePropType;
    // onPress?: (DocumentPickerResult:DocumentPickerResult) => void;
    onPress?: (result: any) => void;
    type: string[],
    reset: boolean
}

export type UploadedDataProps = {
    _id: string,
    name: string,
    size?: number,
    url: string,
    type?: string,
    user?: string,
}


export type CovidDataProps = {
    "_id": string,
    "riskLevel": string,
    "certificate": imagePdfFileTypeProps,
    "assessmentDate": string,
    "verification": string,
    "user": string,
    "createdAt": string,
    "updatedAt": string,
}

export type TaxDataProps = {
    "_id": string,
    document: imagePdfFileTypeProps,
    "createdAt": string,
    "updatedAt": string,
}

export type ReviewDataProps = {
    "_id": string,
    "name": string,
    "avatar": imagePdfFileTypeProps,
    "date": string,
    "message": string,
    rating: number
}

export type HomeDataProps = {
    "appliedJobs": number,
    "assignedJobs": number,
    avatar: imagePdfFileTypeProps,
    "earning": number,
    "fullName": string,
    "nearByJobs": string,
    "paidJobs": string,
    "pendingQA": number,
    "scheduledJobs": number,
    "unread": number,
    "update": number,
    reviews: ReviewDataProps[],
    expireIn:string;
}

import { Modal } from 'react-native';
import { imagePdfFileTypeProps, selectedValueProp } from './types';
import { Dispatch, SetStateAction } from 'react';
import { FilterOptionsProps, LogMileageDataProps, LogMileageProps } from './jobs';

export type ModalChildrenProps = {
    modalVisible: boolean;
    handleModalVisible: (value?: boolean | string) => void;
} & React.ComponentProps<typeof Modal>;

export type ValueChildrenProps = {
    selectedValue: number | string;
    handleSelectedValue: (value: selectedValueProp) => void;
    data: selectedValueProp[];
    label: string;
} & ModalChildrenProps;
export type MultiValueChildrenProps = {
    selectedValue: string[] | null;
    handleSelectedValue: (value: string) => void;
    data: selectedValueProp[];
    label: string;
} & ModalChildrenProps;

export type DeleteChildrenProps = {
    handleDelete: () => void;
    label: string;
    text: string;
} & ModalChildrenProps;

export type PdfViewProps = {
    pdfObject: imagePdfFileTypeProps | null;
} & ModalChildrenProps;

export type ImageModalProps = {
    setRefresh: Dispatch<SetStateAction<boolean>>;
    basic?: boolean
} & ModalChildrenProps;


export type FilterModalProps = {
    setRefresh?: Dispatch<SetStateAction<boolean>>;
    handleApply: (values: FilterOptionsProps) => void
    handleReset: () => void
} & ModalChildrenProps;

export type LogMileageModalProps = {
    data: LogMileageDataProps | null
    signature?: string;
    setRefresh?: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (value: LogMileageProps) => void
} & ModalChildrenProps;

export type signatureModalProps = {
    signature?: string;
    setRefresh?: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (value: imagePdfFileTypeProps) => void
} & ModalChildrenProps;

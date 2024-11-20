import React, { useEffect, useState } from "react";
import { View, Modal, Platform, Image, ScrollView, Pressable ,Text,StyleSheet,TouchableOpacity,Alert} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from "formik";
import * as yup from "yup";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

// Custom Imports

import { LogMileageModalProps } from "../../../types/Modal";
import Typography from "../../../components/Typography/Typography";
import { cn } from "../../../lib/cn";
import BackHeader from "../../../components/Headers/BackHeader";
import Input from "../../../components/Input";
import DateTimePickers from "../../../components/DateTimePicker";
import SingleBottomButton from "../../../components/BottomButton/SingleBottomButton";
import TextArea from "../../../components/Input/TextArea";
import Button from "../../../components/Button";
import ClientSignatureModal from "./ClientSignature";
import { backgroundShadow } from "../../../components/backgroundShadow";
import { imagePdfFileTypeProps , selectedUploadValueProp, UploadedDataProps } from "../../../types/types";
import { LogMileageProps } from "../../../types/jobs";
import TimePicker from "../../../components/DateTimePicker/TimePicker";
import MenuDropDown from "../../../components/DropDown";
import { getDocumentDetails } from "../../../http/documents/documents";
import CustomDropdown from "../../../components/DropDown/CustomDropdown";
import { fetchDocument } from "../../../lib/fetchDocument";
import { saveQADocpdfData, uploadFile } from "../../../http/util/uploadFile";
import Loading from "../../Loading";
import { successToast } from "../../../lib/toast";
import { ScreenNavigationProp } from "../../../types/navigation";

interface DocumentResult {
  uri: string;
  name: string;
  type: string;
}

const AddQaForm: React.FC<LogMileageModalProps> = ({
  data,
  modalVisible,
  handleSubmit,
  handleModalVisible,
  ...otherProps
}) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [signature, setSignature] = useState<imagePdfFileTypeProps | null>(null);
  const [timeIn, setTimeIn] = useState(new Date());
  const [inTime, setInTime] = useState<string>(new Date().toTimeString());
  const [timeOut, setTimeOut] = useState(new Date());
  const [outTime, setOutTime] = useState<string>(new Date().toTimeString());
  const [clientSignatureModal, setClientSignatureModal] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAgencyForm, setSelectedAgencyForm] = useState<selectedUploadValueProp>({
    label: "Select Agency Form", value: "0"
  })
  const [agencyData, setAgencyData] = useState([{
    label: "Nothing to show", value: "0"
  }])

  const handleConfirm = (str: string, event: "In" | "Out") => {
    if (event === "In") {
      setInTime(str);
    }
    if (event === "Out") {
      setOutTime(str);
    }
  };

  const handleDateChange = (selectedDate: any, type: "start" | "end") => {
    const date = new Date(selectedDate.nativeEvent.timestamp);
    if (type === "start") {
      setTimeIn(date);
    }
    if (type === 'end') {
      setTimeOut(date)
    }
  };

  const formik = useFormik({
    initialValues: {
      associateMileage: "",
      notes: ""
    },
    validationSchema: yup.object({
      associateMileage: yup.string().required(),
      notes: yup.string().required()
    }),
    onSubmit: async (values) => {
      if (!signature) {
        alert("Please collect signature");
        return;
      }
      const obj: LogMileageProps = {
        inDate: timeIn.toString(),
        outDate: timeOut.toString(),
        mileage: values.associateMileage,
        notes: values.notes,
        patientSignature: signature?._id,
        inTime: inTime,
        outTime: outTime
      }
      handleSubmit(obj);
      handleModalVisible();
    }
  })


  // useEffect(() => {
  //   if (data) {
  //     formik.setValues({
  //       associateMileage: data.mileage,
  //       notes: data.notes
  //     })
  //     setSignature(data.patientSignature);
  //     setTimeIn(new Date(data.inDate));
  //     setTimeOut(new Date(data.outDate));
  //     setInTime(data.inTime);
  //     setOutTime(data.outTime);
  //   }
  //   else {
  //     setSignature(null);
  //     setTimeIn(new Date());
  //     setTimeOut(new Date());
  //     setInTime(new Date().toTimeString().slice(0,5))
  //     setOutTime(new Date().toTimeString().slice(0,5))
  //     formik.resetForm();
  //   }
  // }, [modalVisible])

  const handleUpload = async (resultFile:any) => {
    console.log("file", resultFile);
    try {
      //@ts-ignore
      if (resultFile != null && resultFile.assets?.[0]?.canceled) return;
      setIsUploading(true);
      // @ts-ignore
      if (resultFile.assets?.[0]?.mimeType === 'application/pdf') {
        try {
          //@ts-ignore
          const res = await uploadFile(resultFile.assets?.[0]);
          //@ts-ignore
          // onPress(res.file);
          console.log("uploading file response", res);
          console.log("upload res", res?.file?._id);
          setQadoc(res?.file?._id);
          setUploadedDoc(resultFile);
        } catch (error: any) {
          console.log("err",error);
          console.log(error.response.data);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsUploading(false);
  }

  const HandleSavedocfileData = async () => {
    try {
       // @ts-ignore
      const result = await saveQADocpdfData(otherProps?.jobId,selectedAgencyForm?._id,qaDoc);
      console.log("result12", result);
      //Alert.alert("Success","QA Document has been submitted Successfully");
      successToast("QA Document has been submitted Successfully");
      navigation.goBack();
      //handleModalVisible();
    } catch (error) {
      // @ts-ignore
      console.log("error uploading submittinggg", error.response);
      // @ts-ignore
      Alert.alert('Error', error.response.data.message);
    }
  }

  const [qaDoc, setQadoc] = useState<any>(null);

  const [file, setFile] = useState<DocumentResult | null>(null);

  const pickDocument = async () => {
    try {
      // @ts-ignore
      if(selectedAgencyForm.value == 0) {
        Alert.alert('Error',"Please select agency form first");
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
          copyToCacheDirectory: true,
        });
        if (result?.assets?.[0]?.mimeType == 'application/pdf') {
          // @ts-ignore
          if(result?.assets?.[0]?.size > 10 * 1000 * 1024) {
            Alert.alert('Error', 'Pdf size should be less than 10Mb')
          } else {
            // @ts-ignore
            setFile(result);
            handleUpload(result);
            console.log('Picked file:', result);
          }
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Could not pick the document');
    }
  };


  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const res = await getDocumentDetails(data);
        console.log("Result",data);
        setAgencyData(res.documents);
      } catch (error: any) {
        console.log("error",error.response.data);
      }
    }
    fetchDocumentDetails(); 
  }, [])

  if (!agencyData) return null;

  // if (isUploading) {
  //   return (
  //     <Loading />
  //   )
  // }


  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleModalVisible();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
      {...otherProps}
    >
      <View
        className={cn(
          `flex-1 rounded-none overflow-hidden`,
          Platform.OS === 'ios' ? "mt-12 mb-3" : "mt-1"
        )}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}
      >
        <View className="flex-1 bg-white w-full">
          <BackHeader
            title="QA Document"
            handlePress={handleModalVisible}
          />
          <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Add QA Document</Text>
            <View style={styles.innercontainer}>
                
                <View style={styles.dropdownContainer}>
                  <CustomDropdown label='Select Agency Form*' selectedValue={selectedAgencyForm} setSelectedValue={setSelectedAgencyForm} data={agencyData} />
                </View>

                {/* Upload Box */}
                <View style={styles.uploadBox}>
                  <Text style={styles.uploadTitle}>Upload QA Document</Text>
                  <View style={styles.uploadCircle}>
                    <FontAwesome name="file-pdf-o" size={40} color="grey" />
                    <Text style={styles.uploadText}>PDF format only Max size 10 MB</Text>
                  </View>
                  <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                  </TouchableOpacity>
                  {/* <Button onPress={pickDocument}>Upload</Button> */}
                  {/* { file && <Text style={{ marginVertical: 10 }}>File is uploaded</Text>} */}
                </View> 
            </View>
              

            </View>
            { file && 
            <>
              <Text style={{ marginVertical: 10, textAlign: 'center' }}>
                File is uploaded 
              </Text>
              <View>
                {/* @ts-ignore */}
                <Text style={{ textAlign: 'center' }} className="p-4">{file?.assets?.[0]?.name}</Text>
              </View>
            </>
              
            }
          </ScrollView>
          
          <SingleBottomButton
            //@ts-ignore
            handlePress1={HandleSavedocfileData}
            tilte="Submit QA"
          />
          {/* <View className="h-20">
            <Button
              onPress={formik.handleSubmit as (values: any) => any}
            >
              submit
            </Button>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingRight: 16,
    paddingLeft: 16
  },
  innercontainer: {
    borderColor: 'silver',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfa5',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  uploadBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadCircle: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A4A49C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  dropdownContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    paddingRight: 30,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#555',
    paddingTop: 10,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#00bfa5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddQaForm;
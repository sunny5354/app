import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from "yup";
import { useFormik } from 'formik';


import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Button from '../../components/Button'
import colors from '../../config/colors'
import Divider from '../../components/Divider'
import UploadCard from '../../components/Cards/UploadCard'
import pdf from "../../assets/icons/pdf.png"
import DateTimePickers from '../../components/DateTimePicker'
import { UploadedDataProps, selectedValueProp } from '../../types/types';
import { errorToast, successToast } from '../../lib/toast';
import { CertificationProps } from '../../types/http';
import { addCertification, editCertification, getCertification } from '../../http/profile/certification';
import { CertificationDataProps } from '../../types/profile';
import CertificationCard from '../../components/Cards/CertificationCard';
import Loading from '../Loading';
import PdfViewCard from '../../components/Cards/PdfViewCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import { getDropDown } from '../../http/util/dropdown';
import MenuDropDown from '../../components/DropDown';
import { getStatus } from '../../http/home';



const Credential = () => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [resetUploadCard, setResetUploadCard] = useState(false);
  const scroll = useRef(null);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [refresh, setRefresh] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [certifications, setCertifications] = useState<null | CertificationDataProps[]>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [states, setStates] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [selectedState, setSelectedState] = useState<selectedValueProp>({
    label: "Select State", value: "0"
  })

  const handleFromDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setFromDate(currentDate);
  };

  const [tillDate, setTillDate] = useState(new Date());

  const handleTillDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setTillDate(currentDate);
  };

  type FormValues = {
    // credentialType: string;
    credentialName: string;
    institution: string;
    // year: string;
  }

  const fetchStateDropDown = async () => {
    try {
      const result = await getDropDown("65e987764d1b2bac59847cdd");
      // console.log(result.dropDown.options);
      setStates(result.dropDown.options);
      setSelectedState({
        label: "Select State", value: "0"
      })
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
    }
  }

  const validationSchema = yup.object({
    // credentialType: yup.string().required("Type of Credential is required"),
    credentialName: yup.string().required("Name is required"),
    institution: yup.string().required("Institute is required"),
    // year: yup.string().required("Year is required"),
  })

  const formik = useFormik({
    initialValues: {
      // credentialType: "",
      credentialName: "",
      institution: "",
      // year: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if (!uploadedDoc) {
        alert("Please upload the document first");
        return;
      }
      setIsBtnLoading(true);
      try {
        const obj: CertificationProps = {
          // credentialType: values.credentialType,
          credentialName: values.credentialName,
          institution: values.institution,
          // year: values.year,
          state: selectedState.value,
          certificate: uploadedDoc?._id!,
          validFrom: fromDate.toString(),
          validTo: tillDate.toString()
        }
        const result = await addCertification(obj);
        successToast(result.message ?? "Certification Added");
        formik.resetForm();
        setUploadedDoc(null);
        setResetUploadCard(!resetUploadCard);
        setRefresh(!refresh);
      } catch (error: any) {
        console.log(error.response.data);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  const onUpdate = (data: CertificationDataProps) => {
    setUploadedDoc({ name: data.certificate.name, url: data.certificate.url, _id: data.certificate._id });
    formik.setFieldValue("credentialType", data.credentialType);
    formik.setFieldValue("credentialName", data.credentialName);
    formik.setFieldValue("institution", data.institution);
    // formik.setFieldValue("year", data.year.toString());
    const fromDate = new Date(data.validFrom);
    setFromDate(fromDate);
    const tillDate = new Date(data.validTo);
    setTillDate(tillDate);
    setIsUpdate(true);
    setUpdateId(data._id);
    if (scroll.current) {
      // @ts-expect-error
      scroll.current.scrollTo({ x: 1000, y: 1000, animated: true });
    }
  }

  const isFocused = useIsFocused();
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      console.log(res);
      setUserStatus(res.status);
      setRole(res.role);
      if (res.status === 'Active') {
      }
      else {
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  const handleUpdate = async () => {
    if (!uploadedDoc) {
      alert("Please upload a doc first!");
      return;
    }
    try {
      const obj: CertificationProps = {
        // credentialType: formik.values.credentialType,
        credentialName: formik.values.credentialName,
        institution: formik.values.institution,
        state: selectedState.value,
        certificate: uploadedDoc?._id!,
        validFrom: fromDate.toString(),
        validTo: tillDate.toString()
      }
      const result = await editCertification(obj, updateId);
      successToast(result.message ?? "Certification Updated");
      formik.resetForm();
      setUploadedDoc(null);
      setResetUploadCard(!resetUploadCard);
      setRefresh(!refresh);
      setIsUpdate(false);
    } catch (error: any) {
      console.log(error.response.data);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }


  const fetchCertificates = async () => {
    try {
      const result = await getCertification();
      setCertifications(result.certifications);
    } catch (error: any) {
      console.log("certificates experience=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  useEffect(() => {
    fetchCertificates();
  }, [refresh])

  useEffect(() => {
    fetchStateDropDown();
  }, [])

  if (!certifications) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView ref={scroll} className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <Typography class='font-PoppinsSemiBold'>Add Credentials/Licensing</Typography>

        <View className='mt-5' />
        <View className='flex-1' style={{ gap: 15 }}>
          {
            certifications.length > 0 ?
              certifications.map((v, i) => (
                <CertificationCard onUpdate={onUpdate} setRefresh={setRefresh} key={i} education={v} />
              ))
              :
              (
                <View className='flex-1 justify-center items-center'>
                  <Typography class='text-center'>No Credentials/Licensing Added</Typography>
                </View>
              )
          }
        </View>
        <Divider />
        <View style={styles.backgroundShadow}>
          <Input
            label='Credential Name*'
            placeholder='Type credential name'
            value={formik.values.credentialName}
            onChangeText={formik.handleChange("credentialName")}
            onBlur={formik.handleBlur("credentialName")}
            isError={
              !!formik.touched.credentialName &&
              !!formik.errors.credentialName
            }
            error={formik.errors.credentialName}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <Input
            label='Issuing Authority*'
            placeholder='Type institute name'
            value={formik.values.institution}
            onChangeText={formik.handleChange("institution")}
            onBlur={formik.handleBlur("institution")}
            isError={
              !!formik.touched.institution &&
              !!formik.errors.institution
            }
            error={formik.errors.institution}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <MenuDropDown label='State*' selectedValue={selectedState} setSelectedValue={setSelectedState} data={states} />
          {/* <View className='flex-1 flex-row' style={{ gap: 20 }}> */}
          <View className='flex-1'>
            <DateTimePickers
              date={fromDate}
              onChange={handleFromDateChange}
              title='Issue Date*'
            />
          </View>
          <View className='flex-1'>
            <DateTimePickers
              date={tillDate}
              onChange={handleTillDateChange}
              title='Expiring On*'
            />
          </View>
          {/* </View> */}
          {!uploadedDoc ? <UploadCard
            title='Upload Certificate'
            img={pdf}
            shortDesc='PDF format only
          Max size 10 MB'
            onPress={(result) => {
              setUploadedDoc(result)
            }}
            type={["application/pdf"]}
            reset={resetUploadCard}
          />
            : (
              <PdfViewCard setUploadedDoc={setUploadedDoc} name={uploadedDoc.name} _id={uploadedDoc._id} url={uploadedDoc.url} />
            )}
          <View className='px-2 flex-1'>
            {!isUpdate ? <Button
              onPress={formik.handleSubmit as (values: any) => any}
              disabled={role === "agency-clinician" && userStatus !== "Active"}
            >Add Credential</Button>
              :
              <Button
                className='px-2 flex-1'
                onPress={handleUpdate}
              >Update</Button>
            }
          </View>
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => {
          navigation.goBack();
        }}
        text='Back'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundShadow: {
    backgroundColor: 'white',

    // adding Shadow for andorid
    shadowColor: '#000',
    elevation: 5,
    // adding shadow effect for ios
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 20,
    gap: 10,
  }
})

export default Credential
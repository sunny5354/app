import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from "yup"



import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Button from '../../components/Button'
import colors from '../../config/colors'
import Divider from '../../components/Divider'
import EducationQualifyCard from '../../components/Cards/EducationQualifyCard'
import UploadCard from '../../components/Cards/UploadCard'
import pdf from "../../assets/icons/pdf.png"
import { useFormik } from 'formik'
import { UploadedDataProps } from '../../types/types'
import { addEducation, editEducation, getEducation } from '../../http/profile/education'
import { EducationProps } from '../../types/http'
import { EducationDataInfoProps } from '../../types/profile'
import Loading from '../Loading'
import { errorToast, successToast } from '../../lib/toast'
import PdfViewCard from '../../components/Cards/PdfViewCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../types/navigation'
import { getStatus } from '../../http/home'


const EducationalInformation = () => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [resetUploadCard, setResetUploadCard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // Fetching user education information if it exists
  const [educationInfo, setEducationInfo] = useState<EducationDataInfoProps[] | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState<string>("");
  const scroll = useRef(null);

  type FormValues = {
    // qualification: string;
    degree: string;
    school: string;
    year: string;
  }

  const validationSchema = yup.object({
    // qualification: yup.string().required("Academic Qualification is required"),
    degree: yup.string().required("Degree is required"),
    school: yup.string().required("School/University is required"),
    year: yup.string().required("Year is required"),
  })

  const formik = useFormik({
    initialValues: {
      // qualification: "",
      degree: "",
      school: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if (!uploadedDoc) {
        alert("Please upload the document first");
        return;
      }
      setIsBtnLoading(true);
      try {
        const obj: EducationProps = {
          certificate: uploadedDoc?._id!,
          // qualification: values.qualification,
          degree: values.degree,
          institution: values.school,
          year: values.year
        }
        const result = await addEducation(obj);
        successToast(result.message ?? "Education Added");
        formik.resetForm();
        setUploadedDoc(null);
        setResetUploadCard(!resetUploadCard);
        setRefresh(!refresh);
      } catch (error: any) {
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  const handleUpdate = async () => {
    if (!uploadedDoc) {
      alert("Please upload a doc first");
      return;
    }
    try {
      const obj: EducationProps = {
        certificate: uploadedDoc?._id!,
        // qualification: formik.values.qualification,
        degree: formik.values.degree,
        institution: formik.values.school,
        year: formik.values.year
      }
      const result = await editEducation(obj, isUpdateId);
      successToast(result.message ?? "Education Updated");
      formik.resetForm();
      setUploadedDoc(null);
      setResetUploadCard(!resetUploadCard);
      setRefresh(!refresh);
      setIsUpdate(false);
      setIsUpdateId("");
    } catch (error: any) {
      errorToast(error.response.data.message ?? "Error Occured!");
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


  const onUpdate = (data: EducationDataInfoProps) => {
    // setUploadedDoc({ fileName: data.certificate, fileUrl: "https://www.google.com" });
    setUploadedDoc({
      name: data.certificate.name,
      url: data.certificate.url,
      _id: data.certificate._id
    })
    // formik.setFieldValue("qualification", data.qualification);
    formik.setFieldValue("degree", data.degree);
    formik.setFieldValue("school", data.institution);
    formik.setFieldValue("year", data.year.toString());
    setIsUpdateId(data._id);
    setIsUpdate(true);
    if (scroll.current) {
      //@ts-expect-error
      scroll.current.scrollTo({ x: 1000, y: 1000, animated: true });
    }
  }

  const fetchEducationInformation = async () => {
    try {
      const result = await getEducation();
      // console.log(result);
      setEducationInfo(result.educations);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchEducationInformation();
  }, [refresh])

  if (!educationInfo) return <Loading />


  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView ref={scroll} className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <Typography class='font-PoppinsSemiBold'>Add Educational Attainment</Typography>
        <View className='mt-5' />
        <View className='flex-1' style={{ gap: 25 }}>
          {educationInfo.length && educationInfo.length > 0 ?
            educationInfo.map((e, i) => (
              <EducationQualifyCard onUpdate={onUpdate} setRefresh={setRefresh} education={e} key={i} />
            ))
            : (
              <View className='justify-center items-center'>
                <Typography variant='xl'>No Education Detail Added</Typography>
              </View>
            )}
        </View>
        <Divider />
        <View style={styles.backgroundShadow}>
          {/* <Input
            placeholder='Graduation, Post-Graduation, etc.'
            label='Academic Qualification*'
            value={formik.values.qualification}
            onChangeText={formik.handleChange("qualification")}
            onBlur={formik.handleBlur("qualification")}
            isError={
              !!formik.touched.qualification &&
              !!formik.errors.qualification
            }
            error={formik.errors.qualification}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          /> */}
          <Input
            placeholder='Type degree name'
            label='Degree*'
            value={formik.values.degree}
            onChangeText={formik.handleChange("degree")}
            onBlur={formik.handleBlur("degree")}
            isError={
              !!formik.touched.degree &&
              !!formik.errors.degree
            }
            error={formik.errors.degree}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <Input
            placeholder='Type school or university'
            label='School/University*'
            value={formik.values.school}
            onChangeText={formik.handleChange("school")}
            onBlur={formik.handleBlur("school")}
            isError={
              !!formik.touched.school &&
              !!formik.errors.school
            }
            error={formik.errors.school}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <Input
            placeholder='Type completion year '
            label='Year*'
            value={formik.values.year}
            onChangeText={formik.handleChange("year")}
            onBlur={formik.handleBlur("year")}
            isError={
              !!formik.touched.year &&
              !!formik.errors.year
            }
            error={formik.errors.year}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
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
              <PdfViewCard setUploadedDoc={setUploadedDoc} _id={uploadedDoc._id} url={uploadedDoc.url} name={uploadedDoc.name} />
            )}
          {!isUpdate ? <View className='flex-1 px-2'>
            <Button
              onPress={formik.handleSubmit as (values: any) => any}
              disabled={role === "agency-clinician" && userStatus !== "Active"}
            >Add Qualification</Button>
          </View>
            :
            <View className='flex-1 px-2'>
              <Button
                onPress={handleUpdate}
                disabled={role === "agency-clinician" && userStatus !== "Active"}
              >Update</Button>
            </View>
          }
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

export default EducationalInformation
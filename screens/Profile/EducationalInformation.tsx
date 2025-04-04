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
import { selectedValueProp, UploadedDataProps } from '../../types/types'
import { addEducation, editEducation, getEducation , getEducationCourseType} from '../../http/profile/education'
import { EducationProps } from '../../types/http'
import { EducationDataInfoProps } from '../../types/profile'
import Loading from '../Loading'
import { errorToast, infoToast, successToast } from '../../lib/toast'
import PdfViewCard from '../../components/Cards/PdfViewCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../types/navigation'
import { getStatus } from '../../http/home'
import CustomDropdown from '../../components/DropDown/CustomDropdown'
import DropDown from '../../components/DropDown/DropDown'
import MenuDropDown from '../../components/DropDown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DateTimePickers from '../../components/DateTimePicker'
import { getDropDown } from '../../http/util/dropdown'


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

  const [validateData, setvalidateData] = useState({
    label: "Select Validity", value: "0"
  })

  const validityData = [{
    label: "Yes",
    value: true
  },
  {
    label: 'No',
    value: false
  }  
  ]

  const [courseData, setCourseData] = useState([{
    label: "Nothing to show",
    value: "0"
  }])

  const [courseType, setCourseType] = useState<selectedValueProp>({
    label: "Select Course Type", 
    value: "0"
  });

  const [statesData, setStatesData] = useState([{
    label: "Nothing to show", value: "0"
  }]);

  const [states, setStates] = useState({
    label: "Select State", value: "0"
  });

  const [issuedDate, setIssuedDate] = useState(new Date());
  const [valildDate, setvalildDate] = useState(new Date());
  
  const handleDateChange = (selectedDate: any, type: "start" | "end") => {
    const date = new Date(selectedDate.nativeEvent.timestamp);
    if (type === "start") {
      setIssuedDate(date);
    }
    if(type === "end") { 
      setvalildDate(date);
    }
  };

  const scroll = useRef(null);

  type FormValues = {
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

  const validationSchema = yup.object({
    courseName: yup.string().required("Course Name is required"),
    city: yup.string().required("City is required"),
    degree: yup.string().required("Degree is required"),
  })

  const formik = useFormik({
    initialValues: {
      credential: "",
      courseType: "",
      courseName: "",
      degree: "",
      institution: "",
      city: "",
      state: "",
      issued: "",
      hasValidity: "",
      validUpTo: "",
      certificate: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if (!uploadedDoc) {
        alert("Please upload the document first");
        return;
      }

      if (courseType.value === "0") {
        infoToast("Please select Course Type");
        return;
      }
      
      if (!courseType) {
        infoToast("Please select Course Type");
        return;
      }

      if (states.value === "0") {
        infoToast("Please select a state");
        return;
      }

      if (!states) {
        infoToast("Please select a state");
        return;
      }

      if (validateData.value === "0") {
        infoToast("Please select Validity");
        return;
      }

      if (!validateData) {
        infoToast("Please select Validity");
        return;
      }

      setIsBtnLoading(true);
      try {
        
        const obj: EducationProps = {
          certificate: uploadedDoc?._id!,// @ts-ignore
          credential: "1", // @ts-ignore
          courseType: courseType?.value,// @ts-ignore
          courseName: values.courseName,// @ts-ignore
          city: values.city,// @ts-ignore
          state: states?.value,// @ts-ignore
          issued: issuedDate,// @ts-ignore
          hasValidity: validateData?.value,// @ts-ignore
          validUpTo: valildDate,
          degree: values.degree,
          institution: values.institution,
        }
       
        //return;
        const result = await addEducation(obj);
        successToast(result.message ?? "Education Added");
        formik.resetForm();
        setUploadedDoc(null);
        setResetUploadCard(!resetUploadCard);
        setRefresh(!refresh);
      } catch (error: any) {
        console.log("Error is hj", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  const fetchStateDropDown = async (_id: string) => {
    try {
      const result = await getDropDown(_id);
      // console.log(result.dropDown.options);
      setStatesData(result.dropDown.options);
      // setSelectedState({
      //   label: "Select State", value: "0"
      // })
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
    }
  }

  const handleUpdate = async () => {
    if (!uploadedDoc) {
      alert("Please upload a doc first");
      return;
    }
    try {
      const obj: EducationProps = {
        certificate: uploadedDoc?._id!,
        credential: formik.values.credential,
        courseType: formik.values.courseType,
        courseName: formik.values.courseName,// @ts-ignore
        city: formik.values.city,
        state:formik.values.state, // @ts-ignore
        issued: issuedDate,
        hasValidity: validateData?.value, // @ts-ignore
        validUpTo: valildDate,
        degree: formik.values.degree,
        institution: formik.values.institution
      }
      // console.log(obj);
      // return;
      const result = await editEducation(obj, isUpdateId);
      successToast(result.message ?? "Education Updated");
      formik.resetForm();
      setUploadedDoc(null);
      setResetUploadCard(!resetUploadCard);
      setRefresh(!refresh);
      setIsUpdate(false);
      setIsUpdateId("");// @ts-ignore
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
    console.log("update", data);
    setUploadedDoc({
      name: data.certificate.name,
      url: data.certificate.url,
      _id: data.certificate._id
    })
    formik.setFieldValue("degree", data.degree);
    formik.setFieldValue("institution", data.institution);
    formik.setFieldValue("credential", data.credential);
    formik.setFieldValue("courseType", data.courseType);
    formik.setFieldValue("courseName", data.courseName);
    formik.setFieldValue("city", data.city);
    formik.setFieldValue("state", data.state);
    // formik.setFieldValue("issued", data.issued);
    // setIssuedDate(data?.issued);
    // setvalildDate(data?.validUpto);
    //formik.setFieldValue("hasValidity", data.hasValidity);
    // console.log("values",data.hasValidity); 
    setIssuedDate(new Date(data?.issued));
    setvalildDate(new Date(data?.validUpTo));
    // @ts-ignore
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
      console.log("Educations1", result);
      setEducationInfo(result.educations);
      if(result?.educations[0]?.courseType) {
        setCourseType({ label: result.educations[0].courseType, value: result.educations[0].courseType });
      }

      if(result?.educations[0]?.state) {
        setStates({ label: result.educations[0].state, value: result.educations[0].state });
      }
   
      if(result?.educations[0]?.hasValidity) {
        setvalidateData({ label: "Yes", value: result.educations[0].hasValidity });
      } else {
        setvalidateData({ label: "No", value: result.educations[0].hasValidity });
      }
      
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  const fetchCoursetype = async () => {
    try {
      const result = await getEducationCourseType();
      setCourseData(result.dropDown.options);
    } catch (error: any) {
      console.log("Course Type Error",error);
    }
  }

  useEffect(() => {
    fetchEducationInformation();
    setTimeout(() => {
      fetchCoursetype();
      fetchStateDropDown("65e987764d1b2bac59847cdd");
    },10);
    
  }, [refresh])


  //if (!educationInfo) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView ref={scroll} className='p-3 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
      {educationInfo?.length && educationInfo?.length == 0 ?
        <Typography class='font-PoppinsSemiBold'>
          Add Educational Attainment
        </Typography>
        :
        null
      }
        
        <View className='mt-5' />
        <View className={`${isUpdate ? 'hidden flex-1' : 'block flex-1'}`} style={{ gap: 25 }}>
          {educationInfo?.length && educationInfo?.length > 0 ?
            educationInfo?.map((e, i) => (
              <EducationQualifyCard onUpdate={onUpdate} setRefresh={setRefresh} education={e} key={i} />
            ))
            : (
              <View className='justify-center items-center bottom-4'>
                <Typography variant='xl'>No Education Detail Added</Typography>
              </View>
            )}
        </View>
        {educationInfo?.length && educationInfo?.length == 0 ? <Divider /> : null }
        <Typography class='font-PoppinsSemiBold'>
          Add Educational Attainment
        </Typography>
        <View style={styles.backgroundShadow} className='top-2'>
          {/* @ts-ignore */}
          <MenuDropDown label='Select Course Type*' name="courseType" selectedValue={courseType} setSelectedValue={setCourseType} data={courseData} />
          <Input
            placeholder='Course name'
            label='Course Name*'
            value={formik.values.courseName}
            onChangeText={formik.handleChange("courseName")}
            onBlur={formik.handleBlur("courseName")}
            isError={
              !!formik.touched.courseName &&
              !!formik.errors.courseName
            }
            error={formik.errors.courseName}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
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
            placeholder='Issued by'
            label='Issued by*'
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
          <Input
            placeholder='City'
            label='City'
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            isError={
              !!formik.touched.city &&
              !!formik.errors.city
            }
            error={formik.errors.city}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          {/* @ts-ignore */}
           <MenuDropDown label='State' selectedValue={states} setSelectedValue={setStates} data={statesData} />
           <DateTimePickers
              date={issuedDate}
              onChange={(e) => { handleDateChange(e, 'start') }}
              title="Issued"
           />
           {/* @ts-ignore */}
           <MenuDropDown label='Has Validity' selectedValue={validateData} setSelectedValue={setvalidateData} data={validityData} />
           <DateTimePickers
              date={valildDate}
              onChange={(e) => { handleDateChange(e, 'end') }}
              title="Valid upto"
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
  },
  dropdownContainer: {
    position: 'relative',
    marginBottom: 1,
  },
})

export default EducationalInformation
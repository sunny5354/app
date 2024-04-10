import { View, ScrollView, StyleSheet, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"



import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Divider from '../../components/Divider'
import { UploadedDataProps, selectedValueProp } from '../../types/types'
import MenuDropDown from '../../components/DropDown'
import { IdTypeData, country, gender, state } from '../../data/data'
import BottomButton from '../../components/BottomButton'
import { ScreenNavigationProp } from '../../types/navigation'
import DateTimePickers from '../../components/DateTimePicker'
import TextArea from '../../components/Input/TextArea'
import colors from '../../config/colors'
import UploadCard from '../../components/Cards/UploadCard'
import pdf from "../../assets/icons/pdf.png"
import photo from "../../assets/icons/photo.png"
import { cn } from '../../lib/cn'
import { BasicDataInfoProps } from '../../types/profile'
import { deleteIdProof, editPersonalInforUser, getBasicInfoUser } from '../../http/profile/basic'
import Loading from '../Loading'
import { errorToast, infoToast, successToast } from '../../lib/toast'
import { PersonalInfoProps } from '../../types/http'
import PdfViewCard from '../../components/Cards/PdfViewCard'
import ImageViewCard from '../../components/Cards/ImageViewCard'
import Button from '../../components/Button'
import DeleteModal from '../../components/Modals/DeleteModal'
import { getCounty, getDropDown } from '../../http/util/dropdown'
import { useIsFocused } from '@react-navigation/native'
import { getStatus } from '../../http/home'


const PersonalInformation = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const [date, setDate] = useState(new Date());
  const [states, setStates] = useState([{
    label: "Nothing to show",
    value: '0'
  }])
  const [county, setCounty] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [selectCountry, setSelectedCountry] = useState<selectedValueProp>({ label: "Select Country", value: '0' });
  const [selectGender, setSelectedGender] = useState<selectedValueProp>({ label: "Select Gender", value: '0' });
  const [selectState, setSelectedState] = useState<selectedValueProp>({
    label: "Select State",
    value: '0'
  })
  const [idType, setIdType] = useState([{
    label: "Nothing to show",
    value: "0"
  }])
  const [selectCounty, setSelectedCoutny] = useState<selectedValueProp>({
    label: "Select County", value: "0"
  })
  const [selectIdType, setSelectedIdType] = useState<selectedValueProp>({
    label: "Select ID Type",
    value: '0'
  })
  const [resetUploadCard, setResetUploadCard] = useState(false);
  const [frontOfID, setFrontOfID] = useState<null | UploadedDataProps>(null);
  const [backOfID, setBackOfID] = useState<null | UploadedDataProps>(null);
  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [personalInfo, setPersonalInfo] = useState<BasicDataInfoProps | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [isMarried, setIsMarried] = useState(false);

  const toggleSwitch = () => {
    setIsMarried((previousState) => !previousState);
  };

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  type FormValues = {
    street: string;
    houseNo: string;
    pincode: string;
    // bio: string;
    city: string;
  }

  const validationSchema = yup.object({
    street: yup.string().required("Street is required"),
    houseNo: yup.string().required("House No. is required"),
    pincode: yup.string().required("Required").min(5, 'Minimum 5'),
    // bio: yup.string().required("Required"),
    city: yup.string().required("Required")
  })

  const formik = useFormik({
    initialValues: {
      street: "",
      houseNo: "",
      pincode: "",
      // bio: "",
      city: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      console.log(values, isMarried);
      if (selectIdType.value === '0') {
        infoToast("Please select ID Type");
        return;
      }
      if (!frontOfID || !backOfID) {
        infoToast("Please upload both side of ID");
        return;
      }
      if (!uploadedDoc) {
        infoToast("Please upload CV/Resume");
        return;
      }
      setIsBtnLoading(true);
      try {
        // formik.resetForm();
        const obj: PersonalInfoProps = {
          idProof: {
            idType: selectIdType.value,
            front: frontOfID?._id!,
            back: backOfID?._id!
          },
          resume: uploadedDoc?._id!,
          // bio: values.bio,
          address: {
            city: values.city,
            county: selectCounty.value,
            state: selectState.value,
            street: values.street,
            houseNo: values.houseNo,
            zipCode: parseInt(values.pincode)
          },
          dob: date.toString(),
          gender: selectGender.value,
          maritalStatus: isMarried
        }
        console.log(obj);
        const result = await editPersonalInforUser(obj);
        console.log(result);
        successToast(result.message ?? "Personal Information Updated");
        navigation.goBack();
      } catch (error: any) {
        console.log("personal information error=> ", error.response);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      setIsBtnLoading(false);
    },
  })

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

  const handleDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setDate(currentDate);
  };
  const handleDeleteId = async () => {
    try {
      const res = await deleteIdProof();
      setFrontOfID(null);
      setBackOfID(null);
      setDeleteModal(false);
    } catch (error: any) {
      errorToast(error.response.data.message ?? "Error Occured");
    }
  }

  const fetchPersonalInfo = async () => {
    try {
      const result = await getBasicInfoUser();
      // console.log("personal Info", result);
      setDate(new Date(result.personal.dob));
      setPersonalInfo(result.personal);
      formik.setFieldValue('street', result.personal.address.street);
      formik.setFieldValue('houseNo', result.personal.address.houseNo);
      formik.setFieldValue('pincode', (result.personal.address.zipCode.toString()));
      formik.setFieldValue("bio", result.personal.bio);
      formik.setFieldValue("city", result.personal.address.city);
      setSelectedCountry({ label: result.personal.address.country, value: result.personal.address.country });
      setSelectedState({
        label: result.personal.address.state,
        value: result.personal.address.state
      })
      setSelectedCoutny({
        label: result.personal.address.county,
        value: result.personal.address.county
      })
      setSelectedGender({ label: result.personal.gender, value: result.personal.gender })
      setIsMarried(result.personal.maritalStatus);
      if (result.personal.idProof) {
        setSelectedIdType({ label: result.personal.idProof.idType, value: result.personal.idProof.idType });
        setFrontOfID({ name: result.personal.idProof.front.name, url: result.personal.idProof.front.url, _id: result.personal.idProof.front._id });
        setBackOfID({ name: result.personal.idProof.back.name, url: result.personal.idProof.back.url, _id: result.personal.idProof.back._id });
      }
      if (result.personal.resume) {
        setUploadedDoc({ name: result.personal.resume.name, url: result.personal.resume.url, _id: result.personal.resume._id });
      }
    } catch (error: any) {
      console.log("personal info fetch =>", error.response);
    }
  }

  const fetchStateDropDown = async (_id: string) => {
    try {
      const result = await getDropDown(_id);
      // console.log(result.dropDown.options);
      setStates(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
    }
  }
  useEffect(() => {
    if (selectCountry.value === 'India') {
      fetchStateDropDown("65e9879caa7d608644888b73");
    }
    if (selectCountry.value === "USA") {
      fetchStateDropDown("65e987764d1b2bac59847cdd");
    }
    if (selectCountry.value === "Singapore") {
      fetchStateDropDown("65e986ecdcb8f91445d40337");
    }
  }, [selectCountry])

  useEffect(() => {
    const fetchCounty = async () => {
      if (selectState.value === "0") {
        setCounty([{
          label: "Select state first", value: "0"
        }])
        return;
      }
      try {
        const result = await getCounty(selectState.value);
        const countyData = await result.results.map((_: any, i: number) => {
          const obj = {
            label: _.coty_name[0],
            value: _.coty_name[0]
          }
          return obj;
        })
        setCounty(countyData);
      } catch (error: any) {
        errorToast("Error fetching County");
        console.log("error fetch county drop down", error.response.data.message);
      }
    }
    fetchCounty();
  }, [selectState])

  const fetchIdType = async () => {
    try {
      const result = await getDropDown("65fb37acb483af86024688de");
      setIdType(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching Language");
      console.log("error fetch Language drop down", error.response.data.message);
    }
  }

  useEffect(() => {
    fetchIdType();
  }, [])


  useEffect(() => {
    fetchPersonalInfo();
  }, [])

  if (!personalInfo) return <Loading />

  return (
    <View className='flex-1 relative'>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>General Information</Typography>
          <View className='flex-row flex-1' style={{ gap: 10 }}>
            <View className='flex-1'>
              <DateTimePickers
                date={date}
                onChange={handleDateChange}
                title='Date of Birth*'
              />
            </View>
            <MenuDropDown label='Gender*' selectedValue={selectGender} setSelectedValue={setSelectedGender} data={gender} />
          </View>
          <Typography>Marital Status</Typography>
          <View className='border-border border flex-row justify-center items-center p-4 rounded-xl' style={{ gap: 25 }}>
            <Typography class={cn(isMarried ? 'font-Poppins' : 'font-PoppinsMedium')}>Unmarried</Typography>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={isMarried ? '#7297F7' : '#FD8A94'}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch}
              value={isMarried}
            />
            <Typography class={cn(!isMarried ? 'font-Poppins' : 'font-PoppinsMedium')}>Married</Typography>
          </View>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Location</Typography>
          <View className='flex-1' style={{ gap: 10 }}>
            {/* <MenuDropDown label='Country*' selectedValue={selectCountry} setSelectedValue={setSelectedCountry} data={country} /> */}
            <MenuDropDown label='State/Union Terriotry*' selectedValue={selectState} setSelectedValue={setSelectedState} data={states} />
            <MenuDropDown label='County*' selectedValue={selectCounty} setSelectedValue={setSelectedCoutny} data={county} />
            <View className='h-16 flex-row justify-between items-center' style={{ gap: 20 }}>
              <Input label='City*'
                placeholder='Enter City'
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
              <Input
                label='Zip Code*'
                width='w-28'
                placeholder='000000'
                maxLength={6}
                keyboardType='number-pad'
                value={formik.values.pincode}
                onChangeText={formik.handleChange("pincode")}
                onBlur={formik.handleBlur("pincode")}
                isError={
                  !!formik.touched.pincode &&
                  !!formik.errors.pincode
                }
                error={formik.errors.pincode}
                onSubmitEditing={formik.submitForm as () => void}
                classView='flex-1'
              />
            </View>
            <Input label='Street*'
              placeholder='Street name'
              value={formik.values.street}
              onChangeText={formik.handleChange("street")}
              onBlur={formik.handleBlur("street")}
              isError={
                !!formik.touched.street &&
                !!formik.errors.street
              }
              error={formik.errors.street}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <Input label='House No., Apartment, etc.*'
              placeholder='House no., apt, sweet, etc.'
              value={formik.values.houseNo}
              onChangeText={formik.handleChange("houseNo")}
              onBlur={formik.handleBlur("houseNo")}
              isError={
                !!formik.touched.houseNo &&
                !!formik.errors.houseNo
              }
              error={formik.errors.houseNo}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
          </View>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Documents</Typography>
          <View className='flex-1' style={styles.backgroundShadow}>
            <View className='border-b border-primaryGreen px-2 py-2 '>
              <Typography class='text-center'>ID Proof</Typography>
              <Typography variant='sm'>
                Submit photographs of official identification document issued by the government.
              </Typography>
            </View>
            <View className='p-2 flex-1' style={{ gap: 10 }}>
              <MenuDropDown label='ID Type*' selectedValue={selectIdType} setSelectedValue={setSelectedIdType} data={idType} />
              {!frontOfID ? <UploadCard
                title='Front of ID'
                img={photo}
                shortDesc='JPG or PNG format Max size 5 MB'
                onPress={(res) => {
                  setFrontOfID(res);
                }}
                type={["image/jpeg", "image/png"]}
                reset
              /> : (
                <View className='flex-1 justify-center items-center'>
                  <Typography>Front of ID</Typography>
                  <ImageViewCard _id={frontOfID._id} url={frontOfID.url} name={frontOfID.name} setUploadedDoc={setFrontOfID} />
                </View>
              )}
              {!backOfID ? <UploadCard
                title='Back of ID'
                img={photo}
                shortDesc='JPG or PNG format Max size 5 MB'
                onPress={(res) => {
                  setBackOfID(res);
                }}
                type={["image/jpeg", "image/png"]}
                reset
              /> : (
                <View className='flex-1 justify-center items-center'>
                  <Typography>Back of ID</Typography>
                  <ImageViewCard name={backOfID.name} _id={backOfID._id} url={backOfID.url} setUploadedDoc={setBackOfID} />
                </View>
              )}
            </View>
            {frontOfID && backOfID && <View className='px-5 flex-1 pb-4'>
              <Button onPress={() => { setDeleteModal(true) }} variant='delete'>Delete ID</Button>
            </View>}
          </View>
          <View className='flex-1' style={styles.backgroundShadow}>
            <View className='border-b border-primaryGreen px-2 py-2'>
              <Typography class='text-center'>CV / Resume</Typography>
              <Typography variant='sm'>
                Submit your updated CV or Resume in PDF format.
              </Typography>
            </View>
            <View className='p-2 flex-1'>
              {!uploadedDoc ? <UploadCard
                title=''
                img={pdf}
                shortDesc='PDF format only Max size 10 MB'
                onPress={(res) => {
                  setUploadedDoc(res);
                }}
                type={["application/pdf"]}
                reset
              /> : (
                <PdfViewCard setUploadedDoc={setUploadedDoc} name={uploadedDoc.name}
                  _id={uploadedDoc._id}
                  url={uploadedDoc.url}
                />
              )}
            </View>
          </View>
        </View>
        <Divider />
        {/* <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Brief Bio</Typography>
          <TextArea
            placeholder='Describe yourself...'
            value={formik.values.bio}
            onChangeText={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            isError={
              !!formik.touched.bio &&
              !!formik.errors.bio
            }
            error={formik.errors.bio}
            onSubmitEditing={formik.submitForm as () => void}
          />
        </View> */}
      </ScrollView>
      <BottomButton
        // onPress={() => { }}
        onPress={formik.handleSubmit as (values: any) => any}
        text='Save'
        disabled={role === "agency-clinician" && userStatus !== "Active"}
      />
      <DeleteModal
        modalVisible={deleteModal}
        handleDelete={() => { handleDeleteId() }}
        handleModalVisible={() => { setDeleteModal(false) }}
        text="Are you sure you want to delete ID's?"
        label='ID'
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
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    gap: 10,
  }
})

export default PersonalInformation
import { Image, Pressable, ScrollView, StatusBar, Switch, View, useWindowDimensions } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

// custom imports
import Input from '../../components/Input';
import { ScreenNavigationProp } from '../../types/navigation';
import colors from '../../config/colors';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Typography from '../../components/Typography/Typography';
import MenuDropDown from '../../components/DropDown';
import { imagePdfFileTypeProps, selectedValueProp } from '../../types/types';
import { gender } from '../../data/data';
import DateTimePickers from '../../components/DateTimePicker';
import { addBasicInfoUser } from '../../http/profile/basic';
import { AuthContext } from '../../store/authContext';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { getBasicProfile } from '../../http/user';
import Loading from '../Loading';
import ImageModal from '../../components/Modals/ImageModal';
import { getAgencyNames, getCounty, getDropDown } from '../../http/util/dropdown';
import india from "../../assets/Profile/india.png";
import MultiDropDown from '../../components/DropDown/MultiDropDown';
import { sendAccountPhoneCode, sendAccountVerifyPhoneCode } from '../../http/profile/account';
import { useIsFocused } from '@react-navigation/native';

const agencyType = [
  { label: "Hospice", value: "Hospice" },
  { label: "Home Health", value: "Home Health" }
]

export default function RegisterProfile({ navigation }: { navigation: ScreenNavigationProp }) {
  const authCtx = useContext(AuthContext);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState<{ avatar: imagePdfFileTypeProps, isPhoneVerified: boolean } | null>(null);

  const [states, setStates] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [county, setCounty] = useState([{
    label: "Select state first", value: "0"
  }]);
  const [ethinicity, setEthnicity] = useState([{
    label: "Nothing to show", value: "0"
  }])
  const [workProfile, setWorkProfile] = useState([{
    label: "Nothing to show",
    value: "0"
  }]);

  const [agencyStates, setAgencyStates] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [agencyCounty, setAgencyCounty] = useState([{
    label: "Select state first", value: "0"
  }]);
  const [agencyName, setAgencyName] = useState([{
    label: "Select Agency / County", value: "0"
  }])
  const [language, setLanguage] = useState([{
    label: "Nothing to Show", value: "0"
  }])

  const [selectGender, setSelectedGender] = useState<selectedValueProp>({ label: "Male", value: 'Male' });
  const [selectCountry, setSelectedCountry] = useState<selectedValueProp>({ label: "USA", value: 'USA', img: india });
  const [selectAgency, setSelectedAgency] = useState<selectedValueProp>({ label: "Select Agency", value: '0' });
  const [selectedAgencyName, setSelectedAgencyName] = useState<selectedValueProp>({
    label: "Select Agency Name", value: "0"
  })
  const [selectedState, setSelectedState] = useState<selectedValueProp>({
    label: "Select State", value: "0"
  })
  const [selectCounty, setSelectedCounty] = useState<selectedValueProp>({ label: "Select County", value: '0' });
  const [selectedEthinicity, setSelectedEthinicity] = useState({
    label: "Select Ethinicity", value: "0"
  })
  const [selectedWorkProfile, setSelectedWorkProfile] = useState({
    label: "Select Work Profile",
    value: "0"
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string[] | null>(null);
  const [selectedAgencyState, setSelectedAgencyState] = useState<selectedValueProp>({
    label: "Select State", value: "0"
  })
  const [selectAgencyCounty, setSelectedAgencyCounty] = useState<selectedValueProp>({ label: "Select County", value: '0' });
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [usCitizen, setUsCitizen] = useState(false);
  const [isAuthWork, setIsAuthWork] = useState(false);

  const toggleSwitch = () => {
    setIsEnrolled((previousState) => !previousState);
  };
  const toggleSwitch1 = () => {
    setUsCitizen((previousState) => !previousState);
  };
  const toggleSwitch2 = () => {
    setIsAuthWork((previousState) => !previousState);
  };


  const [countryCode, setCountryCode] = useState("+91");

  type FormValues = {
    firstName: string;
    lastName: string;
    middleName: string;
    street: string;
    houseNo: string;
    phone: string;
    pincode: string;
    city: string;
   
  }

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    middleName: yup.string().optional(),
    street: yup.string().required("Street is required"),
    houseNo: yup.string().required("House No. is required"),
    phone: yup.string().required("Mobile Number is required").min(10, "Please enter a valid phone number").max(10),
    pincode: yup.string().required("Required").min(5, "Min 6").max(5),
    city: yup.string().required("Required"),
   
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      street: "",
      houseNo: "",
      phone: "",
      pincode: "",
      city: "",
     
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if(!user?.isPhoneVerified){
        infoToast("Please verify your phone number");
        return;
      }
      if (selectGender.value === '0') {
        infoToast("Please select gender");
        return;
      }
      if (selectCounty.value === '0') {
        infoToast('Please Select County');
        return;
      }
      if (selectedState.value === '0') {
        infoToast('Please Select State');
        return;
      }

      if (selectedEthinicity.value === "0") {
        infoToast("Please select Ethinicity");
        return;
      }
      if (selectedWorkProfile.value === "0") {
        infoToast("Please select Work Profile");
        return;
      }
      if (selectedLanguage === null) {
        infoToast("Please select Language");
        return;
      }
      if (isEnrolled && selectedAgencyName.value === "0") {
        infoToast("Please select Agency Name");
        return;
      }

      // console.log(values);
      setIsBtnLoading(true);
      const basicInfoObject = {
        "fullName": (values.firstName + " " + values.lastName),
        "phone": values.phone,
        "dob": date,
        "gender": selectGender.value,
        "address": {
          "county": selectCounty.value,
          "state": selectedState.value,
          "city": values.city,
          "zipCode": values.pincode,
          "street": values.street,
          "houseNo": values.houseNo
        },
        "ethnicity": selectedEthinicity.value,
        "workProfile": selectedWorkProfile.value,
        "language": selectedLanguage,        
        "usCitizen": usCitizen,
        "usWorkAuthorization": isAuthWork,
        "agency": selectedAgencyName.value
      }
      console.log("ye wala=>", basicInfoObject.language);
      //@ts-ignore
      if (!isEnrolled) delete basicInfoObject.agency;
      try {
        const result = await addBasicInfoUser(basicInfoObject);
        authCtx.validateTempToUser()
        successToast(result.message);
      } catch (error: any) {
        console.log("Basic profile Update error =>", error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      setIsBtnLoading(false);
    },
  })
  const handleDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setDate(currentDate);
  };

  const sendOTP = async () => {
    const num = (formik.values.phone);
   // if (num.length !== 10) {
   //   errorToast("Phone must be of 10digits");
   //   return;
  //  }   
    try {
      const res = await sendAccountVerifyPhoneCode(formik.values.phone);
      console.log("account phone send otp =>", res);
      navigation.navigate("OTP", { isAuthPhone: true, phoneNumber: formik.values.phone })
      successToast(res.message)
    } catch (error: any) {
      console.log(error.response.data.message);
      errorToast(error.response.data.message ?? "Error Occured");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Basic Information',
      headerLeft: () => (
        <Typography variant='xl' class='text-white font-PoppinsSemiBold'>Profile Info</Typography>
      ),
      // headerRight: () => (
      //   <View className='w-28'>
      //     <Button
      //       onPress={formik.handleSubmit as (values: any) => any}
      //       variant='secondary'
      //       className='py-2 px-5'
      //     >Done</Button>
      //   </View>
      // ),
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'transparent'
      },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: colors.primaryGreen
      },
    })
  }, [])

  const fetchStateDropDown = async (_id: string) => {
    try {
      const result = await getDropDown(_id);
      // console.log(result.dropDown.options);
      setStates(result.dropDown.options);
      setAgencyStates(result.dropDown.options);
      // setSelectedState({
      //   label: "Select State", value: "0"
      // })
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
    }
  }
  const fetchEthinicity = async () => {
    try {
      const result = await getDropDown("65fcfdd2b6a5e40ddf038a5d");
      setEthnicity(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching Ethinicity");
      console.log("error fetch Ethinicity drop down", error.response.data.message);
    }
  }
  const fetchWorkProfile = async () => {
    try {
      const result = await getDropDown("65e98815829fb11975af0854");
      setWorkProfile(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching Ethinicity");
      console.log("error fetch Ethinicity drop down", error.response.data.message);
    }
  }
  const fetchLanguage = async () => {
    try {
      const result = await getDropDown("65fcffcee38519509d95ddb2");
      setLanguage(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching Language");
      console.log("error fetch Language drop down", error.response.data.message);
    }
  }

  useEffect(() => {
    fetchEthinicity();
    fetchWorkProfile();
    fetchLanguage();
  }, [])

  useEffect(() => {
    if (selectCountry.value === 'India') {
      fetchStateDropDown("65e9879caa7d608644888b73");
      setCountryCode("+91");
    }
    if (selectCountry.value === "USA") {
      fetchStateDropDown("65e987764d1b2bac59847cdd");
      setCountryCode("+1");
    }
    if (selectCountry.value === "Singapore") {
      fetchStateDropDown("65e986ecdcb8f91445d40337");
      setCountryCode("+65");
    }
  }, [selectCountry])

  useEffect(() => {
    const fetchCounty = async () => {
      if (selectedAgencyState.value === "0") {
        setAgencyCounty([{
          label: "Select state first", value: "0"
        }])
        return;
      }
      try {
        const result = await getCounty(selectedAgencyState.value);
        const countyData = await result.results.map((_: any, i: number) => {
          const obj = {
            label: _.coty_name[0],
            value: _.coty_name[0]
          }
          return obj;
        })
        console.log(countyData);
        setAgencyCounty(countyData);
      } catch (error: any) {
        errorToast("Error fetching County");
        console.log("error fetch county drop down", error.response.data.message);
      }
    }
    fetchCounty();
  }, [selectedAgencyState])
  useEffect(() => {
    const fetchCounty = async () => {
      if (selectedState.value === "0") {
        setCounty([{
          label: "Select state first", value: "0"
        }])
        return;
      }
      try {
        const result = await getCounty(selectedState.value);
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
  }, [selectedState])

  useEffect(() => {
    const fetchAgencyNames = async () => {
      try {
        const res = await getAgencyNames(selectAgencyCounty.value, selectAgency.value);
        // console.log(res);
        if (res.agencys.length === 0) {
          setAgencyName([{
            label: "No Agency Found", value: "0"
          }])
          return;
        }
        setAgencyName(res.agencys);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
    fetchAgencyNames();
  }, [selectAgency, selectAgencyCounty])


  // update profile picture
  const [profileImgModal, setProfileImgModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const fetchProfile = async () => {
    try {
      const result = await getBasicProfile();
      setUser(result);
      // console.log("fetchProfile=>", result);
      if (result) {
        const firstName = result.fullName.split(" ")[0];
        const lastName = result.fullName.split(" ")[1];
        formik.setFieldValue("firstName", firstName);
        formik.setFieldValue("lastName", lastName);
      }
    } catch (error: any) {
      console.log("fetch profile error=>", error.response.data.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [refresh, isFocused])

  if (!user) return <Loading />

  return (
    <ScrollView contentContainerStyle={{
      position: 'relative',
      backgroundColor: '#ffffff',
    }}>
      <StatusBar
        animated={true}
        barStyle={'default'}
        backgroundColor={colors.primaryGreen}
      />
      <View className='flex-1 py-5 bg-white'>
        <View className='px-4 justify-center items-center flex-1'>
          <View className='w-full flex-1' style={{ gap: 20 }}>
            <View className='justify-between'>
              <View className='items-center justify-center'>
                <View className='relative mb-5'>
                  <Image
                    source={{ uri: user.avatar.url }}
                    alt='Profile'
                    height={600}
                    width={600}
                    className='h-32 w-32 bg-primaryGreen rounded-full'
                  />
                  <Pressable onPress={() => { setProfileImgModal(true) }} className='bg-primaryGreen p-2 rounded-full absolute right-2 bottom-2'>
                    <FontAwesome5 name="camera" size={16} color="white" />
                  </Pressable>
                </View>
              </View>
              <View className='flex-row flex-1' style={{ gap: 10 }}>
                <Input label='First Name*'
                  width='w-52'
                  value={formik.values.firstName}
                  onChangeText={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  isError={
                    !!formik.touched.firstName &&
                    !!formik.errors.firstName
                  }
                  error={formik.errors.firstName}
                  onSubmitEditing={formik.submitForm as () => void}
                  classView='flex-1'
                />
                <View className='flex-row flex-1' style={{ gap: 10 }}>
                  <Input label='Last Name*'
                    // width='w-48'
                    classView='flex-1'
                    value={formik.values.lastName}
                    onChangeText={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    isError={
                      !!formik.touched.lastName &&
                      !!formik.errors.lastName
                    }
                    error={formik.errors.lastName}
                    onSubmitEditing={formik.submitForm as () => void}
                  />
                </View>
              </View>
            </View>
            <View className='flex-row justify-center items-start flex-1' style={{ gap: 5 }}>
              <Typography variant='xsm' class='font-PoppinsSemiBold'>Note:</Typography>
              <Typography variant='xsm' class='flex-1'>
                Once summited, Name can't be changed.
              </Typography>
            </View>
            <View className='flex-1 min-h-[50px] flex-row justify-between items-center' style={{ gap: 10 }} >
              <View className='flex-1'>
                <DateTimePickers
                  date={date}
                  onChange={handleDateChange}
                  title="Date of Birth"
                />
              </View>
              <MenuDropDown classView='flex-1' label='Gender*' selectedValue={selectGender} setSelectedValue={setSelectedGender} data={gender} />
            </View>
          </View>
          <Divider />
          <View className='flex-1 w-full items-start' style={{ gap: 10, flex: 1 }}>
            <Typography class='font-PoppinsSemiBold' variant='sm'>Address</Typography>
            {/* <MenuDropDown label='Country*' selectedValue={selectCountry} setSelectedValue={setSelectedCountry} data={country} /> */}
            <Input label='House/Apartment No.'
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
            />
            <Input label='Street / Address*'
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
            />
            <View className='h-16 flex-row justify-between items-center' style={{ gap: 20 }}>
              <Input
                label='City*'
                classView='flex-1'
                placeholder='City'
                value={formik.values.city}
                onChangeText={formik.handleChange("city")}
                onBlur={formik.handleBlur("city")}
                isError={
                  !!formik.touched.city &&
                  !!formik.errors.city
                }
                error={formik.errors.city}
                onSubmitEditing={formik.submitForm as () => void}
              />
            </View>
            <MenuDropDown label='State*' selectedValue={selectedState} setSelectedValue={setSelectedState} data={states} />
            <MenuDropDown label='County*' selectedValue={selectCounty} setSelectedValue={setSelectedCounty} data={county} />
            <Input
              label='Zip Code'
              placeholder='00000'
              maxLength={5}
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
            />
          </View >
          <Divider />
          <View className='flex-1 min-h-20 w-full'>
            <Typography variant='sm'>Mobile Number*</Typography>
            <View className='flex-1 flex-row justify-between items-center' style={{ gap: 10 }}>
              {/* <Input
                width='w-16'
                placeholder={countryCode}
                editable={false}
                className='justify-center items-center text-center text-lg'
                isError={
                  !!formik.touched.phone &&
                  !!formik.errors.phone
                }
              /> */}
              <Input
                classView='flex-1'
                placeholder='00000000000'
                className='text-lg'
                keyboardType='number-pad'
                maxLength={10}
                value={formik.values.phone}
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                isError={
                  !!formik.touched.phone &&
                  !!formik.errors.phone
                }
                error={formik.errors.phone}
                onSubmitEditing={formik.submitForm as () => void}
              />
            </View>
            <View className='flex-row items-center' style={{ gap: 10 }}>
              <Button
                onPress={() => {
                  sendOTP();
                }}
                variant={user.isPhoneVerified ? 'verified' : 'pending'} className='px-0'>{user.isPhoneVerified ? "Verified" : 'Get OTP'}</Button>
              <Typography
                variant='xsm' class='flex-[1.5]'>{user.isPhoneVerified ? "Your phone is verified." : "Your phone is not verified"}</Typography>
            </View>
          </View>
      
          <View style={{ gap: 15, marginVertical: 10 }}>
            <MenuDropDown label='Ethnicity*' selectedValue={selectedEthinicity} setSelectedValue={setSelectedEthinicity} data={ethinicity} />
            <MenuDropDown label='Work Profile*' selectedValue={selectedWorkProfile} setSelectedValue={setSelectedWorkProfile} data={workProfile} />
            <MultiDropDown label='Languages' selectedValue={selectedLanguage} setSelectedValue={setSelectedLanguage} data={language} />
          </View>
          <View className='flex-row justify-between my-2 flex-1'>
            <Typography class='flex-1'> Are you a US Citizen?</Typography>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={usCitizen ? '#7297F7' : '#FD8A94'}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch1}
              value={usCitizen}
            />
          </View>
          <View className='flex-row justify-between my-2 flex-1'>
            <Typography class='flex-1'> Are you authorized to work in the US?</Typography>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={isAuthWork ? '#7297F7' : '#FD8A94'}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch2}
              value={isAuthWork}
            />
          </View>
          <View className='flex-row justify-between my-2 flex-1'>
            <Typography class='flex-1'>Are you currently enrolled with any
              Agency?</Typography>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={isEnrolled ? '#7297F7' : '#FD8A94'}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch}
              value={isEnrolled}
            />
          </View>
          {
            isEnrolled && <View style={{ gap: 20 }}>
              <MenuDropDown label='Agency Category*' selectedValue={selectAgency} setSelectedValue={setSelectedAgency} data={agencyType} />
              <MenuDropDown label='Agency State*' selectedValue={selectedAgencyState} setSelectedValue={setSelectedAgencyState} data={agencyStates} />
              <MenuDropDown label='Agency County*' selectedValue={selectAgencyCounty} setSelectedValue={setSelectedAgencyCounty} data={agencyCounty} />
              <MenuDropDown label='Agency Name*' selectedValue={selectedAgencyName} setSelectedValue={setSelectedAgencyName} data={agencyName} />
            </View>
          }

          <Button
            onPress={formik.handleSubmit as (values: any) => any}
            className='flex-1'
            classView='flex-1 w-full'
          >Submit</Button>
        </View>
      </View>
      <ImageModal
        modalVisible={profileImgModal}
        handleModalVisible={() => { setProfileImgModal(false) }}
        setRefresh={setRefresh}
        basic={true}
      />
    </ScrollView>
  );
}


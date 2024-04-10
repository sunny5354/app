import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup";



import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Divider from '../../components/Divider'
import { selectedValueProp } from '../../types/types'
import MenuDropDown from '../../components/DropDown'
import { country, state } from '../../data/data'
import BottomButton from '../../components/BottomButton'
import Button from '../../components/Button'
import { ScreenNavigationProp } from '../../types/navigation'
import { editAccount, getAccount, sendAccountEmailCode, sendAccountPhoneCode } from '../../http/profile/account';
import { AccountDataInfoProps } from '../../types/profile';
import { AccountInfoProps } from '../../types/http';
import Loading from '../Loading';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../store/authContext';
import { getCounty, getDropDown } from '../../http/util/dropdown';
import { getStatus } from '../../http/home';
// import india from "../../assets/Profile/india.png";


const AccountInformation = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const [states, setStates] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [county, setCounty] = useState([{
    label: "Nothing to show", value: "0"
  }]);

  const [selectGender, setSelectedGender] = useState<selectedValueProp>({ label: "Male", value: 'Male' });
  const [selectCountry, setSelectedCountry] = useState<selectedValueProp>({ label: "India", value: 'India' });
  const [selectState, setSelectedState] = useState<selectedValueProp>({
    label: "Select State", value: "0"
  })
  const [selectCounty, setSelectedCoutny] = useState<selectedValueProp>({
    label: "Select County", value: "0"
  })

  const [accountInfo, setAccountInfo] = useState<AccountDataInfoProps | null>(null);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
  }

  const validationSchema = yup.object({
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    email: yup.string().required("Email is required").email("Must be a valid email"),
    phone: yup.string().required("Phone is required"),
    city: yup.string().required("City is required")
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      setIsBtnLoading(true);
      try {
        if (accountInfo) {
          const obj: AccountInfoProps = {
            avatar: accountInfo?.avatar,
            location: {
              city: values.city,
              state: selectState.value,
              county: selectCounty.value
            }
          }
          if (values.email !== accountInfo.email) {
            obj.email = values.email;
          }
          if (values.phone !== accountInfo.phone) {
            obj.phone = values.phone;
          }
          console.log(obj);
          const result = await editAccount(obj);
          // console.log(result);
          successToast(result.message);
          fetchAccountInfo();
          navigation.goBack();
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
      setIsBtnLoading(false);
    },
  })

  const successToast = (text: string) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }

  const errorToast = (text: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }

  const sendOTP = async (platform: "email" | "phone") => {
    if (platform === 'email') {
      try {
        const res = await sendAccountEmailCode();
        console.log("account email send otp =>", res);
        successToast(res.message)
        navigation.navigate("OTP", { isEmail: true, email: formik.values.email })
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
    else {
      // console.log(formik.values.phone);
      try {
        const res = await sendAccountPhoneCode(formik.values.phone);
        console.log("account phone send otp =>", res);
        navigation.navigate("OTP", { isPhone: true, phoneNumber: formik.values.phone })
        successToast(res.message)
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
  }
  const fetchStateDropDown = async (_id: string) => {
    try {
      const result = await getDropDown("65e987764d1b2bac59847cdd");
      // console.log(result.dropDown.options);
      setStates(result.dropDown.options);
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
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



  const fetchAccountInfo = async () => {
    try {
      const result = await getAccount();
      setAccountInfo(result.user);
      if (result.user) {
        formik.setFieldValue("firstName", result.user.fullName.split(" ")[0]);
        formik.setFieldValue("lastName", result.user.fullName.split(" ")[1]);
        formik.setFieldValue("email", result.user.email);
        formik.setFieldValue("phone", result.user.phone);
        formik.setFieldValue("city", result.user.location.city);
        setSelectedCountry({
          label: result.user.location.country,
          value: result.user.location.country
        })
        setSelectedState({
          label: result.user.location.state,
          value: result.user.location.state
        })
        setSelectedCoutny({
          label: result.user.location.county,
          value: result.user.location.county
        })
      }
    } catch (error: any) {
      console.log(error.response.data.message);
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

  useEffect(() => {
    fetchAccountInfo();
  }, [isFocused])


  if (!accountInfo) return <Loading />

  return (
    <View className='flex-1 relative'>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Name</Typography>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography variant='xl'>{formik.values.firstName} {formik.values.lastName}</Typography>
          </View>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Location</Typography>
          <View className='flex-1' style={{ gap: 10 }}>
            <MenuDropDown label='State/Union Terriotry*' selectedValue={selectState} setSelectedValue={setSelectedState} data={states} />
            <MenuDropDown label='County*' selectedValue={selectCounty} setSelectedValue={setSelectedCoutny} data={county} />
            <Input
              label='City*'
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
          </View>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Contacts</Typography>
          <View className='flex-1' style={{ gap: 10 }}>
            <Input
              label='Email'
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              isError={
                !!formik.touched.email &&
                !!formik.errors.email
              }
              error={formik.errors.email}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <View className='flex-row items-center' style={{ gap: 10 }}>
              <Button
                onPress={() => {
                  sendOTP("email")
                }}
                variant={accountInfo.isEmailVerified ? 'verified' : 'pending'} className='px-0'>{accountInfo.isEmailVerified ? "Verified" : 'Get OTP'}</Button>
              <Typography variant='xsm' class='flex-[1.5]'>{accountInfo.isEmailVerified ? "Your email is verified." : "Your email is not verified"}</Typography>
            </View>
          </View>
          <View className='flex-1' style={{ gap: 10 }}>
            <Input
              label='Mobile'
              value={formik.values.phone}
              onChangeText={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              isError={
                !!formik.touched.phone &&
                !!formik.errors.phone
              }
              error={formik.errors.phone}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <View className='flex-row items-center' style={{ gap: 10 }}>
              <Button
                onPress={() => {
                  sendOTP("phone");
                }}
                variant={accountInfo.isPhoneVerified ? 'verified' : 'pending'} className='px-0'>{accountInfo.isPhoneVerified ? "Verified" : 'Get OTP'}</Button>
              <Typography

                variant='xsm' class='flex-[1.5]'>{accountInfo.isPhoneVerified ? "Your phone is verified." : "Your phone is not verified"}</Typography>
            </View>
          </View>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography>Manage Password</Typography>
          <Button onPress={() => {
            navigation.navigate("ChangePassword")
          }}>Change Password</Button>
        </View>
      </ScrollView>
      <BottomButton
        onPress={formik.handleSubmit as (values: any) => any}
        text='Save'
        disabled={(role === "agency-clinician") && userStatus !== "Active"}
      />
    </View>
  )
}

export default AccountInformation
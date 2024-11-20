import { View, ScrollView, Switch, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';

import BottomButton from '../../components/BottomButton'
import { selectedValueProp } from '../../types/types'
import MenuDropDown from '../../components/DropDown'
import { daysData, prefredShiftTypeData, state, workTypeData } from '../../data/data'
import Divider from '../../components/Divider'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import { cn } from '../../lib/cn'
import { WorkPrefrenceProps } from '../../types/http'
import { addWorkPrefrence, getWorkPrefrence, getWorkProfileDropDown } from '../../http/profile/workPrefrence'
import { errorToast, successToast } from '../../lib/toast'
import { getCounty, getDropDown } from '../../http/util/dropdown'
import MultiDropDown from '../../components/DropDown/MultiDropDown';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import { getStatus } from '../../http/home';

const WorkPrefrence = () => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [workProfile, setWorkProfile] = useState([
    {
      label: "Something went wrong!",
      value: "0"
    }
  ]);
  const [states, setStates] = useState([{
    label: "Nothing to show", value: "0"
  }]);
  const [county, setCounty] = useState([{
    label: "Select state first", value: "0"
  }]);

  const [selectedState, setSelectedState] = useState({
    label: "Select State",
    value: "0"
  })
  const [selectedCounty, setSelectedConty] = useState({
    label: "Select County",
    value: "0"
  })


  const [selectWorkProfile, setSelectedWorkProfile] = useState<selectedValueProp>({
    label: "Select Work Profile",
    value: '0'
  })
  const [selectWorkType, setSelectedWorkType] = useState<selectedValueProp>({
    label: "Select Work Type",
    value: '0'
  })
  const [prefredShiftType, setPreferedShiftType] = useState<string[] | null>(null);
  const [selectWorkPrefrence, setSelectedWorkPrefrence] = useState<selectedValueProp>({
    label: "Select State",
    value: '0'
  })
  const [isAvailableOnCall, setIsAvailableOnCall] = useState(false);
  const [handleDays, setHandleDays] = useState<string[] | null>(null);
  const [handleCallDays, setHandleCallDays] = useState<string[] | null>(null);

  const handleDaysPress = (value: string) => {
    setHandleDays(prevState => {
      if (prevState === null) {
        return [value];
      } else {
        const index = prevState.findIndex(day => day === value);
        if (index === -1) {
          return [...prevState, value];
        } else {
          const val = prevState.filter(day => day !== value);
          if (val.length === 0) {
            return null;
          }
          else return val;
        }
      }
    });
  };
  const handleCallDaysPress = (value: string) => {
    setHandleCallDays(prevState => {
      if (prevState === null) {
        return [value];
      } else {
        const index = prevState.findIndex(day => day === value);
        if (index === -1) {
          return [...prevState, value];
        } else {
          const val = prevState.filter(day => day !== value);
          if (val.length === 0) {
            return null;
          }
          else return val;
        }
      }
    });
  };

  const toggleSwitch = () => {
    setIsAvailableOnCall((previousState) => !previousState);
  };

  interface FormValues {
    city: string,
    payRate: string
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      city: "",
      payRate: ""
    },
    validationSchema: yup.object({
      city: yup.string().required("City is required"),
      payRate: yup.string().required("Pay Rate is required")
    }),
    onSubmit: (values) => {
      // console.log(values);
      handleSubmit(values);
    }
  })

  const handleSubmit = async (values: FormValues) => {
    if (selectedState.value === "0") {
      errorToast("Please select state")
      return;
    }
    if (selectedCounty.value === "0") {
      errorToast("Please select county")
      return;
    }
    if (selectWorkProfile.value === "0") {
      errorToast("Please select work profile")
      return;
    }
    if (selectWorkType.value === "0") {
      errorToast("Please select work type")
      return;
    }
    if (prefredShiftType === null) {
      errorToast("Please select prefered shift type")
      return;
    }
    if (handleDays === null) {
      errorToast("Please select days")
      return;
    }
    if (isAvailableOnCall && handleCallDays === null) {
      errorToast("Please select call days");
      return;
    }
    const data: WorkPrefrenceProps = {
      workProfile: selectWorkProfile.value,
      workType: selectWorkType.value,
      shiftPreference: prefredShiftType,
      availableDays: handleDays,
      onCalls: isAvailableOnCall,
      location: {
        state: selectedState.value,
        county: selectedCounty.value,
        city: values.city
      },
      payRate: values.payRate
    }

    if (isAvailableOnCall) {
      //@ts-expect-error
      data.onCallDays = handleCallDays
    }

    console.log(data);

    try {
      const result = await addWorkPrefrence(data);
      console.log(result);
      successToast(result.message);
      navigation.goBack();
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const fetchWorkPrefrence = async () => {
    try {
      const result = await getWorkPrefrence();
      // console.log(result);
      if (result.preferences) {
        setIsAvailableOnCall(result.preferences.onCalls);
        setHandleDays(result.preferences.availableDays);
        setHandleCallDays(result.preferences.onCallDays);

        formik.setFieldValue("payRate", result.preferences.payRate.toString());
        setSelectedWorkProfile({
          label: result.preferences.workProfile,
          value: result.preferences.workProfile
        });
        setSelectedWorkType({
          label: result.preferences.workType,
          value: result.preferences.workType
        });
        setPreferedShiftType(result.preferences.shiftPreference);
      }
      setSelectedState({
        label: result.preferences.location.state,
        value: result.preferences.location.state
      });
      setSelectedConty({
        label: result.preferences.location.county,
        value: result.preferences.location.county
      });
      formik.setFieldValue("city", result.preferences.location.city);

    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  const fetchStateDropDown = async () => {
    try {
      const result = await getDropDown("65e987764d1b2bac59847cdd");
      // console.log(result.dropDown.options);
      setStates(result.dropDown.options);
      // setSelectedState({
      //   label: "Select State", value: "0"
      // })
    } catch (error: any) {
      errorToast("Error fetching State");
      console.log("error fetch state drop down", error.response.data.message);
    }
  }

  const fetchWorkProfileDropDown = async () => {
    try {
      const res = await getWorkProfileDropDown();
      setWorkProfile(res.dropDown.options);
    } catch (error: any) {
      console.log(error.response.data.message);
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

  useEffect(() => {
    fetchWorkPrefrence();
    fetchWorkProfileDropDown();
    fetchStateDropDown();
  }, [])

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
  }, [selectedState.value])



  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView className=' bg-white flex-1 p-4' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='flex-1 mt-2' style={{ gap: 20 }}>
          <MenuDropDown label='Work Profile*' selectedValue={selectWorkProfile} setSelectedValue={setSelectedWorkProfile} data={workProfile} />
          <MenuDropDown label='Job Type*' selectedValue={selectWorkType} setSelectedValue={setSelectedWorkType} data={workTypeData} />
        </View>
        <Divider />
        <View style={{ gap: 20 }}>
          <Typography variant='smb'>Location</Typography>
          <MenuDropDown label='State*' selectedValue={selectedState} setSelectedValue={setSelectedState} data={states} />
          <MenuDropDown label='County*' selectedValue={selectedCounty} setSelectedValue={setSelectedConty} data={county} />
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
          />
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 20 }}>
          <Typography variant='smb'>Shifts & Pay Rate</Typography>
          <MultiDropDown label='Preferred Shifts*' selectedValue={prefredShiftType} setSelectedValue={setPreferedShiftType} data={prefredShiftTypeData} />
          <Input
            label='Minimum Pay Rate*'
            value={formik.values.payRate}
            onChangeText={formik.handleChange("payRate")}
            onBlur={formik.handleBlur("payRate")}
            isError={
              !!formik.touched.payRate &&
              !!formik.errors.payRate
            }
            error={formik.errors.payRate}
            onSubmitEditing={formik.submitForm as () => void}
          />
        </View>
        <Divider />
        <View style={{ gap: 20 }}>
          <View className='flex-1' style={{ gap: 20 }}>
            <Typography variant='smb'>I am available on</Typography>
            <View className='flex-row justify-between items-center flex-wrap'>
              {
                daysData.map((_, i) => (
                  <Pressable onPress={() => { handleDaysPress(_.value) }} key={i} className={cn('border border-primaryGreen h-10 w-10 justify-center items-center rounded-full',
                    handleDays?.includes(_.value) ? "bg-primaryGreen" : "bg-white"
                  )}>
                    <Typography
                      class={cn(handleDays?.includes(_.value) ? 'text-white' : 'text-black')}
                    >{_.label}</Typography>
                  </Pressable>
                ))
              }
            </View>
          </View>
          <View className='flex-1 flex-row justify-between items-center mt-4' style={{ gap: 10 }}>
            <View className='flex-1'>
              <Typography variant='sm'>I am willing to enroll myself to provide
                services On Call (After Hours).</Typography>
            </View>
            <View className=''>
              <Switch
                trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
                thumbColor={isAvailableOnCall ? '#7297F7' : '#FD8A94'}
                ios_backgroundColor="#D9D9D9"
                onValueChange={toggleSwitch}
                value={isAvailableOnCall}
              />
            </View>
          </View>
          {isAvailableOnCall && <View className='flex-1' style={{ gap: 20 }}>
            <Typography variant='smb'>I am available on</Typography>
            <View className='flex-row justify-between items-center flex-wrap'>
              {
                daysData.map((_, i) => (
                  <Pressable onPress={() => { handleCallDaysPress(_.value) }} key={i} className={cn('border border-primaryGreen h-10 w-10 justify-center items-center rounded-full',
                    handleCallDays?.includes(_.value) ? "bg-primaryGreen" : "bg-white"
                  )}>
                    <Typography
                      class={cn(handleCallDays?.includes(_.value) ? 'text-white' : 'text-black')}
                    >{_.label}</Typography>
                  </Pressable>
                ))
              }
            </View>
          </View>}
        </View>
      </ScrollView>
      <BottomButton
        // onPress={handleSubmit}
        onPress={formik.handleSubmit as (values: any) => any}
        disabled={role === "agency-clinician" && userStatus !== "Active"}
        text='Save'
      />
    </View>
  )
}

export default WorkPrefrence
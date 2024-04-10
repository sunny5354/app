import { View, ScrollView, Pressable, Platform, ToastAndroid } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"


import { ScreenNavigationProp } from '../../types/navigation'
import Typography from '../../components/Typography/Typography'
import BottomButton from '../../components/BottomButton'
import PasswordInput from '../../components/Input/PasswordInput'
import { errorToast, successToast } from '../../lib/toast'
import { editPassword } from '../../http/profile/account'
import { ChangePasswordProps } from '../../types/http'

const ChangePassword = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  type FormValues = {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }

  const validationSchema = yup.object({
    currentPassword: yup.string().required("Current Password is required"),
    password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
  })

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      console.log("values", values);
      setIsBtnLoading(true);
      try {

        const obj: ChangePasswordProps = {
          oldPassword: values.currentPassword,
          newPassword: values.password,
          confirmPassword: values.confirmPassword
        }
        const result = await editPassword(obj);
        console.log("changepassword result=> ", result);
        successToast(result.message);
        navigation.goBack();
      } catch (error: any) {
        console.log("changepassword error=> ", error.response.data);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      setIsBtnLoading(false);
    },
  })


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Change Password',
      headerShown: false
    })
  }, [])

  return (
    <View className='flex-1 relative '>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='justify-center items-start flex-1 pt-20' style={{ gap: 10 }}>
          <Typography variant='xxl'>Change Password</Typography>
          <View className='flex-1 w-full mt-10' style={{ gap: 10 }}>
            <PasswordInput
              label='Current Password*'
              placeholder='Enter current password'
              secureText='Enter your current password.'
              value={formik.values.currentPassword}
              onChangeText={formik.handleChange("currentPassword")}
              onBlur={formik.handleBlur("currentPassword")}
              isError={
                !!formik.touched.currentPassword &&
                !!formik.errors.currentPassword
              }
              error={formik.errors.currentPassword}
              onSubmitEditing={formik.submitForm as () => void}
            />
            <PasswordInput
              label='New Password*'
              placeholder='Enter password'
              secureText='Your password must contain Lowercase, Uppercase, 
              Number and 6-12 Characters.'
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              isError={
                !!formik.touched.password &&
                !!formik.errors.password
              }
              error={formik.errors.password}
              onSubmitEditing={formik.submitForm as () => void}
            />
            <PasswordInput
              label='Retype new password*'
              placeholder='Retype new password'
              secureText='Both passwords must match.'
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              onBlur={formik.handleBlur("confirmPassword")}
              isError={
                !!formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              error={formik.errors.confirmPassword}
              onSubmitEditing={formik.submitForm as () => void}
            />
            {/* <Pressable onPress={() => { navigation.navigate("Reset") }} className='w-full  mt-5'>
              <Typography variant='sm' class='text-primaryGreen'>Forgot Password?</Typography>
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
      <BottomButton
        // onPress={() => { }}
        onPress={formik.handleSubmit as (values: any) => any}
        text='Change Password'
      />
    </View>
  )
}

export default ChangePassword
import { ScrollView, ToastAndroid, View, useWindowDimensions } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';



// custom imports
import PasswordInput from '../../components/Input/PasswordInput';
import Typography from '../../components/Typography/Typography';
import BottomButton from '../../components/BottomButton';
import { ScreenNavigationProp, ScreenRouteProp } from '../../types/navigation';
import { resetPassword } from '../../http/auth';
import { useState } from 'react';

export default function Forgot({ navigation, route }: { navigation: ScreenNavigationProp, route: ScreenRouteProp }) {

  const height = useWindowDimensions().height;
  const [isBtnLoading, setIsBtnLoading] = useState(false);



  const { email } = route.params;
  type FormValues = {
    otp: string;
    password: string;
    confirmPassword: string;
  }

  const validationSchema = yup.object({
    otp: yup.string().required("OTP is required").min(4, "Min 4 characters").max(4, "Max"),
    password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
  })

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      setIsBtnLoading(true);
      try {
        const result = await resetPassword(email, values.password, values.confirmPassword, parseInt(values.otp));
        formik.resetForm();
        // ToastAndroid.showWithGravity('Password Reset Successfully!', ToastAndroid.TOP, 100);
        navigation.navigate("Login");
      } catch (error: any) {
        console.log(error.response.data);
        // ToastAndroid.showWithGravity(error.response.data.message ?? 'Error Occured!', ToastAndroid.TOP, 100);
      }
      setIsBtnLoading(false);
    },
  })


  return (
    <View className='flex-1 relative'>
      <ScrollView contentContainerStyle={{
        position: 'relative',
        backgroundColor: '#ffffff'
      }}>
        <View className='flex-1 relative bg-white' style={{
          height: height
        }}>
          <View className='px-4 justify-center items-center flex-1'>
            <View className='flex-1 justify-center items-center' style={{ gap: 10 }}>
              <Typography variant='xxl' class='text-center'>Create New Password</Typography>
              <Typography variant='sm' class='text-center'>Your new password must be different from
                previous used password.</Typography>
            </View>
            <View className='flex-[2] w-full items-start' style={{ gap: 10 }}>
              <PasswordInput
                secureText='Enter the OTP sent to your email.'
                label='OTP*'
                placeholder='Enter the OTP'
                value={formik.values.otp}
                onChangeText={formik.handleChange("otp")}
                maxLength={4}
                onBlur={formik.handleBlur("otp")}
                keyboardType='number-pad'
                isError={
                  !!formik.touched.otp &&
                  !!formik.errors.otp
                }
                error={formik.errors.otp}
                onSubmitEditing={formik.submitForm as () => void}
              />
              <PasswordInput
                secureText='Your password must contain Lowercase, Uppercase, Number and 8-12 Characters.'
                label='New Password*'
                placeholder='Enter password'
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
                secureText='Both passwords must match.' 
                label='Confirm Password*'
                placeholder='Re-enter password'
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
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomButton
        text='Confirm'
        onPress={formik.handleSubmit as (values: any) => any}
        isLoading={isBtnLoading}
      />
    </View>
  );
}

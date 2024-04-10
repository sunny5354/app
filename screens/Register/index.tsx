import { Image, Platform, ScrollView, ToastAndroid, View, useWindowDimensions } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';


// custom imports
import Input from '../../components/Input';
import PasswordInput from '../../components/Input/PasswordInput';
import logo from '../../assets/logo.png'
import Typography from '../../components/Typography/Typography';
import BottomButton from '../../components/BottomButton';
import { ScreenNavigationProp } from '../../types/navigation';
import { registerUser, sendEmailCode } from '../../http/auth';
import { useContext, useState } from 'react';
import { cn } from '../../lib/cn';
import Divider from '../../components/Divider';
import { AuthContext } from '../../store/authContext';
import { errorToast, successToast } from '../../lib/toast';

export default function Register({ navigation }: { navigation: ScreenNavigationProp }) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const authCtx = useContext(AuthContext);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }

  const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("It must be a valid Email!").trim(),
    password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      console.log(values);
      setIsBtnLoading(true);
      try {
        const result = await registerUser((values.firstName + " " + values.lastName), values.email, values.password, values.confirmPassword);
        console.log(result);
        // formik.resetForm();
        if (result)
          authCtx.tempAuthenticate(result.token, result.user);
        try {
          const res = await sendEmailCode();
          successToast(res.message);
          navigation.replace("OTP", { isAuthEmail: true })
        } catch (error: any) {
          console.log("error sending OTP=>", error.response.data);
          errorToast(error.response.data.message ?? "Error Occured")
        }
      } catch (error: any) {
        console.log("error register user=>", error.response);
        errorToast(error.response.data.message ?? 'Error Occured');
      }
      setIsBtnLoading(false);
    },
  })


  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView className='flex-1'>
        <View className={cn('flex-1 bg-white pb-28', Platform.OS === 'ios' ? 'mt-4' : 'mt-0')}>
          <View className='px-4 justify-center items-center flex-1'>
            <View className='h-60 justify-center items-center' style={{ gap: 10 }}>
              <Image
                source={logo}
                alt='logo'
                className='h-16 w-24'
                resizeMode='contain'
              />
              <Typography variant='xxl' class='text-center'>Welcome to ACTA!</Typography>
              <Typography class='text-center'>Your 1st step towards freedom-register yourself on Acta.</Typography>
            </View>
            <View className='flex-[2] w-full items-start' style={{ gap: 10, flex: 1 }}>
              <Input label='First Name*'
                value={formik.values.firstName}
                onChangeText={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                isError={
                  !!formik.touched.firstName &&
                  !!formik.errors.firstName
                }
                error={formik.errors.firstName}
                onSubmitEditing={formik.submitForm as () => void}
                placeholder='Enter first name'
              />
              <Input
                placeholder='Enter last name'
                label='Last Name*'
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
              <Input
                placeholder='Enter email'
                label='Email*'
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                isError={
                  !!formik.touched.email &&
                  !!formik.errors.email
                }
                error={formik.errors.email}
                onSubmitEditing={formik.submitForm as () => void}
              />
              <PasswordInput
                secureText='Your password must contain Lowercase, Uppercase, Number and 8-12 Characters.'
                label='Password*'
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
                label='Retype Password*'
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
            <Divider />
            <Typography variant='xsm'>By registering myself I agree to the
              <Typography variant='xsm' class='font-PoppinsSemiBold underline'>  Privacy Policy </Typography>
              {" "}&{" "}
              <Typography variant='xsm' class='font-PoppinsSemiBold underline'>
                Terms of Use{" "}
              </Typography>
              of Acta Staffing.</Typography>
          </View>
        </View>
      </ScrollView>
      <View style={{
        bottom: 0
      }}>
        <BottomButton
          text='Sign Up'
          onPress={formik.handleSubmit as (values: any) => any}
          // onPress={() => { navigation.navigate("RegisterProfile") }}
          isLoading={isBtnLoading}
        />
      </View>
    </View>
  );
}

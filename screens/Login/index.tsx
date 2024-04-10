import { Image, Pressable, ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';



// custom imports
import Input from '../../components/Input';
import PasswordInput from '../../components/Input/PasswordInput';
import logo from '../../assets/logo.png';
import Typography from '../../components/Typography/Typography';
import BottomButton from '../../components/BottomButton';
import { ScreenNavigationProp } from '../../types/navigation';
import { LoginUser } from '../../http/auth';
import { useContext, useState } from 'react';
import { AuthContext } from '../../store/authContext';
import { errorToast } from '../../lib/toast';

export default function Login({ navigation }: { navigation: ScreenNavigationProp }) {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  type FormValues = {
    email: string;
    password: string;
  }

  const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("It must be a valid Email!").trim(),
    password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special")
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      setIsBtnLoading(true);
      try {
        const result = await LoginUser(values.email, values.password);
        console.log("login result => ", result.user);
        if (!result.user.isBasicComplete) {
          console.log("basic info");
          setIsBtnLoading(false);
          navigation.navigate("RegisterProfile");
          authCtx.tempAuthenticate(result.token, result.user);
          formik.resetForm();
          return;
        }
        authCtx.authenticate(result.token, result.user);
        formik.resetForm();
      } catch (error: any) {
        errorToast(error.response.data.message ?? "Error Occured");
      }
      setIsBtnLoading(false);
    },
  })




  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView>
        <View className='px-4 justify-center items-center flex-1'>
          <View className='flex-1 justify-center items-center mt-10' style={{ gap: 10 }}>
            <Image
              source={logo}
              alt='logo'
              className='h-16 w-24'
              resizeMode='contain'
            />
            <View className='flex-1 items-center' style={{ gap: 2 }}>
              <Typography class='text-center text-xl leading-6 font-PoppinsMedium h-14'>#1 Staffing Platform for Hospice & Home Health </Typography>
              <Typography variant='sm' class='text-center text-gray-400'>Pick up local shifts with top-rated agencies. Work as per own choice & preference. Gain freedom & flexibility.</Typography>
            </View>
          </View>
          <View className='flex-[2] w-full items-start mt-10' style={{ gap: 10 }}>
            <Input label='Email*'
              placeholder='Enter email'
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

            <Pressable onPress={() => { navigation.navigate("Reset") }} className='w-full justify-center items-center mt-5'>
              <Typography variant='sm' class='text-primaryGreen'>Forgot Password?</Typography>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomButton
        text='Log In'
        onPress={formik.handleSubmit as (values: any) => any}
        // onPress={fakeLogin}
        isLoading={isBtnLoading}
      />
    </View>
  );
}

import {  ToastAndroid, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';



// custom imports
import Input from '../../components/Input';
import Typography from '../../components/Typography/Typography';
import BottomButton from '../../components/BottomButton';
import { ScreenNavigationProp } from '../../types/navigation';
import { forgotPassword } from '../../http/auth';
import { useState } from 'react';
import { errorToast } from '../../lib/toast';

export default function Reset({navigation}:{navigation:ScreenNavigationProp}) {

  const [isBtnLoading,setIsBtnLoading] = useState(false);

  type FormValues = {
    email: string;
  }

  const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("It must be a valid Email!"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values:FormValues) => {
      setIsBtnLoading(true);
      try {
        const result = await forgotPassword(values.email);
        navigation.navigate("Forgot",{email:values.email})
        formik.resetForm();
        console.log(result);
      } catch (error:any) {
        // console.log("this is =>",error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  return (
    <View className='flex-1 relative bg-white'>
      <View className='px-4 justify-center items-center flex-1'>
        <View className='flex-1 justify-center items-center' style={{ gap: 10 }}>
          <Typography variant='xxl' class='text-center'>Reset Password</Typography>
          <Typography class='text-center'>Instruction will be sent to your Email</Typography>
        </View>
        <View className='flex-[2] w-full items-center' style={{ gap: 10 }}>
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
        </View>
      </View>
      <BottomButton text='Send Now'
      onPress={formik.handleSubmit as (values: any) => any}
      isLoading={isBtnLoading}
      />
    </View>
  );
}

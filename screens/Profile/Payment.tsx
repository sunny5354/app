import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import { useFormik } from 'formik'


import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Divider from '../../components/Divider'
import BottomButton from '../../components/BottomButton'
import { ScreenNavigationProp } from '../../types/navigation'
import colors from '../../config/colors'
import { errorToast, successToast } from '../../lib/toast'
import { PaymentProps } from '../../types/http'
import { editPayment, getPayment } from '../../http/profile/payment'
import { PaymentDataProps } from '../../types/profile'
import Loading from '../Loading'
import { useIsFocused } from '@react-navigation/native'
import { getStatus } from '../../http/home'


const Payment = ({ navigation }: { navigation: ScreenNavigationProp }) => {


  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [payment, setPayment] = useState<PaymentDataProps | null>(null);
  const [loading, setLoading] = useState(false);

  type FormValues = {
    ifsc: string;
    bankName: string;
    accountNumber: string;
    confirmAccountNumber: string;
  }

  const validationSchema = yup.object({
    ifsc: yup.string().required("IFSC code is required"),
    bankName: yup.string().required("Bank Name is required"),
    accountNumber: yup.string().required("Account Number is required"),
    confirmAccountNumber: yup.string().required("Confirm Account Number is required").oneOf([yup.ref("accountNumber")], "Account Number must match"),
  })

  const formik = useFormik({
    initialValues: {
      ifsc: "",
      bankName: "",
      accountNumber: "",
      confirmAccountNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      console.log(values);
      setIsBtnLoading(true);
      try {
        const obj: PaymentProps = {
          accountNumber: values.accountNumber,
          bankName: values.bankName,
          routingNumber: values.ifsc
        }
        const result = await editPayment(obj);
        console.log(result);
        successToast(result.message);
        navigation.goBack();
      } catch (error: any) {
        console.log("Payment error=>", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
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


  const fetchPaymentDetails = async () => {
    setLoading(true);
    try {
      const result = await getPayment();
      successToast(result.message);
      setPayment(result.payments);
      formik.setFieldValue("ifsc", result.payments.routingNumber);
      formik.setFieldValue("bankName", result.payments.bankName);
      formik.setFieldValue("accountNumber", result.payments.accountNumber);
      formik.setFieldValue("confirmAccountNumber", result.payments.accountNumber);
    } catch (error: any) {
      // console.log("Payment error=>", error.response);
      // errorToast(error.response.data.message ?? "Error Occured!");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPaymentDetails();
  }, [])

  if (!payment && loading) return <Loading />


  return (
    <View className='flex-1 relative'>
      <ScrollView className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='flex-1' style={{ gap: 10 }}>
          <Typography class='text-2xl text-primaryGreen'>Set Up Direct Deposit</Typography>
          <Typography>Kindly share the necessary information related to your bank account, such as account number and relevant details, to ensure a smooth and hassle-free payment process.</Typography>
        </View>
        <Divider />
        <View className='flex-1' style={{ gap: 10 }}>
          <View className='flex-1' style={{ gap: 10 }}>
            <Input label='IFSC Code (11 digits)'
              placeholder='Enter IFSC code'
              value={formik.values.ifsc}
              onChangeText={formik.handleChange("ifsc")}
              onBlur={formik.handleBlur("ifsc")}
              isError={
                !!formik.touched.ifsc &&
                !!formik.errors.ifsc
              }
              error={formik.errors.ifsc}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <Input label='Bank Name'
              placeholder='Enter bank name'
              value={formik.values.bankName}
              onChangeText={formik.handleChange("bankName")}
              onBlur={formik.handleBlur("bankName")}
              isError={
                !!formik.touched.bankName &&
                !!formik.errors.bankName
              }
              error={formik.errors.bankName}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <Input label='Account Number'
              placeholder='Enter account number'
              value={formik.values.accountNumber}
              onChangeText={formik.handleChange("accountNumber")}
              onBlur={formik.handleBlur("accountNumber")}
              isError={
                !!formik.touched.accountNumber &&
                !!formik.errors.accountNumber
              }
              error={formik.errors.accountNumber}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <Input label='Confirm Account Number'
              placeholder='Re-enter account number'
              value={formik.values.confirmAccountNumber}
              onChangeText={formik.handleChange("confirmAccountNumber")}
              onBlur={formik.handleBlur("confirmAccountNumber")}
              isError={
                !!formik.touched.confirmAccountNumber &&
                !!formik.errors.confirmAccountNumber
              }
              error={formik.errors.confirmAccountNumber}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
          </View>
        </View>
      </ScrollView>
      <BottomButton
        // onPress={() => { }}
        onPress={formik.handleSubmit as (values: any) => any}
        text='Submit Pay Info'
        isLoading={isBtnLoading}
        disabled={role === "agency-clinician" && userStatus !== "Active"}
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

export default Payment
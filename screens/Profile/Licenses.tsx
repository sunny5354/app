import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from "yup";
import { useFormik } from 'formik';


import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Button from '../../components/Button'
import colors from '../../config/colors'
import Divider from '../../components/Divider'
import DateTimePickers from '../../components/DateTimePicker'
import { selectedValueProp } from '../../types/types'
import MenuDropDown from '../../components/DropDown'
import { state } from '../../data/data'
import LicensesCard from '../../components/Cards/LicensesCard';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { addLicense, editLicense, getLicense } from '../../http/profile/license';
import Loading from '../Loading';
import { LicenseProps } from '../../types/http';
import { LicenseDataProps } from '../../types/profile';



const Licenses = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [licenses, setLicenses] = useState<LicenseDataProps[] | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [selectState, setSelectedState] = useState<selectedValueProp>({
    label: "Select State",
    value: '0'
  })
  const [initalVerificationDate, setInitialVerificationDate] = useState(new Date());
  const [verifiedDate, setVerifiedDate] = useState(new Date());
  const [expiresOn, setExpiresOn] = useState(new Date());
  const scroll = useRef(null);

  const handleDateChange = (selectedDate: any, text: "inital" | "verified" | "expires") => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    if (text === 'inital') {
      setInitialVerificationDate(currentDate);
    }
    else if (text === 'verified') {
      setVerifiedDate(currentDate);
    }
    else if (text === 'expires') {
      setExpiresOn(currentDate);
    }
  };

  type FormValues = {
    credential: string;
    license: string;
    state: string;
  }

  const validationSchema = yup.object({
    credential: yup.string().required("Credential is required"),
    license: yup.string().required("License Number is required"),
    state: yup.string().required("State is required")
  })

  const formik = useFormik({
    initialValues: {
      credential: "",
      license: "",
      state: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      setIsBtnLoading(true);
      try {
        const obj: LicenseProps = {
          credential: values.credential,
          licenseNumber: values.license,
          state: values.state,
          initialVerificationDate: initalVerificationDate.toString(),
          verifiedDate: verifiedDate.toString(),
          expiresOn: expiresOn.toString(),
          verification: "pending"
        }
        const result = await addLicense(obj);
        console.log("Licenses result=>", result);
        fetchLicenses();
        successToast(result.message);
        formik.resetForm();
      } catch (error: any) {
        console.log("Licenses error=>", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  const fetchLicenses = async () => {
    try {
      const result = await getLicense();
      setLicenses(result.licenses);
    } catch (error: any) {
      console.log("Licenses error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  // update function
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState<string | null>(null);

  const onUpdate = (_id: string, credential: string, license: string, initalVerificationDate: string, verifiedDate: string, state: string, expiresOn: string) => {
    const initDate = new Date(initalVerificationDate);
    setInitialVerificationDate(initDate);
    const verifyDate = new Date(verifiedDate);
    setVerifiedDate(verifyDate);
    const expireDate = new Date(expiresOn);
    setExpiresOn(expireDate);
    formik.setFieldValue("credential", credential);
    formik.setFieldValue("license", license);
    formik.setFieldValue("state", state);
    setUpdateId(_id);
    setIsUpdate(true);
    if (scroll.current) {
      //@ts-expect-error
      scroll.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  const handleUpdate = async () => {
    if (!updateId) {
      infoToast("Please select a license");
      return;
    }
    setIsBtnLoading(true);
    try {
      const obj: LicenseProps = {
        credential: formik.values.credential,
        licenseNumber: formik.values.license,
        state: formik.values.state,
        initialVerificationDate: initalVerificationDate.toString(),
        verifiedDate: verifiedDate.toString(),
        expiresOn: expiresOn.toString(),
        verification: "pending"
      }
      const result = await editLicense(obj, updateId);
      console.log("Licenses result=>", result);
      fetchLicenses();
      setIsUpdate(false);
      successToast(result.message);
      formik.resetForm();
    } catch (error: any) {
      console.log("Licenses error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
    setIsBtnLoading(false);
  }



  useEffect(() => {
    fetchLicenses();
  }, [refresh])

  if (!licenses) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView ref={scroll} className='p-4 bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <Typography class='font-PoppinsSemiBold'>Enter License Information</Typography>
        <View style={styles.backgroundShadow}>
          <Input
            label='Credential'
            placeholder='RN, Hospice Physician, etc.'
            value={formik.values.credential}
            onChangeText={formik.handleChange("credential")}
            onBlur={formik.handleBlur("credential")}
            isError={
              !!formik.touched.credential &&
              !!formik.errors.credential
            }
            error={formik.errors.credential}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <Input
            label='License Number'
            placeholder='Enter license number'
            value={formik.values.license}
            onChangeText={formik.handleChange("license")}
            onBlur={formik.handleBlur("license")}
            isError={
              !!formik.touched.license &&
              !!formik.errors.license
            }
            error={formik.errors.license}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <DateTimePickers
            date={initalVerificationDate}
            onChange={(e) => { handleDateChange(e, "inital") }}
            title='Initial Verification Date'
          />
          <DateTimePickers
            date={verifiedDate}
            onChange={(e) => { handleDateChange(e, "verified") }}
            title='Verified Date'
          />
          {/* <MenuDropDown label='State/Union Terriotry*' selectedValue={selectState} setSelectedValue={setSelectedState} data={state} /> */}
          <Input
            label='State*'
            placeholder='Enter State'
            value={formik.values.state}
            onChangeText={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            isError={
              !!formik.touched.state &&
              !!formik.errors.state
            }
            error={formik.errors.state}
            onSubmitEditing={formik.submitForm as () => void}
            classView='flex-1'
          />
          <DateTimePickers
            date={expiresOn}
            onChange={(e) => { handleDateChange(e, "expires") }}
            title='Expires on'
          />
          <View className='justify-center items-center flex-1'>
            {!isUpdate ? <Button
              disabled={isBtnLoading}
              showLoader={isBtnLoading}
              onPress={formik.handleSubmit as (values: any) => any}
            >Add</Button>
              :
              <Button
                disabled={isBtnLoading}
                showLoader={isBtnLoading}
                onPress={handleUpdate}
              >Update</Button>
            }
          </View>
        </View>
        <View className='mt-5' />
        <Divider />
        <View className='flex-1' style={{ gap: 25 }}>
          {
            licenses.length > 0 ?
              licenses.map((license: LicenseDataProps, index: number) => (
                <LicensesCard
                  key={index}
                  license={license}
                  setRefresh={setRefresh}
                  onUpdate={onUpdate}
                />
              ))
              :
              (
                <View className='justify-center items-center'>
                  <Typography class='font-PoppinsSemiBold text-center'>No License Added</Typography>
                </View>
              )
          }
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => { }}
        text='Save'
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
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    marginTop: 30,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 20,
    gap: 10,
  }
})

export default Licenses
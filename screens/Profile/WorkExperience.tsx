import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from "yup";
import { useFormik } from 'formik';


import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Divider from '../../components/Divider'
import BottomButton from '../../components/BottomButton'
import Button from '../../components/Button'
import { ScreenNavigationProp } from '../../types/navigation'
import colors from '../../config/colors'
import DateTimePickers from '../../components/DateTimePicker';
import WorkExperienceCard from '../../components/Cards/WorkExperienceCard';
import { errorToast, successToast } from '../../lib/toast';
import { addExperience, addTotalExperience, editExperience, getExperience } from '../../http/profile/experience';
import Loading from '../Loading';
import { ExperienceProps } from '../../types/http';
import { ExperienceDataProps } from '../../types/profile';

const WorkExperience = ({ navigation }: { navigation: ScreenNavigationProp }) => {


  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [workExperience, setWorkExperiece] = useState<ExperienceDataProps[] | null>(null);
  const [refresh, setRefresh] = useState(false);
  const scroll = useRef(null);

  type FormValues = {
    years: string;
    months: string;
  }

  const validationSchema = yup.object({
    years: yup.string().required("Years is required"),
    months: yup.string().required("Month is required"),
  })

  const formik = useFormik({
    initialValues: {
      years: "",
      months: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      setIsBtnLoading(true);
      try {
        const result = await addTotalExperience(values.years, values.months);
        console.log(result);
        successToast(result.message);
      } catch (error: any) {
        console.log("work experience=>", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  type FormValues2 = {
    organization: string;
    jobTitle: string;
  }

  const validationSchema2 = yup.object({
    organization: yup.string().required("Organization is required"),
    jobTitle: yup.string().required("Job Title is required"),
  })

  const formik2 = useFormik({
    initialValues: {
      organization: "",
      jobTitle: "",
    },
    validationSchema: validationSchema2,
    onSubmit: async (values: FormValues2) => {
      console.log(values, fromDate, tillDate);
      setIsBtnLoading(true);
      try {
        const obj: ExperienceProps = {
          organization: values.organization,
          jobTitle: values.jobTitle,
          from: fromDate.toString(),
          till: tillDate.toString()
        }
        const result = await addExperience(obj);
        successToast(result.message);
        formik2.resetForm();
        fetchWorkExperiece();
      } catch (error: any) {
        console.log("work experience=>", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  })

  const [fromDate, setFromDate] = useState(new Date());

  const handleFromDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setFromDate(currentDate);
  };

  const [tillDate, setTillDate] = useState(new Date());

  const handleTillDateChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setTillDate(currentDate);
  };

  const fetchWorkExperiece = async () => {
    try {
      const result = await getExperience();
      setWorkExperiece(result.experiences);
      if (result.totalExperience) {
        formik.setFieldValue("years", result.totalExperience.year.toString());
        formik.setFieldValue("months", result.totalExperience.month.toString());
      }
    } catch (error: any) {
      console.log("work experience=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  useEffect(() => {
    fetchWorkExperiece();
  }, [refresh])


  // update function
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const onUpdate = (organization: string, jobTitle: string, from: string, till: string, _id: string) => {
    formik2.setFieldValue('organization', organization);
    formik2.setFieldValue('jobTitle', jobTitle);
    setUpdateId(_id);
    const fromDate = new Date(from);
    setFromDate(fromDate);
    const tillDate = new Date(till);
    setTillDate(tillDate);
    setIsUpdate(true);
    if (scroll.current) {
      //@ts-expect-error
      scroll.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  const handleUpdate = async () => {
    setIsBtnLoading(true);
    try {
      const obj: ExperienceProps = {
        organization: formik2.values.organization,
        jobTitle: formik2.values.jobTitle,
        from: fromDate.toString(),
        till: tillDate.toString()
      }
      const result = await editExperience(obj, updateId!);
      successToast(result.message);
      formik2.resetForm();
      fetchWorkExperiece();
      setIsUpdate(false);
    } catch (error: any) {
      console.log("work experience=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
    setIsBtnLoading(false);
  }

  if (!workExperience) {
    return <Loading />
  }


  return (
    <View className='flex-1 relative'>
      <ScrollView ref={scroll} className=' bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='p-4' style={{ gap: 10 }}>
          <Typography>Name</Typography>
          <View className='flex-row' style={{ gap: 10 }}>
            <Input
              label='Years'
              placeholder='01, 02, etc.'
              value={formik.values.years}
              onChangeText={formik.handleChange("years")}
              onBlur={formik.handleBlur("years")}
              isError={
                !!formik.touched.years &&
                !!formik.errors.years
              }
              error={formik.errors.years}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
            <Input
              label='Months'
              placeholder='01, 02, etc.'
              value={formik.values.months}
              onChangeText={formik.handleChange("months")}
              onBlur={formik.handleBlur("months")}
              isError={
                !!formik.touched.months &&
                !!formik.errors.months
              }
              error={formik.errors.months}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            />
          </View>
        </View>
        <Divider />
        <View >
          <View className='p-4'>
            <Typography class='font-PoppinsSemiBold'>Add Work Experience</Typography>
            <View style={styles.backgroundShadow}>
              <Input
              placeholder='Enter organization name'
                label='Organization*'
                value={formik2.values.organization}
                onChangeText={formik2.handleChange("organization")}
                onBlur={formik2.handleBlur("organization")}
                isError={
                  !!formik2.touched.organization &&
                  !!formik2.errors.organization
                }
                error={formik2.errors.organization}
                onSubmitEditing={formik2.submitForm as () => void}
                classView='flex-1'
              />
              <Input
                label='Job title*'
                placeholder='Enter job title'
                value={formik2.values.jobTitle}
                onChangeText={formik2.handleChange("jobTitle")}
                onBlur={formik2.handleBlur("jobTitle")}
                isError={
                  !!formik2.touched.jobTitle &&
                  !!formik2.errors.jobTitle
                }
                error={formik2.errors.jobTitle}
                onSubmitEditing={formik2.submitForm as () => void}
                classView='flex-1'
              />
              <View className='flex-1 flex-row' style={{ gap: 20 }}>
                <View className='flex-1'>
                  <DateTimePickers
                    date={fromDate}
                    onChange={handleFromDateChange}
                    title='From*'
                  />
                </View>
                <View className='flex-1'>
                  <DateTimePickers
                    date={tillDate}
                    onChange={handleTillDateChange}
                    title='Till*'
                  />
                </View>
              </View>
              <View className='justify-center items-center flex-1'>
                {!isUpdate ? <Button
                  onPress={formik2.handleSubmit as (values: any) => any}
                  disabled={isBtnLoading}
                  showLoader={isBtnLoading}
                >{"Add"}</Button>
                  :
                  <Button
                    onPress={handleUpdate}
                    disabled={isBtnLoading}
                    showLoader={isBtnLoading}
                  >{"Update"}</Button>
                }
              </View>
            </View>
          </View>
          <View className='mt-5' />
          <Divider />
          <View className='p-4 flex-1' style={{ gap: 25 }}>
            {
              workExperience.length > 0 ?
                workExperience.map((v, i) => (
                  <WorkExperienceCard onUpdate={onUpdate} setRefresh={setRefresh} key={i} experience={v} />
                ))
                :
                (
                  <View className='flex-1 justify-center items-center'>
                    <Typography class='text-center'>No Work Experience Added</Typography>
                  </View>
                )
            }
          </View>
        </View>
      </ScrollView>
      <BottomButton
        onPress={formik.handleSubmit as (values: any) => any}
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


export default WorkExperience
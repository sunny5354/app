import { View, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useFormik } from 'formik';


import BottomButton from '../../components/BottomButton'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input'
import Button from '../../components/Button'
import colors from '../../config/colors'
import Divider from '../../components/Divider'
import { cn } from '../../lib/cn'
import SkillCard from '../../components/Cards/SkillCard'
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { addSkill, getSkill } from '../../http/profile/skill';
import Loading from '../Loading';
import { SkillProps } from '../../types/http';
import { SkillDataProps } from '../../types/profile';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import { getDropDown } from '../../http/util/dropdown';
import { selectedValueProp } from '../../types/types';
import MenuDropDown from '../../components/DropDown';
import { getStatus } from '../../http/home';



const SkillValue = [
  { id: 1, label: 'Beginner', value: 'Beginner', bg: "bg-secondaryLightBlue", border: "border-secondaryLightBlue" },
  { id: 2, label: 'Proficient', value: 'Proficient', bg: "bg-secondaryYellow", border: "border-secondaryYellow" },
  { id: 3, label: 'Expert', value: 'Expert', bg: 'bg-secondaryGreen', border: "border-secondaryGreen" }
]



const SkillSet = () => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [skills, setSkills] = useState<SkillDataProps[] | null>(null);
  const [skillSet, setSkillSet] = useState([{
    label: "Nothing to show",
    value: "0"
  }])


  const [selectedSkillSet, setSelectedSkillSet] = useState<selectedValueProp>({
    label: "Select Skillset",
    value: '0'
  })

  type FormValues = {
    skill: string;
  }

  const validationSchema = yup.object({
    skill: yup.string().optional(),
  })

  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if (selectedSkillSet.value === "0") {
        infoToast("Please select a skillset");
        return;
      }
      if (!selectedSkill) {
        infoToast("Please select a skill level");
        return;
      }
      setIsBtnLoading(true);
      try {
        const obj: SkillProps = {
          CompetencyName: selectedSkillSet.value,
          level: selectedSkill
        }
        const result = await addSkill(obj);
        successToast(result.message);
        formik.resetForm();
        setSelectedSkill(null);
        fetchSkills();
      } catch (error: any) {
        console.log("Skills error=>", error.response);
        errorToast(error.response.data.message ?? "Error Occured!");
      }
      setIsBtnLoading(false);
    },
  });
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

  const fetchSkills = async () => {
    try {
      const result = await getSkill();
      setSkills(result.skills);
    } catch (error: any) {
      console.log("Skills error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  const fetchSkillDropDown = async () => {
    try {
      const res = await getDropDown("65fd0c243b10390307f9c699");
      setSkillSet(res.dropDown.options);
    } catch (error: any) {

    }
  }


  useEffect(() => {
    fetchSkills();
  }, [refresh])

  useEffect(() => {
    fetchSkillDropDown();
  }, [])


  if (!skills) return <Loading />

  return (
    <View className='flex-1 relative bg-white'>
      <ScrollView className='bg-white flex-1' contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='p-4'>
          <Typography class='font-PoppinsSemiBold'>Add Skillset</Typography>
          <View style={styles.backgroundShadow}>
            {/* <Input
              label='Skillset Name*'
              placeholder='Enter your Competencies'
              value={formik.values.skill}
              onChangeText={formik.handleChange("skill")}
              onBlur={formik.handleBlur("skill")}
              isError={
                !!formik.touched.skill &&
                !!formik.errors.skill
              }
              error={formik.errors.skill}
              onSubmitEditing={formik.submitForm as () => void}
              classView='flex-1'
            /> */}
            <MenuDropDown label='Skill Type*' selectedValue={selectedSkillSet} setSelectedValue={setSelectedSkillSet} data={skillSet} />

            <View className='flex-row justify-between' style={{ gap: 10 }}>
              {SkillValue.map((e, i) => (
                <Pressable key={e.id} onPress={() => { setSelectedSkill(e.value); console.log(e.value) }} className={cn('py-2 px-3 flex-1 justify-center items-center rounded-full', e.value === selectedSkill ? e.bg : 'bg-white border',
                  e.border)}>
                  <Typography variant='xsm' class='font-PoppinsSemiBold'>{e.label}</Typography>
                </Pressable>
              ))
              }
            </View>
            <View className='flex-1'>
              <Button
                onPress={formik.handleSubmit as (values: any) => any}
                disabled={role === "agency-clinician" && userStatus !== "Active"}
                showLoader={isBtnLoading}
              >Add Skill</Button>
            </View>
          </View>
        </View>
        <View className='mt-5' />
        <Divider />
        <View className='flex-1'>
          {skills.length > 0 ?
            skills.map((v, i) => (
              <SkillCard setRefresh={setRefresh} key={i} skill={v} />
            ))
            : (
              <View className='flex-1 justify-center items-center'>
                <Typography class='font-PoppinsSemiBold text-center'>No Skills Added</Typography>
              </View>
            )}
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => {
          navigation.goBack();
        }}
        text='Back'
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

export default SkillSet
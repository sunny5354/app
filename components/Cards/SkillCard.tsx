import { Image, Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'


import Typography from '../Typography/Typography'
import trash from "../../assets/icons/Trash.png"
import { AntDesign } from '@expo/vector-icons'
import { SkillDataProps } from '../../types/profile'
import { cn } from '../../lib/cn'
import { errorToast, infoToast, successToast } from '../../lib/toast'
import { deleteSkill } from '../../http/profile/skill'
import DeleteModal from '../Modals/DeleteModal'

const SkillCard = ({ skill, setRefresh }: { skill: SkillDataProps, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
    setId(skill._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a skill");
      return;
    }
    try {
      const result = await deleteSkill(id);
      successToast(result.message);
      setModalVisible(false);
      setRefresh((prevState) => !prevState);
    } catch (error: any) {
      console.log("WorkExperience Card error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }
  return (
    <View className=' border-b border-primaryGreen pb-2 my-2' style={{ gap: 20 }}>
      <View className='justify-center'>
        <Typography class='pl-5'>{skill.CompetencyName}</Typography>
      </View>
      <View className='flex-row justify-between'>
        <View className={cn(' p-2 px-10 justify-center items-center rounded-r-2xl',
          skill.level === 'Expert' && 'bg-secondaryGreen',
          skill.level === 'Proficient' && "bg-secondaryYellow",
          skill.level === 'Beginner' && 'bg-secondaryBlue'
        )}>
          <Typography class='text-white font-PoppinsSemiBold'>{skill.level.slice(0, 1).toUpperCase() + skill.level.slice(1)}</Typography>
        </View>
        <View className='pr-5'>
          <Pressable onPress={openModal} className='bg-primaryRed w-10 py-2 px-2 justify-center items-center rounded-lg'>
            {/* <Image
            source={trash}
            alt='dustbin'
            className='h-6 w-6'
          /> */}
            <AntDesign name="delete" size={16} color="white" />
          </Pressable>
          <DeleteModal
            modalVisible={modalVisible}
            handleModalVisible={() => { setModalVisible(false) }}
            handleDelete={handleDeleteExperience}
            label='Skill'
            text='Are you sure you want to delete your added skill'
          />
        </View>
      </View>
    </View>
  )
}

export default SkillCard
import { View, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'



import Button from '../Button'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { ExperienceDataProps } from '../../types/profile'
import DeleteModal from '../Modals/DeleteModal';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { deleteExperience } from '../../http/profile/experience';

const WorkExperienceCard = ({ experience, setRefresh, onUpdate }: { experience: ExperienceDataProps, setRefresh: Dispatch<SetStateAction<boolean>>, onUpdate: (organization: string, jobTitle: string, from: string, till: string,_id:string) => void }) => {

  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
    setId(experience._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a experience");
      return;
    }
    try {
      const result = await deleteExperience(id);
      successToast(result.message);
      setModalVisible(false);
      setRefresh((prevState) => !prevState);
    } catch (error: any) {
      console.log("WorkExperience Card error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  return (
    <View className='flex-1 h-72 w-full bg-secondaryBlue rounded-xl relative'>
      <View className='flex-row justify-between  items-center h-12 mx-3'>
        <Typography variant='sm' class='text-white'>{""}</Typography>
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Organization :</Typography>
          <Typography variant='sm' class='text-white'>{experience.organization}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Job Tittle :</Typography>
          <Typography variant='sm' class='text-white'>{experience.jobTitle}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>From :</Typography>
          <Typography variant='sm' class='text-white'>{experience.from.slice(0, 10)}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Till :</Typography>
          <Typography variant='sm' class='text-white'>{experience.till.slice(0, 10)}</Typography>
        </View>
      </View>
      <View className='absolute bottom-0 right-0 left-0'>
        <Button
          onPress={() => {
            onUpdate(experience.organization, experience.jobTitle, experience.from, experience.till,experience._id)
          }}
          classView='my-0' className='bg-[#7297F7]'>Edit</Button>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={() => { setModalVisible(false) }}
        handleDelete={handleDeleteExperience}
        label='Experience'
        text='Are you sure you want to delete your added work experience.'
      />
    </View>
  )
}

export default WorkExperienceCard
import { Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { EducationDataInfoProps } from '../../types/profile'
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { deleteEducation } from '../../http/profile/education';
import DeleteModal from '../Modals/DeleteModal';
import PdfViewModal from '../Modals/PdfViewModal';
import { imagePdfFileTypeProps } from '../../types/types';

const EducationQualifyCard = ({ education, setRefresh, onUpdate }: { education: EducationDataInfoProps, setRefresh: Dispatch<SetStateAction<boolean>>, onUpdate: (data: EducationDataInfoProps) => void }) => {
  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfObject, setPdfObject] = useState<imagePdfFileTypeProps | null>(null);
  const [pdfViewModal, setPdfViewModal] = useState(false);

  const openPdfModal = () => {
    setPdfViewModal(true)
    setPdfObject(education.certificate)
  }

  function openModal() {
    setModalVisible(true);
    setId(education._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a education");
      return;
    }
    try {
      const result = await deleteEducation(id);
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
      <View className='flex-row justify-between border-white border-b items-center h-12 mx-3'>
        <Typography variant='sm' class='text-white'>Graduation</Typography>
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Degree :</Typography>
          <Typography variant='sm' class='text-white'>{education.degree}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Institute :</Typography>
          <Typography variant='sm' class='text-white'>{education.institution}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Year :</Typography>
          <Typography variant='sm' class='text-white'>{education.year}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Certificate :</Typography>
          <Pressable onPress={openPdfModal}>
            <Typography variant='sm' class='text-white underline'>View</Typography>
          </Pressable>
        </View>
      </View>
      <View className='absolute bottom-0 right-0 left-0'>
        <Button
          onPress={() => {
            onUpdate(education)
          }}
          classView='my-0' className='bg-[#7297F7]'>Edit</Button>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={() => { setModalVisible(false) }}
        handleDelete={handleDeleteExperience}
        label='Education'
        text='Are you sure you want to delete your added education'
      />
      <PdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={pdfObject}
      />
    </View>
  )
}

export default EducationQualifyCard
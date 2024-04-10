import { Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { CovidDataProps, imagePdfFileTypeProps } from '../../types/types';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import DeleteModal from '../Modals/DeleteModal';
import { deleteCovid } from '../../http/profile/covid';
import PdfViewModal from '../Modals/PdfViewModal';
import { dateShowFormat } from '../../lib/dateFormatter';

const CovidCard = ({ covid, setRefresh }: { covid: CovidDataProps, setRefresh: Dispatch<SetStateAction<boolean>> }) => {

  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfObject, setPdfObject] = useState<imagePdfFileTypeProps | null>(null);
  const [pdfViewModal, setPdfViewModal] = useState(false);

  const openPdfModal = () => {
    setPdfViewModal(true)
    setPdfObject(covid.certificate)
  }

  function openModal() {
    setModalVisible(true);
    setId(covid._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a covid");
      return;
    }
    try {
      const result = await deleteCovid(id);
      successToast(result.message);
      setModalVisible(false);
      setRefresh((prevState) => !prevState);
    } catch (error: any) {
      console.log("WorkExperience Card error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  return (
    <View className='flex-1 pb-5 w-full bg-secondaryBlue rounded-xl relative'>
      <View className='flex-row justify-between border-white border-b items-center h-12 mx-3'>
        <Typography variant='sm' class='text-white'>Status : {covid.verification}</Typography>
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Risk Level :</Typography>
          <Typography variant='smb' class='text-white'>{covid.riskLevel.toUpperCase()}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Covid-19 Certificate :</Typography>
          <Pressable onPress={openPdfModal}>
            <Typography variant='sm' class='text-white underline'>{"Download"}</Typography>
          </Pressable>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Assessment Date :</Typography>
          <Typography variant='sm' class='text-white'>{dateShowFormat(covid.assessmentDate.slice(0, 10))}</Typography>
        </View>
      </View>
      {/* <View className='absolute bottom-0 right-0 left-0'>
        <Button classView='my-0' className='bg-[#7297F7]'>Edit</Button>
      </View> */}
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={() => { setModalVisible(false) }}
        handleDelete={handleDeleteExperience}
        label='Covid-19 Detail'
        text='Are you sure you want to delete your added covid-19 detail.'
      />
      <PdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={pdfObject}
      />
    </View>
  )
}

export default CovidCard
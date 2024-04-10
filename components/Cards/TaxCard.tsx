import { Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { TaxDataProps, imagePdfFileTypeProps } from '../../types/types';
import { errorToast, infoToast, successToast } from '../../lib/toast';
import DeleteModal from '../Modals/DeleteModal';
import PdfViewModal from '../Modals/PdfViewModal';
import { deleteTax } from '../../http/profile/tax';

const TaxCard = ({ tax, setRefresh }: { tax: imagePdfFileTypeProps, setRefresh: Dispatch<SetStateAction<boolean>> }) => {

  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfObject, setPdfObject] = useState<imagePdfFileTypeProps | null>(null);
  const [pdfViewModal, setPdfViewModal] = useState(false);

  const openPdfModal = () => {
    setPdfViewModal(true)
    setPdfObject(tax)
  }

  function openModal() {
    setModalVisible(true);
    setId(tax._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a tax");
      return;
    }
    try {
      const result = await deleteTax(id);
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
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Tax Document :</Typography>
          <Pressable onPress={openPdfModal}>
            <Typography variant='sm' class='text-white underline'>{"Download"}</Typography>
          </Pressable>
        </View>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={() => { setModalVisible(false) }}
        handleDelete={handleDeleteExperience}
        label='Tax Docs'
        text='Are you sure you want to delete your added tax detail.'
      />
      <PdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={pdfObject}
      />
    </View>
  )
}

export default TaxCard
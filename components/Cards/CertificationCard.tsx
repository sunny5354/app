import { Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { CertificationDataProps } from '../../types/profile'
import { errorToast, infoToast, successToast } from '../../lib/toast';
import DeleteModal from '../Modals/DeleteModal';
import { deleteCertification } from '../../http/profile/certification';
import PdfViewModal from '../Modals/PdfViewModal';
import { imagePdfFileTypeProps } from '../../types/types';
import { dateShowFormat } from '../../lib/dateFormatter';
import { cn } from '../../lib/cn';

const CertificationCard = ({ education, setRefresh, onUpdate }: { education: CertificationDataProps, setRefresh: Dispatch<SetStateAction<boolean>>, onUpdate: (data: CertificationDataProps) => void }) => {


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

  async function handleDeleteCertificate() {
    if (!id) {
      infoToast("Please select a certification");
      return;
    }
    try {
      const result = await deleteCertification(id);
      successToast(result.message);
      setModalVisible(false);
      setRefresh((prevState) => !prevState);
    } catch (error: any) {
      console.log("Certification Card error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }
  return (
    <View className='flex-1 h-[370px] w-full bg-secondaryBlue rounded-xl relative'>
      <View className='flex-row justify-between border-white border-b items-center h-12 mx-3'>
        <Typography variant='sm' class='text-white'>{education.credentialName}</Typography>
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        {/* <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Type of Credential :</Typography>
          <Typography variant='sm' class='text-white'>{education.credentialType}</Typography>
        </View> */}
        {/* <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Name of Credential :</Typography>
          <Typography variant='sm' class='text-white'>{education.credentialName}</Typography>
        </View> */}
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Issuing Authority :</Typography>
          <Typography variant='sm' class='text-white'>{education.institution}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>State:</Typography>
          <Typography variant='sm' class='text-white'>{education?.state}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Issue Date : </Typography>
          <Typography variant='sm' class='text-white'>{dateShowFormat(education.validFrom)}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Expiring On : </Typography>
          <Typography variant='sm' class='text-white'>{dateShowFormat(education.validTo)}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Certificate :</Typography>
          <Pressable onPress={openPdfModal}>
            <Typography variant='sm' class='text-white underline'>View</Typography>
          </Pressable>
        </View>
        {/* <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Status : </Typography>
          <Typography variant='sm' class='text-white'>{education.status}</Typography>
        </View> */}
        <View className={cn('p-2 px-10 -ml-3 w-40 justify-center items-center rounded-r-2xl',
          education.status === 'Valid' && 'bg-secondaryGreen',
          education.status === 'Expired' && "bg-primaryRed",
          education.status === 'Expiring' && 'bg-orange-400'
        )}>
          <Typography class='text-white font-PoppinsSemiBold'>{education.status}</Typography>
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
        handleDelete={handleDeleteCertificate}
        label='Certification'
        text='Are you sure you want to delete your added certification'
      />
      <PdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={pdfObject}
      />
    </View>
  )
}

export default CertificationCard
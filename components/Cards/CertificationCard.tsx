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

import {
  Text,
  StyleSheet,
} from "react-native";

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
    <View className='flex-column justify-between w-full bg-[#4274F7] rounded-xl relative font-PoppinsSemiBold'>
      <View className='flex-row justify-between border-white border-b items-center h-12 mx-3'>
        <Typography variant='xl' class='text-white'>{education?.courseType}</Typography>
        <Typography variant='sm' class={cn('text-white p-4 py-2 px-4 font-PoppinsSemiBold',
          education.status === 'Valid' && 'bg-secondaryGreen',
          education.status === 'Expired' && "bg-primaryRed",
          education.status === 'Expiring' && 'bg-orange-400'
        )}>{education.status}</Typography> 
      </View>

      <View style={styles.container} className='px-2'>
      <View style={styles.row}>
        <Text style={styles.label}>Credential Name :</Text>
        <Text style={styles.value}>{education.credentialName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Issuing Body :</Text>
        <Text style={styles.value}>{education.institution}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>State :</Text>
        <Text style={styles.value}>{education?.state}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Issued :</Text>
        <Text style={styles.value}>{dateShowFormat(education.validFrom)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Valid Up to:</Text>
        <Text style={styles.value}>{dateShowFormat(education.validTo)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Certificate :</Text>
         
        <Text style={styles.value}> 
          <Pressable onPress={openPdfModal}>
            <Typography variant='sm' class='text-white text-xl'>📄</Typography>
          </Pressable>
        </Text>
      </View>
      </View>

      <View className='flex flex-row justify-between h-20 top-9'>
        <Pressable onPress={openModal}>
          <Button
            onPress={() => {
              onUpdate(education)
            }}
            classView='my-0' className='bg-[#7196F8] rounded-s-lg rounded-t-lg rounded-tr-none rounded-br-none rounded-tl-none'
          >Update
          </Button>
        </Pressable>
            
        <Pressable onPress={openModal} className='bg-primaryRed p-2 h-8 w-8 mx-3 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 1,
    top:1,
    fontFamily: 'font-PoppinsSemiBold',
    backgroundColor: '#3378f6', // Blue background
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2.5,
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'font-PoppinsSemiBold',
    width: 150, // Set a fixed width for alignment
  },
  value: {
    color: 'white',
    fontSize: 15,
    flex: 1,
    fontFamily: 'font-PoppinsSemiBold',
  },
});
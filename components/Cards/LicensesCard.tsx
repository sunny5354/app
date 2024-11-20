import { Pressable, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import Typography from '../Typography/Typography'
import { AntDesign } from '@expo/vector-icons';
import { LicenseDataProps } from '../../types/profile'
import { errorToast, infoToast, successToast } from '../../lib/toast';
import { deleteLicense } from '../../http/profile/license';
import DeleteModal from '../Modals/DeleteModal';

const LicensesCard = ({ license, setRefresh, onUpdate }: { license: LicenseDataProps, setRefresh: Dispatch<SetStateAction<boolean>>, onUpdate: (_id: string, credential: string,license:string, initalVerificationDate: string, verifiedDate: string, state: string, expiresOn: string) => void }) => {

  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  

  function openModal() {
    setModalVisible(true);
    setId(license._id)
  }

  async function handleDeleteExperience() {
    if (!id) {
      infoToast("Please select a license");
      return;
    }
    try {
      const result = await deleteLicense(id);
      successToast(result.message);
      setModalVisible(false);
      setRefresh((prevState) => !prevState);
    } catch (error: any) {
      console.log("WorkExperience Card error=>", error.response);
      errorToast(error.response.data.message ?? "Error Occured!");
    }
  }

  return (
    <View className='flex-1 h-96 w-full bg-secondaryBlue rounded-xl relative'>
      <View className='flex-row justify-between border-white border-b items-center h-12 mx-3'>
        <Typography variant='sm' class='text-white'>Verification Under Process</Typography>
        <Pressable onPress={openModal} className='bg-primaryRed p-2 rounded-lg'>
          <AntDesign name="delete" size={16} color="white" />
        </Pressable>
      </View>
      <View className='px-3 mt-4' style={{ gap: 20 }}>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Credential :</Typography>
          <Typography variant='sm' class='text-white'>{license.credential}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>License Number :</Typography>
          <Typography variant='sm' class='text-white'>{license.licenseNumber}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Initial Verification Date :</Typography>
          <Typography variant='sm' class='text-white'>{license.initialVerificationDate.slice(0, 10)}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Verified Date :</Typography>
          <Typography variant='sm' class='text-white underline'>{license.verifiedDate.slice(0, 10)}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>State :</Typography>
          <Typography variant='sm' class='text-white underline'>{license.state}</Typography>
        </View>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm' class='text-white'>Expires on :</Typography>
          <Typography variant='sm' class='text-white underline'>{license.expiresOn.slice(0, 10)}</Typography>
        </View>
      </View>
      <View className='absolute bottom-0 right-0 left-0'>
        <Button onPress={() => {
          onUpdate(license._id, license.credential,license.licenseNumber, license.initialVerificationDate, license.verifiedDate, license.state, license.expiresOn)
        }} classView='my-0' className='bg-[#7297F7]'>Edit</Button>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={() => { setModalVisible(false) }}
        handleDelete={handleDeleteExperience}
        label='License'
        text='Are you sure you want to delete your added license'
      />
    </View>
  )
}

export default LicensesCard
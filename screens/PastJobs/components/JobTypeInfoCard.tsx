import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import Typography from '../../../components/Typography/Typography';
import { JobDataProps } from '../../../types/jobs';
import * as Linking from 'expo-linking';
import PatientProfile from '../../../components/PatientProfile';
import ClinicianBadge from '../../../components/ClinicianBadge';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const JobTypeInfoCard = ({ data }: { data: JobDataProps }) => {
  const [patientProfieModal, setPatientProfileModal] = useState(false);
  const [clinicanBadgeModal, setClinicianBadgeModal] = useState(false);

  return (
    <View className='bg-[#5280F7] rounded-lg px-4 py-6' style={{ gap: 2 }}>
      <View className='flex-row justify-between'>
        <Typography variant='sm' class='text-white'>Job Id: {data.jobId}</Typography>
        <Pressable
          onPress={() => { setClinicianBadgeModal(true); }}
          className='bg-red-500 px-6 py-2 flex justify-center items-center rounded-lg'>
          <Typography class='text-white font-PoppinsSemiBold'>ID Badge</Typography>
        </Pressable>
      </View>
      <Typography variant='sm' class='text-white mt-2'>{data.agencyName}</Typography>
      <Typography class='text-white'>{data.jobType}</Typography>
      <Typography variant='xl' class='text-white' >{data.taskType}</Typography>
      <Typography class='text-white'>{data.staffProfile}</Typography>
      <View className='h-[2px] rounded-xl bg-white my-2' />
      <View style={{gap:5}}>
        <Typography variant='sm' class='text-white'>Patient :</Typography>
        <Typography class='text-white font-PoppinsMedium'>{data.patientName}</Typography>
        <Pressable onPress={() => { setPatientProfileModal(true) }} className='bg-[#1B2850] p-2 w-52 justify-center items-center rounded-lg'>
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <FontAwesome name="vcard" size={16} color="white" />
            <Typography variant='sm' class='text-white'>View Patient Profile</Typography>
          </View>
        </Pressable>
        <Typography variant='sm' class='text-white'>Agency :</Typography>
        <Typography class='text-white font-PoppinsMedium'>{data.agencyName}</Typography>
        <Pressable
          onPress={() => {
            Linking.openURL(`tel:${data.agencyPhone}`)
          }}
          className='bg-[#1B2850] p-2 w-40 justify-center items-center rounded-lg'>
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Typography variant='sm' class='text-white'>
              Call Agency</Typography>
          </View>
        </Pressable>
      </View>
      <PatientProfile
        modalVisible={patientProfieModal}
        handleModalVisible={() => { setPatientProfileModal(false) }}
        id={data._id!}
      />
      <ClinicianBadge
        modalVisible={clinicanBadgeModal}
        handleModalVisible={() => { setClinicianBadgeModal(false) }}
        id={data._id}
      />
    </View>
  )
}

export default JobTypeInfoCard
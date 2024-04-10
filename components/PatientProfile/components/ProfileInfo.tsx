import { Image, View } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';


import { PatientDetailProps } from '../../../types/jobs'
import { backgroundShadow } from '../../backgroundShadow'
import Typography from '../../Typography/Typography'
import Button from '../../Button'
import { Ionicons } from '@expo/vector-icons';
import { dateShowFormat } from '../../../lib/dateFormatter';

const ProfileInfo = ({ data }: { data: PatientDetailProps }) => {
  return (
    <View style={backgroundShadow.backgroundShadow}>
      <View className='justify-center items-center' style={{ gap: 2 }}>
        {/* <View className='h-24 w-24 rounded-full'> */}
        <Image
          source={{ uri: data.avatar.url }}
          alt='proifle image'
          height={600}
          width={600}
          className='h-24 w-24 bg-primaryGreen rounded-full'
        />
        {/* </View> */}
        <Typography variant='xl'>{data.name}</Typography>
        <Typography variant='sm'>MR No. {data.patientId}</Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm'>DOB: {dateShowFormat(data.dob)}</Typography>
          <Typography variant='sm'>Gender: {data.gender}</Typography>
        </View>
        <Typography variant='sm'>Insurance: {data.insuranceName}</Typography>
      </View>
      <View className='h-14 flex-1 flex justify-center items-center'>
        <Button
          onPress={() => {
            Linking.openURL(`tel:${data.phone}`)
          }}
          className='bg-primaryBlue w-40 py-2 px-2'
          classView='flex-1'
          my={0}
        >
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <Ionicons name="call-outline" size={18} color="white" />
            <Typography variant='sm' class='text-white'>Call</Typography>
          </View>
        </Button>
      </View>
    </View>
  )
}

export default ProfileInfo
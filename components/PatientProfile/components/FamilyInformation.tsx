import { View } from 'react-native'
import React from 'react'
import { backgroundShadow } from '../../backgroundShadow'
import { PatientDetailProps } from '../../../types/jobs'
import Typography from '../../Typography/Typography'



const InfoTypography = ({ label, value }: { label: string, value: string }) => {
  return (
    <View className='flex-row justify-between'>
      <View className='flex-1'>
        <Typography variant='sm' class='font-PoppinsMedium text-primaryGreen'>{label}</Typography>
      </View>
      <View className='flex-[1.5] justify-start items-start'>
        <Typography variant='sm'>{value}</Typography>
      </View>
    </View>
  )
}



const FamilyInformation = ({ data }: { data: PatientDetailProps }) => {
  return (
    <View style={backgroundShadow.backgroundShadow}>
      <Typography class='font-PoppinsMedium' variant='sm'>Family Information</Typography>
      <View className='h-[1px] bg-border' />
      <View style={{ gap: 8 }}>
        <InfoTypography label='Next to Kin.' value={data.family.name} />
        <InfoTypography label='Age/Gender' value={data.family.age} />
        <InfoTypography label='Relationship' value={data.family.relationship} />
        <InfoTypography label='Mobile No.' value={data.family.attendantMobNo} />
      </View>
    </View>
  )
}

export default FamilyInformation
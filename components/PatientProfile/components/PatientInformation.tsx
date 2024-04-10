import { View, Text } from 'react-native'
import React from 'react'
import { backgroundShadow } from '../../backgroundShadow'
import { PatientDetailProps } from '../../../types/jobs'
import Typography from '../../Typography/Typography'
import { dateShowFormat } from '../../../lib/dateFormatter'


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



const PatientInformation = ({ data }: { data: PatientDetailProps }) => {
  return (
    <View style={backgroundShadow.backgroundShadow}>
      <Typography class='font-PoppinsMedium' variant='sm'>Patient Information</Typography>
      <View className='h-[1px] bg-border' />
      <View style={{ gap: 8 }}>
        <InfoTypography label='Start of Care' value={dateShowFormat(data.careStartDate)} />
        <InfoTypography label='Date of Birth' value={dateShowFormat(data.dob)} />
        <InfoTypography label='Location' value={data.location} />
        <InfoTypography label='Height' value={data.height.toString() + " Cm"} />
        <InfoTypography label='Weight' value={data.weight.toString() + " Kg"} />
        <InfoTypography label='Mobile No.' value={data.phone} />
      </View>
    </View>
  )
}

export default PatientInformation
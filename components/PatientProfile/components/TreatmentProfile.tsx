import { View } from 'react-native'
import React from 'react'
import { backgroundShadow } from '../../backgroundShadow'
import { PatientDetailProps } from '../../../types/jobs'
import Typography from '../../Typography/Typography'



const InfoTypography = ({ label, value }: { label: string, value: string }) => {
  return (
    <View className='flex-col justify-between'>
      <View className='flex-1'>
        <Typography variant='sm' class='font-PoppinsMedium text-primaryGreen'>{label}</Typography>
      </View>
      <View className='flex-[1.5] justify-start items-start'>
        <Typography variant='sm'>{value}</Typography>
      </View>
    </View>
  )
}



const TreatmentProfile = ({ data }: { data: PatientDetailProps }) => {
  return (
    <View style={backgroundShadow.backgroundShadow}>
      <Typography class='font-PoppinsMedium' variant='sm'>Treatment Profile:</Typography>
      <View className='h-[1px] bg-border' />
      <View style={{ gap: 8 }}>
        <InfoTypography label='Treatment History:' value={data.treatment.treatmentHistory} />
        <InfoTypography label='Symptoms:' value={data.treatment.symptoms} />
        <InfoTypography label='Vital Signs:' value={data.treatment.vitalSigns} />
        <InfoTypography label='Medication Profile:' value={data.treatment.medicationProfile} />
        <InfoTypography label='Allergy Profile:' value={data.treatment.allergyProfile} />
      </View>
    </View>
  )
}

export default TreatmentProfile
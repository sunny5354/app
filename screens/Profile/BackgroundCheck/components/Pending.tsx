import { View } from 'react-native'
import React from 'react'


import Typography from '../../../../components/Typography/Typography'

const Pending = () => {
  return (
    <View className='flex-1 px-4 py-4'>
      <Typography class='font-PoppinsMedium'>Background Check/Verification</Typography>
      <Typography class='mt-2 text-primaryRed'>Note : <Typography class='text-black'> To initiate your background check, it is imperative that you thoroughly complete all sections within the Profile section. Your cooperation in providing comprehensive information is essential for the efficient processing of the background check.</Typography></Typography>

      <View className='h-40 w-full bg-secondaryBlue rounded-xl relative mt-10'>
        <View className='px-3 mt-4' style={{ gap: 20 }}>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Status :</Typography>
            <Typography class='text-white'>Pending...</Typography>
          </View>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Date of Verification :</Typography>
            <Typography class='text-white'>Pending...</Typography>
          </View>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Document :</Typography>
            <Typography class='text-white'>Pending...</Typography>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Pending
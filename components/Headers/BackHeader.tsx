import { View, Text } from 'react-native'
import React from 'react'
import Typography from '../Typography/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenNavigationProp } from '../../types/navigation'

const BackHeader = ({ handlePress, title }: { handlePress: () => void, title: string }) => {
  return (
    <View className='flex-row w-full h-14 bg-primaryGreen px-5 justify-between items-center rounded-b-xl'>
      <MaterialIcons onPress={handlePress} name="arrow-back-ios" size={20} color="white" />
      <Typography variant='xl' class='text-white'>{title}</Typography>
      <View></View>
    </View>
  )
}

export default BackHeader
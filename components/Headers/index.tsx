import { View, Text } from 'react-native'
import React from 'react'
import Typography from '../Typography/Typography'

const Header = ({title}:{title:string}) => {
  return (
    <View className='flex-row w-full h-14 bg-primaryGreen px-5 justify-between items-center rounded-b-xl'>
      <Typography variant='xl' class='text-white'>{title ?? "Jobs"}</Typography>
    </View>
  )
}

export default Header
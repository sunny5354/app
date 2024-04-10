import { View, Text, Image } from 'react-native'
import React from 'react'


import logo from "../../assets/logo.png"
import Typography from '../../components/Typography/Typography'
import loaderGif from "../../assets/loaderGif.gif"

const Loading = () => {
  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Image
        source={loaderGif}
        className='h-36 w-44'
        resizeMode='contain'
      />
      {/* <Typography class='mt-10' variant='xxl'>Loading.....</Typography> */}
    </View>
  )
}

export default Loading
import { Image, Pressable, View } from 'react-native'
import React from 'react'


import img from "../../../assets/Profile/Profile.png"
import Typography from '../../../components/Typography/Typography'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../../types/navigation'

const MessageCard = () => {

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <Pressable onPress={() => {
      navigation.navigate("MessageScreen");
    }} className='p-5 flex-row flex-1 bg-white' style={{ gap: 10 }}>
      <Image
        source={img}
        alt='user img'
        style={{ width: 80, height: 80 }}
        className='rounded-full'
      />
      <View className='flex-1'>
        <View className='flex-row flex-1 justify-between items-center'>
          <Typography variant='xl'>APAX Home Care</Typography>
          <Typography variant='xsm'>10 min</Typography>
        </View>
        <View className='flex-row flex-1 justify-between items-center' style={{ gap: 10 }}>
          <View className='flex-1'>
            <Typography variant='xsm'>Lorem ipsum dolor sit amet, consectetur
              adipiscing elit,</Typography>
          </View>
          <View className='flex justify-center items-center rounded-full bg-red-500 h-6 w-6'>
            <Typography class='text-white'>1</Typography>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default MessageCard
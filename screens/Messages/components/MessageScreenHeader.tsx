import { View, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import Typography from '../../../components/Typography/Typography';
import img from "../../../assets/Profile/Profile.png"

const MessageScreenHeader = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <View className='p-5 flex-row bg-white items-center' style={{ gap: 10 }}>
      <MaterialIcons onPress={handlePress} name="arrow-back-ios" size={30} color="black" />
      <View className='flex-row bg-white items-center' style={{ gap: 10 }}>
        <Image
          source={img}
          alt='user img'
          style={{ width: 80, height: 80 }}
          className='rounded-full'
        />
        <View className='flex-1 justify-center'>
          <Typography variant='xl'>APAX Home Care</Typography>
          <Typography variant='xsm'>+91 8753988323</Typography>
        </View>
      </View>
    </View>
  )
}

export default MessageScreenHeader
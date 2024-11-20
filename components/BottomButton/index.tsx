import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import Button from '../Button'
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import arrowLeft from "../../assets/icons/arrowLeft.png"

type BottomButtonProps = {
  onPress: (values: any) => void
  text: string;
  px?: number | string;
  isLoading?: boolean;
  disabled?:boolean;
}

const BottomButton: React.FC<BottomButtonProps> = ({ text, onPress, px, isLoading,disabled }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View className='absolute bottom-0 w-full h-20 justify-center border-t border-primaryGreen bg-white'>
      <View className='flex-row justify-between px-4'>
        <Button onPress={() => navigation.goBack()} variant='secondary' className='px-0 w-12 justify-center items-center'>
          {/* <Image
            source={arrowLeft}
            alt='left'
            className='h-5 w-5'
          /> */}
          <AntDesign name="left" size={20} color="black" />
        </Button>
        <Button onPress={onPress} className={`px-${px}`} classView='flex-[2]'
          disabled={disabled}
          showLoader={isLoading}
        >{text}</Button>
      </View>
    </View>
  )
}

export default BottomButton
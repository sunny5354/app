import { Pressable, View } from 'react-native'
import React from 'react'

import Button from '../Button'
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import { cn } from '../../lib/cn';

type BottomButtonProps = {
  handlePress1: () => void,
  tilte?: string,
  bgColor?: string
} & React.ComponentProps<typeof Pressable>

const SingleBottomButton: React.FC<BottomButtonProps> = ({ handlePress1, tilte, bgColor }) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View className='absolute bottom-0 w-full h-20 justify-center border-t border-primaryGreen bg-white'>
      <View className='flex-row justify-between px-4' style={{ gap: 20 }}>
        <Button onPress={handlePress1} className={cn('px-0 bg-primaryRed font-PoppinsSemiBold', bgColor)}>{tilte ?? "Button"}</Button>
      </View>
    </View>
  )
}

export default SingleBottomButton
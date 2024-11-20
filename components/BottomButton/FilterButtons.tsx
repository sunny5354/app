import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import Button from '../Button'
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import arrowLeft from "../../assets/icons/arrowLeft.png"
import { cn } from '../../lib/cn';

type BottomButtonProps = {
  handlePress1: () => void,
  tilte1?: string,
  btn1Disable?: boolean,
  title2?: string,
  handlePress2: () => void,
  btn2Disable?: boolean,
}

const FilterButtons: React.FC<BottomButtonProps> = ({ handlePress1, tilte1, btn1Disable, title2, handlePress2, btn2Disable }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View className='absolute bottom-0 w-full h-20 justify-center border-t border-primaryGreen bg-white'>
      <View className='flex-row justify-between px-4' style={{ gap: 20 }}>
        <Button onPress={handlePress1} className='px-0 bg-primaryRed'
          disabled={btn1Disable}
        >{tilte1 ?? "Apply Filter"}</Button>
        <Button onPress={handlePress2} className={cn(`px-0`)}
          variant='secondary'
          disabled={btn2Disable}
        >{title2 ?? "Reset Filter"}</Button>
      </View>
    </View>
  )
}

export default FilterButtons
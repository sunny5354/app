import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { selectedValueProp } from '../../types/types'
import Typography from '../Typography/Typography';
import { cn } from '../../lib/cn';


interface TabProps {
  data: selectedValueProp[],
  selectedValue: string;
  setSelectedValue: (value: React.SetStateAction<string>) => void
}


const Tab: React.FC<TabProps> = ({ data, selectedValue, setSelectedValue }) => {

  return (
    <View className='flex-1 flex-row justify-between border border-primaryPurple rounded-lg overflow-hidden'>
      {
        data.map((item, idx) => (
          <Pressable
            onPress={() => {
              setSelectedValue(item.value)
            }}
            key={idx}
            className={cn(`flex-1 justify-center items-center py-2 ${selectedValue === item.value ? 'bg-primaryPurple' : ''}`,
              idx === 0 && "rounded-l-lg",
              idx === data.length - 1 && "rounded-r-lg"
            )}>
            <Typography variant='sm' class={`${selectedValue === item.value ? 'text-white' : 'text-primaryPurple'}`}>{item.label}</Typography>
          </Pressable>
        ))
      }
    </View>
  )
}

export default Tab
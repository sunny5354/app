import { View, Text } from 'react-native'
import React from 'react'
import { cn } from '../../lib/cn'

const Divider = ({className}:{className?:string}) => {
  return (
    <View className={cn('h-[1px] my-5 w-full bg-primaryGreen',className)}>
    </View>
  )
}

export default Divider
import { View, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'


import MessageScreenHeader from './MessageScreenHeader'
import { ScreenProps } from '../../../types/navigation'
import Input from '../../../components/Input'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import colors from '../../../config/colors'
import { cn } from '../../../lib/cn'

const MessageScreen = ({ navigation }: ScreenProps) => {
  return (
    <View className='flex-1 bg-slate-100'>
      <MessageScreenHeader
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView className='flex-1'>
        <View className='flex-1'>

        </View>
      </ScrollView>
      <View className='h-20 px-3'>
        <View className='flex-row justify-between items-center bg-white rounded-full px-4 py-2'>
          <Pressable className='bg-white p-2 rounded-full'>
            <SimpleLineIcons name="paper-clip" size={24} color="black" />
          </Pressable>
          <View className='flex-1'>
            <TextInput
              selectionColor={colors.primaryGreen}
              className={cn(`bg-white placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm  rounded-md w-full justify-center items-center py-3 px-3`,
              )}
              placeholder='Type Message Here'
            />
          </View>
          <Pressable className='bg-primaryGreen p-2 rounded-full'>
            <Feather name="send" size={30} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default MessageScreen
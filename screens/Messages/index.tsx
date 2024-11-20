import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import { ScreenProps } from '../../types/navigation'
import MessageCard from './components/MessageCard'
import Input from '../../components/Input'
import { data } from '../../data/data'
import { getStatus } from '../../http/home'
import { useIsFocused } from '@react-navigation/native'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button'
import LockPopup from '../../components/LockPopup'

const Messages = ({ navigation }: ScreenProps) => {

  const isFocused = useIsFocused();
  const [statusVisible, setStatusVisible] = useState(false);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      setUserStatus(res.status);
      if (res.status === 'Active') {
        setStatusVisible(false);
      }
      else {
        setStatusVisible(true);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getUserStatus();
  }, [isFocused])


  return (
    <View className='flex-1 bg-background'>
      <Header
        title='Message'
      />
      <View className='bg-white p-3'>
        <Input
          placeholder='Look for message'
          className='bg-[#e6e6e6]'
        />
      </View>
      {(userStatus && userStatus === "Active") ? <ScrollView>
        <View className='flex-1' style={{ gap: 10 }}>
          <View className='flex-1'>
            {
              data.slice(0, 2).map((_, i) => (
                <MessageCard key={i} />
              ))
            }
          </View>
        </View>
      </ScrollView>
        :
        <LockPopup />
      }
    </View>
  )
}

export default Messages
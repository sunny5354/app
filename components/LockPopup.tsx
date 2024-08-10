import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typography from './Typography/Typography'
import { useIsFocused } from '@react-navigation/native';
import { getStatus } from '../http/home';

const LockPopup = () => {

  const isFocused = useIsFocused();
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      console.log(res);
      setUserStatus(res.status);
      setRole(res.role);
      if (res.status === 'Active') {
      }
      else {
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='bg-primaryLightGreen w-9/12 justify-center items-center h-40 px-6 rounded-md' style={{ gap: 10 }}>
        <Typography class='text-white text-center'>You're Signed Up !</Typography>
        {
          (role !== "agency-clinician" && userStatus !== "Active")
            ?
            <Typography variant='xsm' class='text-white text-center leading-5'>You're successfully signed up on Acta. You need to contact your Agency to complete your credentials before start using the App.</Typography>
            :
            <Typography variant='xsm' class='text-white text-center leading-5'>You're successfully signed up on Acta. You need to contact your Agency to complete your credentials before start using the App.</Typography>
        }
      </View>
    </View>
  )
}

export default LockPopup

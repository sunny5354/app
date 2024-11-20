import { View, Image } from 'react-native'
import React, { useContext } from 'react'


import whiteLogo from "../../../assets/whiteLogo.png"
import Typography from '../../../components/Typography/Typography';
import { AuthContext } from '../../../store/authContext';
import Button from '../../../components/Button';
import { imagePdfFileTypeProps } from '../../../types/types';

const HomeHeader = ({avatar}:{avatar:imagePdfFileTypeProps}) => {

  const { user, logout } = useContext(AuthContext);

  return (
    <View className='flex-row w-full h-20 bg-primaryGreen px-5 justify-between items-center'>
      <Image
        source={whiteLogo}
        alt='white logo'
        className='w-20 h-12'
        resizeMode='contain'
      />
      {
        user !== null ?
          (<View className='flex-row items-center' style={{ gap: 15 }}>
            <View className='justify-end items-end' style={{gap:0}}>
              <Typography class='text-white font-bold' variant='sm'>Welcome</Typography>
              <Typography class='text-white -mt-1' variant='xl'>{user?.fullName}</Typography>
            </View>
            <Image
              source={{ uri: avatar?.url }}
              alt='profile'
              className='w-12 h-12 rounded-full'
            />
          </View>)
          :
          <View className='justify-center items-center'>
            <Button
              variant='secondary'
              onPress={() => { logout() }}
              my={0}
              classView='justify-center items-center'
            >Logout</Button>
          </View>
      }
    </View>
  )
}

export default HomeHeader
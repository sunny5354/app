import { View, Image, Pressable, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'


import { ScreenNavigationProp } from '../../types/navigation'
import Typography from '../../components/Typography/Typography'
import { MenuData } from '../../data/data'
import { AuthContext } from '../../store/authContext';
import bgMenuImg from "../../assets/menu/bgMenu.png"
import { fetchHomeServices } from '../../http/home'
import { imagePdfFileTypeProps } from '../../types/types'
import { errorToast } from '../../lib/toast'
import { useIsFocused } from '@react-navigation/native'

const Menu = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [avatar, setAvatar] = useState<imagePdfFileTypeProps | null>(null);
  // console.log(authCtx.token)

  const getHomeServices = async () => {
    try {
      const res = await fetchHomeServices();
      setAvatar(res.home.avatar);
    } catch (error: any) {
      errorToast(error.response.data.message ?? "Something went wrong");
    }
  }

  useEffect(() => {
    getHomeServices();
  }, [isFocused])


  return (
    <View className='flex-1 bg-white'>
      <ScrollView>
        <View className='flex-1'>
          <View className='relative'>
            <Image
              source={bgMenuImg}
              alt='Background image'
              className='w-full h-40'
            />
            {
              authCtx.user !== null &&
              (<View className='flex-row items-center absolute -bottom-10 px-5' style={{ gap: 10 }}>
                {avatar && <Image
                  source={{ uri: avatar.url }}
                  alt='Profile'
                  height={600}
                  width={600}
                  className='h-24 w-24 bg-primaryGreen rounded-full'
                />}
                <View className='mt-3' style={{gap:5}}>
                  <Typography variant='xl' class='font-PoppinsMedium text-white'>{authCtx.user.fullName}</Typography>
                  <Typography variant='xsm' class='font-PoppinsMedium'>{authCtx.user.email}</Typography>
                </View>
              </View>)
            }
          </View>
          <View className='flex-1 px-5 mt-[10%]'>
            {
              MenuData.map((v, i) => (
                <Pressable key={v.id} onPress={() => {
                  if (v.title !== 'Log Out') {
                    navigation.navigate(v.to)
                  }
                  else {
                    authCtx.logout();
                  }
                }} className='flex-row items-center py-2' style={{ gap: 10 }}>
                  <Image
                    source={v.img}
                    className='h-8 w-8'
                    resizeMode='contain'
                  />
                  <Typography class='font-PoppinsMedium'>{v.title}</Typography>
                </Pressable>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Menu
import { Image, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import Typography from '../../components/Typography/Typography'
import logo from '../../assets/logo.png'
import welcome from '../../assets/welcome/welcome.png'
import { ScreenNavigationProp, ScreenRouteProp } from '../../types/navigation'

const Welcome = ({ navigation, route }: { navigation: ScreenNavigationProp, route: ScreenRouteProp }) => {
  return (
    <View className='flex-1 bg-white px-5'>
      <View className='flex-1 justify-center items-center'>
        <Image
          source={logo}
          alt='logo'
          className='h-24 w-32'
          resizeMode='contain'
        />
      </View>
      <View className='flex-1 items-center' style={{ gap: 20 }}>
        <Image
          source={welcome}
          alt='welcome'
          className='h-40 w-full'
          resizeMode='contain'
        />
        <View className='flex-1 items-center h-40' style={{ gap: 4 }}>
          <Typography class='text-center text-xl font-PoppinsMedium h-14'>#1 Staffing Platform for Hospice & Home Health </Typography>
          <Typography variant='sm' class='text-center h-20 text-gray-400'>Pick up local shifts with top-rated agencies. Work as per own choice & preference. Gain freedom & flexibility.</Typography>
        </View>
      </View>
      <View className='flex-1 flex-row justify-between items-end pb-2' style={{ gap: 10 }}>
        <Button onPress={() => navigation.navigate("Register")} variant='secondary' className='px-0' >Sign Up</Button>
        <Button className='px-0' onPress={() => navigation.navigate("Login")} >Login</Button>
      </View>
    </View>
  )
}

export default Welcome

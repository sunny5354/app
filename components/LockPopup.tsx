import { View, Text,StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typography from './Typography/Typography'
import { useIsFocused } from '@react-navigation/native';
import { getStatus } from '../http/home';
import BgImage from '../assets/splash.png';

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
    // <View style={styles.container}>
    //   <ImageBackground source={BgImage}>
    //   <View className='bg-primaryLightGreen px-6 rounded-md text-center' style={{ gap: 10 }}>
    //     <Typography class='text-white text-center'>You're Signed Up !</Typography>
    //     {
    //       (role !== "agency-clinician" && userStatus !== "Active")
    //         ?
    //         <Typography variant='xsm' class='text-white text-center leading-5'>You're successfully signed up. Go to Menu and complete remaining info inside ProMobile App file module while your Agency verifies and activates your account.</Typography>
    //         :
    //         <Typography variant='xsm' class='text-white text-center leading-5'>You're successfully signed up on Acta. You need to contact your Agency to complete your credentials before start using the App.</Typography>
    //     }
    //   </View>
    //   </ImageBackground>
     
    // </View>
    <View style={styles.container}>
    <ImageBackground source={BgImage} style={styles.image1}>
      <View className='bg-[#02123C] px-6 mx-10 py-5 rounded-md text-center' style={{ gap: 10 }}>
        <Text style={styles.text}>
          <Typography class='text-white text-center'>You're Signed Up !</Typography>
        </Text>
        {
          (role !== "agency-clinician" && userStatus !== "Active")
          ?
          <Typography variant='xsm' class='text-white text-center leading-5'>{`While your account is under review for activation by Acta, go to Menu and complete your Profile, Educational Attainment & Licensing Credentials.`}</Typography>
          :
          <Typography variant='xsm' class='text-white text-center leading-5'>{`While your account is under review for activation by your Agency, go to Menu > Profile and complete your further profile information.`}</Typography>
        }
      </View>
    </ImageBackground>
  </View>
  )
}

export default LockPopup

const styles = StyleSheet.create({
  container: {
    /* @info Make the containing view fill the screen */
    flex: 1,
    flexDirection: 'column',
  },
  image1: {
    /* @info Make the image fill the containing view */
    flex: 1,
    /* @info Scale up the image to fill the container, preserving aspect ratio */
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

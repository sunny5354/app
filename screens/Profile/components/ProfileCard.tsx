import { View, Image, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';


import ProfileTop from "../../../assets/Profile/ProfileTop.png"
import Typography from '../../../components/Typography/Typography'
import location from "../../../assets/icons/MapPin.png"
import firstAid from "../../../assets/icons/firstAidKit1.png"
import idCard from "../../../assets/icons/IdentificationCard.png"
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types/navigation';
import ImageModal from '../../../components/Modals/ImageModal';
import { imagePdfFileTypeProps } from '../../../types/types';



type ProfileCardProps = {
  "avatar": imagePdfFileTypeProps,
  "fullName": string,
  "location": string,
  "memberSince": string,
  "jobCompleted": number,
  "rating": number,
  workProfile?:string;
  clinicianId: string,
  status: {
    account: boolean,
    background: boolean,
    education: boolean,
    experience: boolean,
    covid:boolean,
    license: boolean,
    payment: boolean,
    personal: boolean,
    preference: boolean,
    skill: boolean,
    tax: boolean,
    certification: boolean
  }
}


const ProfileCard = ({ profile, setRefresh }: { profile: ProfileCardProps, setRefresh: Dispatch<SetStateAction<boolean>> }) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [profileImgModal, setProfileImgModal] = useState(false);

  return (
    <View className='flex-1 relative'>
      <Image
        source={ProfileTop}
        alt='profile top'
        height={150}
        width={100}
        className='w-full h-40'
      />
      <View className='absolute top-0 bottom-0 right-0 left-0 flex-1 p-4 mt-4'>
        <View className='flex-1' style={{ gap: 10 }}>
          <View className='flex-row'>
            <View className='flex-1'>
              <MaterialIcons onPress={() => { navigation.goBack() }} name="arrow-back-ios" size={20} color="white" />
            </View>
            <View className='flex-1 justify-center items-center'>
              <Typography class='text-white' variant='xl'>Profile</Typography>
            </View>
            <View className='flex-1'>
              {/* <Typography>h</Typography> */}
            </View>
          </View>
          <View className='justify-center items-center'>
            <View className='relative'>
              <Image
                source={{ uri: profile.avatar.url }}
                alt='Profile'
                height={600}
                width={600}
                className='h-32 w-32 bg-primaryGreen rounded-full'
              />
              <Pressable onPress={() => { setProfileImgModal(true) }} className='bg-primaryGreen p-2 rounded-full absolute right-2 bottom-2'>
                <FontAwesome5 name="camera" size={16} color="white" />
              </Pressable>
            </View>
          </View>
          <View className='justify-center items-center'>
            <Typography variant='xxl' class='font-Poppins'>{profile.fullName}</Typography>
          </View>
          <View className='justify-center items-center'>
            <View className='flex-row' style={{ gap: 20 }}>
              <View className='flex-row items-center' style={{ gap: 3 }}>
                <Image
                  source={location}
                  height={20}
                  width={30}
                  className='h-5 w-5'
                />
                <Typography class='font-Poppins'>{profile.location}</Typography>
              </View>
              <View className='flex-row items-center' style={{ gap: 3 }}>
                <Image
                  source={idCard}
                  height={20}
                  width={30}
                  className='h-5 w-5'
                />
                <Typography class='font-Poppins'>{profile.clinicianId}</Typography>
              </View>
            </View>
          </View>
          <View className='justify-center items-center'>
            <View className='flex-row items-center' style={{ gap: 3 }}>
              <Image
                source={firstAid}
                height={20}
                width={30}
                className='h-5 w-5'
              />
              <Typography class='font-Poppins'>{profile.workProfile}</Typography>
            </View>
          </View>
        </View>
      </View>
      <ImageModal
        modalVisible={profileImgModal}
        handleModalVisible={() => { setProfileImgModal(false) }}
        setRefresh={setRefresh}
      />
    </View>
  )
}

export default ProfileCard
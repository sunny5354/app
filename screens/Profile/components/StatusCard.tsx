import { Image, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


import Typography from '../../../components/Typography/Typography'
import calendar from "../../../assets/icons/Calendar.png";
import completed from "../../../assets/icons/checkGreen.png"
import star from "../../../assets/icons/fullStar.png"
import emptyStar from "../../../assets/icons/emptyStar.png"


type ProfileCardProps = {
  "avatar": string,
  "fullName": string,
  "location": string,
  "memberSince": string,
  "jobCompleted": number,
  "rating": number
}



const StatusCard = ({ profile }: { profile: ProfileCardProps }) => {
  return (
    <LinearGradient
      colors={['#067D68e3', '#4AC7AB']}
      start={{ x: 0.35, y: 0.2 }}
      className='w-full flex-row justify-between px-3 py-4'
      style={{ gap: 10, justifyContent: 'space-between' }}
    >
      <View className='bg-white px-2 py-3 h-20 flex-1 rounded-lg justify-between'>
        <Typography variant='xsm'>Member Since</Typography>
        <View className='flex-row items-center'>
          <Image
            source={calendar}
            alt='Check Or Warning'
            style={{ width: 25, height: 25, marginRight: 10 }}
            resizeMode='contain'
          />
          <Typography>{profile.memberSince}</Typography>
        </View>
      </View>
      <View className='bg-white p-2 py-3 h-20 flex-1 rounded-lg justify-between'>
        <Typography variant='xsm'>Jobs Done</Typography>
        <View className='flex-row items-center'>
          <Image
            source={completed}
            alt='Check Or Warning'
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Typography>{profile.jobCompleted}</Typography>
        </View>
      </View>
      <View className='bg-white p-2 py-3 h-20 flex-1 rounded-lg justify-between'>
        <Typography variant='xsm'>Rating</Typography>
        <View className='flex-row items-center'>
          {
            [1, 2, 3, 4, 5].map((_: number, i: number) => (
              <Image
                key={i}
                source={i < Math.floor(profile.rating) ? star : emptyStar}
                alt='Check Or Warning'
                style={{ width: 18, height: 18, marginRight: 1 }}
              />
            ))
          }
        </View>
      </View>
    </LinearGradient>
  )
}

export default StatusCard
import { Alert, Share, View } from 'react-native'
import React from 'react'
import Typography from '../Typography/Typography'
import Divider from '../Divider'
import Button from '../Button'
import { JobDataProps } from '../../types/jobs'
import { Feather } from '@expo/vector-icons'

const JobDescriptionCard = ({ data }: { data: JobDataProps }) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Job Type : ${data.jobType}\nTask Type : ${data.taskType}\nDescription : ${data.jobDescription}\nWebsite: https://actastaffing.com`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View className='bg-white rounded-lg p-4' style={{ gap: 10 }}>
      <View className=''>
        <Typography class='text-primaryGreen'>Visit Date & Time : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='sm'>{data.jobDateAndTime.split("at")[0]}</Typography>
          <View className='border-r border-primaryGreen' />
          <Typography variant='sm'>{data.jobDateAndTime.split("at")[1]}</Typography>
        </View>
      </View>
      <Divider className='my-2' />
      <Typography class='text-primaryGreen'>Job Description : </Typography>
      <Typography variant='sm'>{data.jobDescription}</Typography>
      <Divider />
      <View className='-mt-5'>
        <Typography class='text-primaryGreen'>Payment & Distance : </Typography>
        <View className='flex-column' style={{ gap: 2 }}>
          <View className='flex-row' style={{ gap: 10 }}>
            {/* @ts-ignore */}
            <Typography variant='sm'>Payt. Type : {data?.paymentType} </Typography>
            <View className='border-r border-primaryGreen' />
            <Typography variant='sm'>Pay Rate : ${data?.payRate}</Typography>
          </View>
          
          <Typography variant='sm'>Distance : {data.away}</Typography>
        </View>
      </View>

      <View className='justify-center items-center mt-6 bottom-4' style={{ gap: 12 }}>
        <Button onPress={onShare} className='bg-[#5280F7]'>
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <Feather name="share-2" size={16} color="white" />
            <Typography variant='sm' class='text-white'>Share</Typography>
          </View>
        </Button>
      </View>
    </View>
  )
}

export default JobDescriptionCard
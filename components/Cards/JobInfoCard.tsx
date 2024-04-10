import { View } from 'react-native'
import React from 'react'
import Typography from '../Typography/Typography'
import Divider from '../Divider'
import { Ionicons } from '@expo/vector-icons';
import { JobDataProps } from '../../types/jobs';
import { dateShowFormat } from '../../lib/dateFormatter';

const JobInfoCard = ({ data }: { data: JobDataProps }) => {
  return (
    <View className='bg-[#5280F7] rounded-lg px-4 py-6' style={{ gap: 0 }}>
      <View className='flex-row justify-between'>
        <Typography variant='sm' class='text-white'>{dateShowFormat(data.createdAt)}</Typography>
        <Typography variant='sm' class='text-white'>Job Id: {data.jobId}</Typography>
      </View>
      <Typography variant='sm' class='text-white mt-2'>{data.agencyName}</Typography>
      <Typography class='text-white'>{data.jobType}</Typography>
      <Typography variant='xl' class='text-white' >{data.taskType}</Typography>
      <Typography class='text-white'>{data.staffProfile}</Typography>
    </View>
  )
}

export default JobInfoCard
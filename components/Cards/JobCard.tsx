import { Pressable, View } from 'react-native'
import React from 'react'
import Typography from '../Typography/Typography'
import Divider from '../Divider'
import { Ionicons } from '@expo/vector-icons';
import Button from '../Button';
import { JobDataProps } from '../../types/jobs';
import { dateShowFormat } from '../../lib/dateFormatter';
import { acceptJob, declineJob } from '../../http/jobs/jobs';
import { errorToast, successToast } from '../../lib/toast';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';


interface JobCardProps {
  data: JobDataProps,
  handlePress: () => void,
  isPointOfCare?: boolean,
  applied?: boolean,
  assigned?: boolean,
  scheduled?: boolean,
  overdue?: boolean,
  completed?: boolean,
  pastJobs?: boolean,
}

const JobCard: React.FC<JobCardProps> = ({ data, handlePress, isPointOfCare, applied, assigned, scheduled, overdue, completed, pastJobs }) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const handleAcceptJob = async () => {
    try {
      // console.log('Accept Job')
      const res = await acceptJob(data._id);
      successToast(res.message);
      navigation.navigate("Schedule");
    } catch (error: any) {
      console.log(error.response.data);
      errorToast(error.response.data.message);
    }
  }

  const handleDeclineJob = async () => {
    try {
      // console.log('Decline Job')
      const res = await declineJob(data._id);
    } catch (error: any) {
      console.log(error.response.data);
      errorToast(error.response.data.message);
    }
  }

  return (
    <Pressable onPress={() => { handlePress() }} className='bg-white rounded-lg p-4' style={{ gap: 7 }}>
      <View className='flex-row justify-between'>
        <View>
          <Typography variant='xsm'>{dateShowFormat(data.createdAt)}</Typography>
          {(applied || scheduled || isPointOfCare || completed || overdue || pastJobs) && <Typography variant='xsm'>Job Id: {data.jobId}</Typography>}
        </View>
        {!applied && !assigned && !scheduled && !isPointOfCare && !completed && !overdue && !pastJobs && <Typography variant='xsm'>Job Id: {data.jobId}</Typography>}
        {
          (applied) && (
            <View className='bg-primaryLightGreen px-6 py-1 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-white'>Applied</Typography>
            </View>
          )
        }
        {
          assigned && (
            <View className='bg-red-100 px-6 py-1 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryRed font-PoppinsSemiBold'>{data.jobExpireIn}</Typography>
            </View>
          )
        }
        {
          overdue && (
            <View className='bg-red-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryRed font-PoppinsSemiBold'>Overdue</Typography>
            </View>
          )
        }
        {
          scheduled && (
            <View className='bg-primaryBlue px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-white font-PoppinsSemiBold'>Scheduled</Typography>
            </View>
          )
        }
        {
          completed && (
            <View className='bg-primaryLightGreen px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-white'>Completed</Typography>
            </View>
          )
        }
        {
          isPointOfCare && (
            <View className='bg-red-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryRed font-PoppinsSemiBold'>{data.jobStatus}</Typography>
            </View>
          )
        }
        {
          pastJobs && (
            <View className='bg-primaryLightGreen px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-white'>Completed</Typography>
            </View>
          )
        }
      </View>
      <View>
        {data.agencyName && <Typography variant='sm'>{data?.agencyName}</Typography>}
        <Typography variant='sm' class='text-primaryGreen'>{data.jobType}</Typography>
        <Typography class='leading-6 font-PoppinsSemiBold' >{data.taskType}</Typography>
        {/* <Typography variant='xxl' class='text-primaryGreen'>COPD Management</Typography> */}
        <Typography variant='sm' class='text-primaryGreen'>{data.staffProfile}</Typography>
        <View className='flex-row items-center mt-1' style={{ gap: 5 }}>
          <Ionicons name="calendar-outline" size={20} color="black" />
          <Typography variant='xsm'>{data.jobDateAndTime}</Typography>
        </View>
        <View className='flex-row items-center flex-1' style={{ gap: 5 }}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Typography variant='xsm' class='flex-1 leading-4'>{data.location}</Typography>
        </View>
      </View>
      <Divider className='my-2' />
      <View className='flex-row' style={{ gap: 20 }}>
        <Typography variant='xsm'>Pay Rate : ${data.payRate}</Typography>
        <View className='border-r border-primaryGreen' />
        <Typography variant='xsm'>Distance : {data.away}</Typography>
      </View>
      {false && <View className='flex-row justify-between' style={{ gap: 20 }}>
        <Button className='bg-primaryRed px-0'>Log Mileage</Button>
        <Button variant='secondary' className='px-0'>QA Document</Button>
      </View>}
      {assigned && <View className='flex-row justify-between' style={{ gap: 20 }}>
        <Button
          onPress={() => {
            handleAcceptJob()
          }}
          className='bg-primaryRed px-0'>Accept</Button>
        <Button
          onPress={() => {
            handleDeclineJob()
          }}
          variant='secondary' className='px-0'>Decline</Button>
      </View>}
    </Pressable>
  )
}

export default JobCard
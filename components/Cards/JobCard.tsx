import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import Typography from '../Typography/Typography'
import Divider from '../Divider'
import { Ionicons } from '@expo/vector-icons';
import Button from '../Button';
import { JobDataProps, LogMileageProps } from '../../types/jobs';
import { dateShowFormat } from '../../lib/dateFormatter';
import { acceptJob, declineJob, uploadLogMileageDetails } from '../../http/jobs/jobs';
import { errorToast, successToast } from '../../lib/toast';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../types/navigation';
import AddQaForm from '../../screens/PointOfCare/components/AddQaform';

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
  const [uploadqaModal, setUploadQaModal] = useState(false);

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

  const handleSubmit = async (obj: LogMileageProps) => {
    if (!obj) {
      return;
    }
    try {
      const res = await uploadLogMileageDetails(id, obj);
      console.log(res);
      if (res.success) {
        successToast(res.message);
        navigation.navigate("PointOfCare");
      }
    } catch (error: any) {
      errorToast(error.response.data.message);
      console.log(error.response.data.message);
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
          isPointOfCare && data.jobStatus == "QA Approved" && (
            <View className='bg-green-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryGreen font-PoppinsSemiBold'>{data.jobStatus}</Typography>
            </View>
          )
        }
        {
          isPointOfCare && data.jobStatus == "QA Submitted" && (
            <View className='bg-orange-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-orange-600 font-PoppinsSemiBold'>{data.jobStatus}</Typography>
            </View>
          )
        }
        {
          isPointOfCare && data.jobStatus == "QA Inprogress" && (
            <View className='bg-red-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryRed font-PoppinsSemiBold'>{`QA Pending`}</Typography>
            </View>
          )
        }
        {
          isPointOfCare && data.jobStatus == "QA Disapproved" && (
            <View className='bg-blue-100 px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography variant='xsm' class='text-primaryBlue font-PoppinsSemiBold'>{data.jobStatus}</Typography>
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
      {
        data.jobStatus == "QA Disapproved" && (
        <View className='flex-column' style={{ gap: 10 }}>
          <Typography variant='ssxl'>Disapproval Comment </Typography>
          <Typography variant='ssxl'>N/A</Typography>
          <Button
            onPress={() => {
              setUploadQaModal(true)
            }}
            className='bg-primaryRed px-0'>Submit QA Document Again</Button>
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
      <View className='flex-column' style={{ gap: 2 }}>
        <View className='flex-row justify-between' style={{ gap: 20 }}>
          {/* @ts-ignore */}
          <Typography variant='xsm'>Pay Type : {data?.paymentType}</Typography>
          <View className='border-r border-primaryGreen' /> 
          <Typography variant='xsm'>Payt. Rate : ${data.payRate} </Typography>
        </View>
        
        <Typography variant='xsm'>Distance : {data.away}</Typography>
      </View>
      {false && <View className='flex-row justify-between' style={{ gap: 20 }}>
        <Button className='bg-primaryRed px-0'>Log Mileage</Button>
        <Button variant='secondary' className='px-0'>QA Document</Button>
      </View>}
      {assigned && data?.jobExpireIn != "Expired" && <View className='flex-row justify-between' style={{ gap: 20 }}>
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

      <AddQaForm
        modalVisible={uploadqaModal}
        handleModalVisible={() => {
          setUploadQaModal(false);
        }}
        handleSubmit={handleSubmit} // @ts-ignore
        data={data?.agencyId}
        jobId={data?._id}
      />

    </Pressable>
  )
}

export default JobCard
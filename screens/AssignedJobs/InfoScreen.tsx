import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/Headers/BackHeader'
import { ScreenNavigationProp, ScreenProps } from '../../types/navigation'
import JobInfoCard from '../../components/Cards/JobInfoCard'
import JobDescriptionCard from '../../components/Cards/JobDescriptionCard'
import Divider from '../../components/Divider'
import Typography from '../../components/Typography/Typography'
import { JobDataProps } from '../../types/jobs'
import { acceptJob, declineJob, getSignleJobDetail } from '../../http/jobs/jobs'
import { errorToast, successToast } from '../../lib/toast'
import Loading from '../Loading'
import FilterButtons from '../../components/BottomButton/FilterButtons'
import { useNavigation } from '@react-navigation/native'
import FakeMap from '../../components/FakeMap'

const AssignedJobInfoScreen = ({ navigation, route }: ScreenProps) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<JobDataProps | null>(null);

  const fetchSingleJobDetail = async () => {
    setLoading(true);
    try {
      const res = await getSignleJobDetail(id);
      // console.log(res);
      setData(res.job);
    } catch (error: any) {
      errorToast(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  }

  const handleAcceptJob = async () => {
    try {
      // console.log('Accept Job')
      const res = await acceptJob(id);
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
      const res = await declineJob(id);
    } catch (error: any) {
      console.log(error.response.data);
      errorToast(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchSingleJobDetail();
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!data) {
    return (
      <View>
        <Typography>Job not found</Typography>
      </View>
    )
  }
  return (
    <View className='flex-1 bg-slate-100'>
      <BackHeader
        handlePress={() => { navigation.goBack() }}
        title='Assigned Job Detail'
      />
      <ScrollView>
        <View className='flex-1 p-4 mb-20' style={{ gap: 30 }}>
          <JobInfoCard data={data} />
          <JobDescriptionCard data={data} />
          <Divider />
          <View className='flex-col items-start flex-1'>
            <Typography class='font-PoppinsSemiBold'>Location : </Typography>
            <Typography variant='sm' class='flex-1'>{data.location}</Typography>
          </View>
          <FakeMap location={data.location} />
        </View>
      </ScrollView>
      <FilterButtons
        tilte1='Accept'
        title2='Decline'
        handlePress1={handleAcceptJob}
        handlePress2={handleDeclineJob}
      />
    </View>
  )
}

export default AssignedJobInfoScreen
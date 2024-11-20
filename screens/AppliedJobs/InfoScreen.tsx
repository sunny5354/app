import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/Headers/BackHeader'
import { ScreenProps } from '../../types/navigation'
import JobInfoCard from '../../components/Cards/JobInfoCard'
import JobDescriptionCard from '../../components/Cards/JobDescriptionCard'
import Divider from '../../components/Divider'
import Typography from '../../components/Typography/Typography'
import { JobDataProps } from '../../types/jobs'
import { getSignleJobDetail } from '../../http/jobs/jobs'
import { errorToast } from '../../lib/toast'
import Loading from '../Loading'
import SingleBottomButton from '../../components/BottomButton/SingleBottomButton'
import FakeMap from '../../components/FakeMap'

const AppliedJobInfoScreen = ({ navigation, route }: ScreenProps) => {
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
        title='Applied Job Detail'
      />
      <ScrollView>
        <View className='flex-1 p-4' style={{ gap: 30 }}>
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
      <SingleBottomButton
        tilte='Applied'
        handlePress1={() => { }}
        bgColor='bg-primaryLightGreen'
      />
    </View>
  )
}

export default AppliedJobInfoScreen
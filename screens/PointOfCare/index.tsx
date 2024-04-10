import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import JobCard from '../../components/Cards/JobCard'
import { data } from '../../data/data'
import { ScreenProps } from '../../types/navigation'
import BackHeader from '../../components/Headers/BackHeader'
import { JobDataProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import Loading from '../Loading'
import { getAppliedJobs, getJobsPOC } from '../../http/jobs/jobs'
import Typography from '../../components/Typography/Typography'
import { useIsFocused } from '@react-navigation/native'

const PointOfCare = ({ navigation }: ScreenProps) => {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [publishedJobs, setPublishedJobs] = useState<JobDataProps[] | null>(null);

  const fetchPublishedJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobsPOC();
      // console.log(res);
      setPublishedJobs(res.jobs);
    } catch (error: any) {
      errorToast(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPublishedJobs();
  }, [focused])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background'>
      <BackHeader
        title='Point Of Care'
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 20 }}>
          {
            publishedJobs && publishedJobs.length > 0 ? (publishedJobs?.map((_, i) => (
              <JobCard
                data={_}
                key={i}
                handlePress={() => { navigation.navigate("PointOfCareInfoScreen", { id: _._id }) }}
                isPointOfCare
              />
            ))) :
              <View>
                <Typography>No Jobs mark as completed</Typography>
              </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default PointOfCare
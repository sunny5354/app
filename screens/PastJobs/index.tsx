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
import { getCompleteJobs } from '../../http/jobs/jobs'
import Typography from '../../components/Typography/Typography'
import { useIsFocused } from '@react-navigation/native'

const PastJobs = ({ navigation }: ScreenProps) => {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [publishedJobs, setPublishedJobs] = useState<JobDataProps[] | null>(null);

  const fetchPublishedJobs = async () => {
    setLoading(true);
    try {
      const res = await getCompleteJobs();
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
        title='Past Jobs'
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 20 }}>
          {
            publishedJobs && publishedJobs.length > 0 ? (publishedJobs?.map((_, i) => (
              <JobCard
                data={_}
                key={i}
                handlePress={() => { navigation.navigate("PastJobInfoScreen", { id: _._id }) }}
                pastJobs
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

export default PastJobs
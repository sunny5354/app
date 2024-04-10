import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import JobCard from '../../components/Cards/JobCard'
import { data } from '../../data/data'
import { ScreenProps } from '../../types/navigation'
import { JobDataProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import Loading from '../Loading'
import { getAssignedJobs } from '../../http/jobs/jobs'
import BackHeader from '../../components/Headers/BackHeader'
import Typography from '../../components/Typography/Typography'

const AssignedJobs = ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [publishedJobs, setPublishedJobs] = useState<JobDataProps[] | null>(null);

  const fetchPublishedJobs = async () => {
    setLoading(true);
    try {
      const res = await getAssignedJobs();
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
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <View className='flex-1 bg-background'>
      <BackHeader
        title='Assigned Jobs'
        handlePress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 20 }}>
          {
            publishedJobs && publishedJobs.length > 0 ? (publishedJobs?.map((_, i) => (
              <JobCard
                data={_}
                key={i}
                handlePress={() => { navigation.navigate("AssignedJobInfoScreen", { id: _._id }) }}
                assigned
              />
            ))) :
              <View>
                <Typography>No Jobs assigned to you</Typography>
              </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default AssignedJobs
import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import JobCard from '../../components/Cards/JobCard'
import Button from '../../components/Button'
import Input from '../../components/Input'
import JobFilterModal from './components/JobFilter'
import { ScreenNavigationProp } from '../../types/navigation'
import { FilterOptionsProps, JobDataProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import { filterJobs, getPublishedJobs } from '../../http/jobs/jobs'
import { useIsFocused } from '@react-navigation/native'
import Typography from '../../components/Typography/Typography'
import { getStatus } from '../../http/home'
import LockPopup from '../../components/LockPopup'

const Jobs = ({ navigation }: ScreenNavigationProp) => {

  const isFocused = useIsFocused();
  const [filterModal, setFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishedJobs, setPublishedJobs] = useState<JobDataProps[] | null>(null);

  const fetchPublishedJobs = async () => {
    setLoading(true);
    try {
      const res = await getPublishedJobs();
      // console.log(res);
      setPublishedJobs(res.jobs);
    } catch (error: any) {
      // errorToast(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  }

  const handleFilter = async (values: FilterOptionsProps) => {
    // console.log(values)
    try {
      const res = await filterJobs(values);
      // console.log(res);
      setPublishedJobs(res.jobs);
      setFilterModal(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchPublishedJobs();
  }, [isFocused])

  const [statusVisible, setStatusVisible] = useState(false);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      setUserStatus(res.status);
      if (res.status === 'Active') {
        setStatusVisible(false);
      }
      else {
        setStatusVisible(true);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  const handleSearch = (txt: string) => {
    if (!publishedJobs) {
      return;
    }
    if (txt.length > 0) {
      setPublishedJobs(publishedJobs?.filter((job) => (job.taskType.toLowerCase().includes(txt.toLowerCase()))))
    }
    else {
      fetchPublishedJobs();
    }
  }

  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  // if (loading) {
  //   return (
  //     <Loading />
  //   )
  // }


  return (
    <View className='flex-1 bg-background'>
      <Header title='Jobs' />
      {(userStatus && userStatus === "Active") ? <ScrollView>
        <View className='flex-1' style={{ gap: 20 }}>
          <View className='bg-white p-5'>
            <View className='flex-row justify-between' style={{ gap: 20 }}>
              <Button className='bg-primaryPurple px-0'>View on Map</Button>
              <View className='flex-1'>
                <Button
                  onPress={() => { setFilterModal(true) }}
                  variant='secondary'>
                  Filter
                </Button>
              </View>
            </View>
            <Input
              placeholder='Look for Jobs'
              className='bg-[#e6e6e6]'
              onChangeText={(e) => {
                handleSearch(e)
              }}
            />
          </View>
          <View className='flex-1 py-5 px-5' style={{ gap: 20 }}>
            {
              publishedJobs && publishedJobs.length > 0 ? (publishedJobs?.map((_, i) => (
                <JobCard data={_} key={i} handlePress={() => { navigation.navigate("JobInfoScreen", { id: _._id }) }} />
              ))) :
                <View>
                  <Typography>No more jobs to display</Typography>
                </View>
            }
          </View>
        </View>
      </ScrollView>
        : (
          <LockPopup />
        )
      }
      <JobFilterModal
        modalVisible={filterModal}
        handleModalVisible={() => { setFilterModal(false) }}
        handleApply={handleFilter}
        handleReset={() => {
          fetchPublishedJobs();
          setFilterModal(false);
        }}
      />
    </View>
  )
}

export default Jobs
import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import JobCard from '../../components/Cards/JobCard'
import Input from '../../components/Input'
import { ScreenNavigationProp } from '../../types/navigation'
import { JobDataProps, JobTypeFilterOptionProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import { filterOfJobType, getJobsByType } from '../../http/jobs/jobs'
import Loading from '../Loading'
import { useIsFocused } from '@react-navigation/native'
import Typography from '../../components/Typography/Typography'
import SingleBottomButton from '../../components/BottomButton/SingleBottomButton'
import Tab from '../../components/TabButton'
import JobTypeFilterModal from './components/jobFilter'
import Button from '../../components/Button'
import { getStatus } from '../../http/home'
import LockPopup from '../../components/LockPopup'


const jobTypeData = [
  {
    label: 'Scheduled',
    value: 'scheduled'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
  {
    label: "Overdue",
    value: 'overdue'
  }
]


const ScheduleJobs = ({ navigation }: ScreenNavigationProp) => {

  const isFocused = useIsFocused();
  const [filterModal, setFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState<JobDataProps[] | null>(null);
  const [jobType, setJobType] = useState<string>("scheduled");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobsByType(jobType);
      setJobDetail(res.jobs);
    } catch (error: any) {
      errorToast(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  }

  const handleFilter = async (values: JobTypeFilterOptionProps) => {
    console.log(values);
    try {
      const res = await filterOfJobType(values);
      console.log(res);
      setJobDetail(res.jobs);
      setFilterModal(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

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
    if (!jobDetail) {
      return;
    }
    if (txt.length > 0) {
      setJobDetail(jobDetail?.filter((job) => (job.taskType.toLowerCase().includes(txt.toLowerCase()))))
    }
    else {
      fetchJobs()
    }
  }

  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  useEffect(() => {
    fetchJobs();
  }, [isFocused, jobType])



  return (
    <View className='flex-1 bg-background'>
      <Header title='ScheduleJobs' />
      {(userStatus && userStatus === "Active") ? (<ScrollView className='mb-20'>
        <View className='flex-1' style={{ gap: 20 }}>
          <View className='bg-white p-5 flex-1' style={{ gap: 10 }}>
            <View className='flex-1'>
              <Tab
                data={jobTypeData}
                selectedValue={jobType}
                setSelectedValue={setJobType}
              />
            </View>
            <Input
              placeholder='Look for Jobs'
              className='bg-[#e6e6e6]'
              onChangeText={(e) => { handleSearch(e) }}
            />
          </View>
          {!loading ? <View className='flex-1 py-5 px-5' style={{ gap: 20 }}>
            {
              jobDetail && jobDetail.length > 0 ? (jobDetail?.map((_, i) => (
                <JobCard data={_} key={i} handlePress={() => { navigation.navigate("JobTypeInfoScreen", { id: _._id, jobType: jobType }) }}
                  scheduled={jobType === "scheduled"}
                  completed={jobType === "completed"}
                  overdue={jobType === "overdue"}
                />
              ))) :
                <View>
                  <Typography>No jobs to display</Typography>
                </View>
            }
          </View>
            :
            <View className='flex-1 h-80'>
              <Loading />
            </View>
          }
        </View>
      </ScrollView>)
        : (
          <LockPopup />
        )
      }
      <JobTypeFilterModal
        modalVisible={filterModal}
        handleModalVisible={() => { setFilterModal(false) }}
        handleApply={handleFilter}
        handleReset={() => {
          fetchJobs()
          setFilterModal(false);
        }}
      />
      {(userStatus && userStatus === "Active") && <SingleBottomButton
        tilte='Filter Jobs'
        handlePress1={() => { setFilterModal(true) }}
      />}
    </View>
  )
}

export default ScheduleJobs
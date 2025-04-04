import { ScrollView, View , Pressable, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/Headers/BackHeader'
import { ScreenProps } from '../../types/navigation'
import JobDescriptionCard from '../../components/Cards/JobDescriptionCard'
import Divider from '../../components/Divider'
import Typography from '../../components/Typography/Typography'
import { JobDataProps, LogMileageDataProps, LogMileageProps } from '../../types/jobs'
import { errorToast, successToast } from '../../lib/toast'
import { getLogMileageDetails, getSignlePOCJobDetail, uploadLogMileageDetails } from '../../http/jobs/jobs'
import Loading from '../Loading'
import JobTypeInfoCard from './components/JobTypeInfoCard'
import FilterButtons from '../../components/BottomButton/FilterButtons'
import LogMileageModal from './components/LogMileage'
import FakeMap from '../../components/FakeMap'
import SingleBottomButton from '../../components/BottomButton/SingleBottomButton'
import AddQaForm from './components/AddQaform'
import Button from '../../components/Button'
import { useIsFocused } from '@react-navigation/native'

const JobTypeInfoScreen = ({ navigation, route }: ScreenProps) => {

  const { id } = route.params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<JobDataProps | null>(null);
  const [logMileageModal, setLogMileageModal] = useState(false);
  const [uploadqaModal, setUploadQaModal] = useState(false);
  const [logMilegaeDetails, setLogMileageDetails] = useState<LogMileageDataProps | null>(null);

  const fetchSingleJobDetail = async () => {
    setLoading(true);
    try {
      const res = await getSignlePOCJobDetail(id);
      setData(res.job);
    } catch (error: any) {
      errorToast(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
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

  const fetchLogMileage = async () => {
    try {
      const res = await getLogMileageDetails(id);
      setLogMileageDetails(res.mileageLog);
    } catch (error: any) {
      // errorToast(error.response.data.message);
      // console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchSingleJobDetail();
    fetchLogMileage();
  }, [isFocused])

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!data) {
    return null;
  }

  return (
    <View className='flex-1 bg-slate-100'>
      <BackHeader
        handlePress={() => { navigation.goBack() }}
        title='Scheduled Job Detail'
      />
      <ScrollView>
        <View className='flex-1 p-4 mb-20' style={{ gap: 30 }}>
          <JobTypeInfoCard data={data} />
          <JobDescriptionCard data={data} />
          <Divider />
          <View className='flex-col items-start flex-1'>
            <Typography class='font-PoppinsSemiBold'>Location : </Typography>
            <Typography variant='sm' class='flex-1'>{data.location}</Typography>
          </View>
          <FakeMap location={data.location}/>
        </View>
      </ScrollView>
      {
        data?.qaStatus == "QA Submitted" &&
        <Pressable className='bg-[#1B2850] px-6 py-2 flex justify-center items-center rounded-lg'>
          <Typography class='text-white font-PoppinsSemiBold'>QA Submitted</Typography>
        </Pressable>      
      }

      { 
        data?.qaStatus == "QA Disapproved" &&
        <Pressable className='bg-[#1B2850] px-6 py-2 flex justify-center items-center rounded-lg'>
          <SingleBottomButton 
            handlePress1={()=>{
              setUploadQaModal(true);
            }}
            tilte='Re-submit QA Document'
          />  
        </Pressable>      
      }

      {
        data?.qaStatus == "QA Approved" &&
        <Pressable className='bg-[#25ba74] px-6 py-2 flex justify-center items-center rounded-lg'>
          <Typography class='text-white font-PoppinsSemiBold'>QA Approved</Typography>
        </Pressable>      
      }


      {
        data?.qaStatus == "Paid" &&
        <Pressable className='bg-[#25ba74] px-6 py-2 flex justify-center items-center rounded-lg'>
          <Typography class='text-white font-PoppinsSemiBold'>Paid</Typography>
        </Pressable>      
      }

      {
        data?.qaStatus == "QA Inprogress" &&
        <SingleBottomButton 
          handlePress1={()=>{
            setUploadQaModal(true);
          }}
          tilte='QA Document'
        />    
      }
      
      <AddQaForm
        modalVisible={uploadqaModal}
        handleModalVisible={() => {
          setUploadQaModal(false);
        }}
        handleSubmit={handleSubmit}
        data={data.agencyId}
        jobId={id}
      />
      <LogMileageModal
        modalVisible={logMileageModal}
        handleModalVisible={() => {
          setLogMileageModal(false);
        }}
        handleSubmit={handleSubmit}
        data={logMilegaeDetails}
      />
    </View>
  )
}

export default JobTypeInfoScreen
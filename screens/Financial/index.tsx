import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import FinanceCard from '../../components/Cards/FinancialCard'
import { data } from '../../data/data'
import { ScreenProps } from '../../types/navigation'
import BackHeader from '../../components/Headers/BackHeader'
import { JobDataProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import Loading from '../Loading'
import { fetchList } from '../../http/financial'
import Typography from '../../components/Typography/Typography'
import { useIsFocused } from '@react-navigation/native'

const Financial = ({ navigation }: ScreenProps) => {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialdata] = useState([]);

  const fetchPublishedJobs = async () => {
    setLoading(true);
    try {
      const res = await fetchList();
      console.log("Financial",res);
      setFinancialdata(res.jobs);
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
        title='Financial'
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 0 }}>
          {
            financialData && financialData.length > 0 ? (financialData?.map((item, i) => (
              <FinanceCard
                key={item?._id}
                data={item}
              />
            ))) :
              <View>
                <Typography>No data has been found</Typography>
              </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Financial
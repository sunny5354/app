import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import JobCard from '../../components/Cards/JobCard'
import { data } from '../../data/data'
import { ScreenProps } from '../../types/navigation'
import { JobDataProps } from '../../types/jobs'
import { errorToast } from '../../lib/toast'
import Loading from '../Loading'
import BackHeader from '../../components/Headers/BackHeader'
import Typography from '../../components/Typography/Typography'
const OnCall = ({ navigation }: ScreenProps) => {

  return (
    <View className='flex-1 bg-background'>
      <BackHeader
        title='On Call'
        handlePress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View className='flex-1 p-5' style={{ gap: 20 }}>
          {
            <View>
                <Typography></Typography>
              </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}
export default OnCall
import { StyleSheet, View, Text, ScrollView } from "react-native";

import React from 'react'

import Typography from '../Typography/Typography'
import Divider from '../Divider';

const OnCallCard = ({ data }:any) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.card}>
      <View className='bg-white rounded-lg p-1' style={{ gap: 1 }}>
        <Typography variant='lgb'>{data?.day}</Typography>
        <Divider className='my-2' />

        <View>
        <Typography variant="sm" class='text-primaryGreen'>Agency : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data.agencyData}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>Patient Locations : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data?.patientData}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>Agency Contact No. : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data?.agencycontact}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>On Call Time : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data?.calltime}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>On Call Mode : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data?.callmode}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>Service Start Date  : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
            {data?.servicestarttime}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>Service End Date : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm'>
             {data?.serviceendtime}
          </Typography>
        </View>
        </View>

        <View>
        <Typography variant="sm" class='text-primaryGreen'>On Call Phone No. : </Typography>
        <View className='flex-row' style={{ gap: 10 }}>
          <Typography variant='xsm' class="mb-3">
            {data?.phoneno}
          </Typography>
        </View>
        </View>

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f8fa",
    margin: -25
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    color: "#00AFAF",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    padding: 15,  
    fontFamily: 'font-PoppinsSemiBold',
    marginBottom: 60
  },
  jobId: {
    fontSize: 16
  },
  jobIdValue: {
    color: "#333",
  },
  status: {
    marginTop: -5,
    color: "white",
    backgroundColor: "#FF4444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: -60,
    // fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
  },
  detailsContainer: {
    marginTop: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  label: {
    color: "#555",
    fontFamily: 'font-PoppinsBold'
  },
  value: {
    color: "#333",
    flexWrap: 'wrap'
  },
  qaApproved: {
    color: "white",
    backgroundColor: "#1E90FF",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 12,
  },
});

export default OnCallCard


import React from 'react'
import Divider from "../../components/Divider";
import { ScreenProps } from '../../types/navigation'
import BackHeader from '../../components/Headers/BackHeader'
import Typography from "../../components/Typography/Typography";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import OnCallCard from '../../components/Cards/OnCallCard';

const OnCall = ({ navigation }: ScreenProps) => {

  const onCallData = [
    {
      "day": "Saturday",
      "agencyData": "Haloes Touch Hospice Inc.11500, S Eastern Ave. Ste. 150, Office #1509 Henderson, NV 89052",
      "patientData": "Clark County",
      "agencycontact": "Phone: 702-625-4644 Email: hello@haloestouch.com",
      "calltime": "08:00 PM to 07:30 AM",
      "callmode": "Phone support, Visit support",
      "servicestarttime": "01.26.2025",
      "serviceendtime": "06.30.2025",
      "phoneno": "702-536-3201"
    },
    {
      "day": "Sunday",
      "agencyData": "Haloes Touch Hospice Inc.11500, S Eastern Ave. Ste. 150, Office #1509 Henderson, NV 89052",
      "patientData": "Clark County",
      "agencycontact": "Phone: 702-625-4644 Email: hello@haloestouch.com",
      "calltime": "08:00 PM to 07:30 AM",
      "callmode": "Phone support, Visit support",
      "servicestarttime": "01.26.2025",
      "serviceendtime": "06.30.2025",
      "phoneno": "702-536-3201"
    }
  ]

  return (
    <View className='flex-1 bg-background'>
      <BackHeader
        title='On Call'
        handlePress={() => { navigation.goBack() }}
      />
      <ScrollView contentContainerStyle={styles.card}>

      <View className='flex-1 p-0' style={{ gap: 0 }}>
          {
            onCallData && onCallData.length > 0 ? (onCallData?.map((item, i) => (
              <OnCallCard
                key={i}
                data={item}
              />
            ))) :
              <View>
                <Typography>No data has been found {onCallData?.length}</Typography>
              </View>
          }
        </View>
      
      </ScrollView>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f8fa",
    paddingTop: 10,
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
    margin: 20,
    padding: 15,
    elevation: 5,
    fontFamily: 'font-PoppinsSemiBold'
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
    textTransform: "uppercase",
    fontSize: 12
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

export default OnCall
import { StyleSheet, View, Text, ScrollView } from "react-native";

import React from 'react'

import Typography from '../Typography/Typography'
import Divider from '../Divider';

const FinancialCard = ({ data }:any) => {

  const DetailRow = ({ label, value, valueStyle }:any) => (
    <View style={styles.row}>
      <Text style={styles.label}><Typography variant="sxl">{label}</Typography></Text>
      <Text style={[styles.value, valueStyle]}>
        <Typography variant="ssxl">{value}</Typography>
      </Text>
    </View>
  );

  const DetailRowJobStatus = ({ label, value, valueStyle }:any) => (
    <View style={styles.row}>
      <Text style={styles.label}><Typography variant="sxl">{label}</Typography></Text>
      <Text style={[styles.value, valueStyle]}>
        <Typography class="text-white" variant="ssxl">{value}</Typography>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.card}>
        <View className="flex flex-row justify-between">
          <Text><Typography class="text-2xl">Job Id: <Text>{data?.jobId}</Text></Typography></Text>
          <Text style={styles.status} className="text-2xl">Paid</Text>
        </View>
        <Divider />
        <View style={styles.detailsContainer}>
          <DetailRow label="Scheduled Date" value={data?.jobDateAndTime} />
          <DetailRow label="Patient Id" value={data?.patientId} />
          <DetailRow label="Payt. Mode" value={data?.paytMode} />
          <DetailRow label="Hours" value={data?.hours} />
          <DetailRowJobStatus
            label="Job Status"
            value={data?.jobStatus}
            valueStyle={styles.qaApproved}
          />
          <DetailRow label="Job Amount" value={`$${data?.jobAmount}`} />
          <DetailRow label="Mileage" value={`${data?.mileage} miles`} />
          <DetailRow label="Mileage Re-Imb." value={`${data?.mileageReImb}`} />
          <DetailRow label="Amt. Paid" value={`${data?.jobAmount}`} />
          <DetailRow label="Payt. Rate" value={""} />
          <DetailRow label="Payt. Date" value={data?.paytDate} />
          <DetailRow label="Duration" value={""} />
          <DetailRow label="Tax Dedn" value={""} />
          <DetailRow label="Payt. Method" value={data?.paytMethod} />
          <DetailRow label="Trx. Id." value={data?.trxID} />
        </View>
      </ScrollView>
    </View>
  )
}

export default FinancialCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f8fa",
    paddingTop: 10,
    margin: -18,
    marginBottom: 10
  },
  header: {
    fontSize: 24,
    // fontWeight: "bold",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontFamily: 'font-PoppinsSemiBold'
  },
  jobId: {
    fontSize: 16,
    // fontWeight: "bold",
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
    // fontWeight: "bold",
    color: "#333",
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
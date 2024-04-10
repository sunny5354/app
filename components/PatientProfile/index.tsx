import React, { useEffect, useState } from "react";
import { View, Modal, Platform, ScrollView } from "react-native";
import { ModalChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import BackHeader from "../Headers/BackHeader";
import PatientInformation from "./components/PatientInformation";
import { getPatientDetails } from "../../http/jobs/jobs";
import { PatientDetailProps } from "../../types/jobs";
import FamilyInformation from "./components/FamilyInformation";
import TreatmentProfile from "./components/TreatmentProfile";
import CarePlan from "./components/CarePlan";
import ProfileInfo from "./components/ProfileInfo";


const PatientProfile: React.FC<ModalChildrenProps & { id: string }> = ({
  modalVisible,
  handleModalVisible,
  id,
  ...otherProps
}) => {

  const [patientDetails, setPatiendDetails] = useState<PatientDetailProps | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await getPatientDetails(id);
        // console.log(res);
        setPatiendDetails(res.patient);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    fetchPatientDetails();
  }, [modalVisible])

  if (!patientDetails) return null;

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleModalVisible();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
      {...otherProps}
    >
      <View
        className={cn(
          `flex-1 rounded-none overflow-hidden`,
          Platform.OS === 'ios' ? "mt-12 mb-3" : "mt-1"
        )}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}
      >
        <View className="flex-1 bg-background w-full">
          <BackHeader
            title="Patient Profile"
            handlePress={handleModalVisible}
          />
          <ScrollView>
            <View className="flex-1 bg-background w-full p-4">
              <ProfileInfo data={patientDetails} />
              <PatientInformation data={patientDetails} />
              <FamilyInformation data={patientDetails} />
              <TreatmentProfile data={patientDetails} />
              <CarePlan data={patientDetails} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PatientProfile;
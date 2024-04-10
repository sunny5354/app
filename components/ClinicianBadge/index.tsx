import React, { useEffect, useState } from "react";
import { View, Modal, Platform, ScrollView, Image } from "react-native";
import { ModalChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import BackHeader from "../Headers/BackHeader";
import { getClinicianBadgeDetails } from "../../http/jobs/jobs";
import { ClinicianBadgeProps } from "../../types/jobs";
import { backgroundShadow } from "../backgroundShadow";
import Typography from "../Typography/Typography";
import Button from "../Button";
import badgeImg from "../../assets/Profile/badgeCircle.png"
import logo from "../../assets/whiteLogo.png"
import { Ionicons } from '@expo/vector-icons';
import callIcon from "../../assets/call.png"


const ClinicianBadge: React.FC<ModalChildrenProps & { id: string }> = ({
  modalVisible,
  handleModalVisible,
  id,
  ...otherProps
}) => {

  const [badgeDetails, setBadgeDetails] = useState<ClinicianBadgeProps | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await getClinicianBadgeDetails(id);
        // console.log(res);
        setBadgeDetails(res.jobBadge)
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    fetchPatientDetails();
  }, [modalVisible])

  if (!badgeDetails) return null;

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
            title="Clinician ID Badge"
            handlePress={handleModalVisible}
          />
          <ScrollView>
            <View className="flex-1 bg-background w-full p-4">

              <View className="relative overflow-hidden flex-1 w-full bg-red-500" style={backgroundShadow.backgroundShadow}>
                {/* <Image
                  source={badgeImg}
                  alt="badge image"
                  className="absolute h-[45%] top-0 -right-10 left-0 w-full"
                /> */}
                <View className="absolute -top-6 left-[52px]">
                  <Image
                    source={logo}
                    alt="badge image"
                    height={10}
                    width={10}
                    className=" z-10 w-20"
                    resizeMode="contain"
                  />
                </View>
                <View
                  className="bg-[#07092B] h-48 absolute top-0 right-0 left-0 rounded-br-[180px]"
                />
                <View className='justify-center items-center mt-28' style={{ gap: 2 }}>
                  <Image
                    source={{ uri: badgeDetails.staffAvatar.url }}
                    alt='proifle image'
                    height={600}
                    width={600}
                    className='h-24 w-24 bg-primaryGreen rounded-full'
                  />
                  <Typography variant='xl'>{badgeDetails?.staffName}</Typography>
                  <Typography variant="xsm">Staff ID: {badgeDetails?.staffId}</Typography>
                  <Typography>Member Since: {badgeDetails?.staffMemberSince}</Typography>
                </View>
                <View className='h-14 flex-1 flex justify-center items-center'>
                  <Button
                    className='bg-primaryBlue w-60 px-0'
                    classView='flex-1'
                    my={0}
                  >Registered Nurse</Button>
                </View>
                <View className="h-[1px] bg-primaryBlue" />
                <View className="justify-center items-center mt-2" style={{ gap: 2 }}>
                  <Typography class="font-PoppinsMedium">{badgeDetails?.agencyName}</Typography>
                  <Typography variant="xsm">{badgeDetails?.agencyLocation}</Typography>
                  <View className="flex-row items-center" style={{ gap: 10 }}>
                    {/* <Ionicons name="call-outline" size={20} color="black" /> */}
                    <Image
                      source={callIcon}
                      alt="call icon"
                      height={20}
                      width={20}
                      resizeMode="contain"
                      className="h-6 w-6"
                    />
                    <Typography>
                      {badgeDetails?.agencyPhone}</Typography>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ClinicianBadge;
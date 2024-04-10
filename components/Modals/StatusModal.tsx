import React from "react";
import { View, Modal, } from "react-native";

// Custom Imports
import { ModalChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import Typography from "../Typography/Typography";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation";



const StatusModal: React.FC<ModalChildrenProps> = ({
  modalVisible,
  handleModalVisible,
  ...otherProps
}) => {

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        handleModalVisible();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
      {...otherProps}
    >
      <View
        className={cn(
          `flex-1 justify-center items-center mt-2 rounded-t-3xl overflow-hidden`
        )}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}
      >
        <View className="w-[350px] mx-4 overflow-hidden min-h-[240px] bg-white rounded-lg">
          <View className='flex-1 justify-center items-center' style={{ gap: 10 }}>
            <Typography variant='sm'>Your account is not activated yet</Typography>
            <Typography variant='xsm'>Please complete your profile first!</Typography>
            <View className="h-20">
              <Button
                onPress={() => { navigation.navigate("Menu") }}
              >Go to Profile</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;

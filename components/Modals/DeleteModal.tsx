import React, { useContext, useEffect } from "react";
import { View, Modal, ScrollView, Pressable, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// Custom Imports
import { DeleteChildrenProps, ModalChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import Typography from "../Typography/Typography";
import Button from "../Button";



const DeleteModal: React.FC<DeleteChildrenProps> = ({
  modalVisible,
  handleModalVisible,
  label,
  text,
  handleDelete,
  ...otherProps
}) => {

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
        <View className="w-[350px] mx-4 overflow-hidden min-h-[250px]">
          <View className="flex-1 bg-white overflow-hidden px-2 py-4 rounded-xl" style={{ gap: 20 }}>
            <View className="justify-center items-center ">
              <Typography class="text-primaryRed font-PoppinsSemiBold">
                Delete {label}
              </Typography>
            </View>
            <View style={{ gap: 2, paddingHorizontal: 10 }}>
              <Typography variant="sm">{text}</Typography>
              <Typography variant="sm">
                If, Yes then please click the below
                delete button to confirm.</Typography>
            </View>
            <View className="flex-1 max-h-14 justify-center items-center  flex-row" style={{ gap: 10 }}>
              <Button onPress={() => { handleDelete() }} variant="delete" my={0}>Delete</Button>
              <Button onPress={() => { handleModalVisible() }} variant="cancel" my={0}>Cancel</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
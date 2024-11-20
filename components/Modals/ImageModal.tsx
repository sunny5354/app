import React from "react";
import { View, Modal, Pressable, Image, } from "react-native";
import { Entypo } from '@expo/vector-icons';

// Custom Imports
import { ImageModalProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import Typography from "../Typography/Typography";
import colors from "../../config/colors";
import imgImg from "../../assets/icons/image.png"
import { fetchDocument } from "../../lib/fetchDocument";
import { errorToast } from "../../lib/toast";
import { updateBasicProfilePicture, updateProfilePicture } from "../../http/profile/account";



const ImageModal: React.FC<ImageModalProps> = ({
  modalVisible,
  handleModalVisible,
  setRefresh,
  basic,
  ...otherProps
}) => {


  const uploadDoc = async () => {
    const result = await fetchDocument(['image/jpg', "image/jpeg", "image/png"]);
    if (result.canceled) return;
    console.log(result);
    try {
      let updateRes;
      if (basic) {
        updateRes = await updateBasicProfilePicture(result.assets[0]);
      }
      else {
        updateRes = await updateProfilePicture(result.assets[0]);
      }
      // console.log(updateRes);
      setRefresh((prevState) => !prevState);
      handleModalVisible();
    } catch (error: any) {
      console.log("upload profile error=> ", error.response);
      errorToast(error.response.data.message);
    }
  }

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
        <View className="w-[350px] mx-4 overflow-hidden min-h-[240px]">
          <View className="flex-1 justify-between bg-white overflow-hidden px-2 py-4 rounded-xl" style={{ gap: 20 }}>
            <View className="" style={{ gap: 20 }}>
              <View className="justify-between px-3 items-center flex-row">
                <View></View>
                <Typography class="text-primaryRed font-PoppinsSemiBold">
                  Profile Photo
                </Typography>
                <Pressable onPress={() => { handleModalVisible() }}>
                  <Entypo name="circle-with-cross" size={20} color={colors.primaryRed} />
                </Pressable>
              </View>
              <View style={{ gap: 2, paddingHorizontal: 10 }}>
                <Typography variant="sm">
                  This photo will be used for your electronic ID badge and will be visible to organizations viewing your profile. Please use a clear photo of only your face.</Typography>
              </View>
            </View>
            <View className="flex-1 max-h-14 justify-center" style={{ gap: 10 }}>
              <Pressable onPress={uploadDoc} className="border-t border-primaryGreen flex-row items-center px-4 py-3" style={{ gap: 10 }}>
                <Image
                  source={imgImg}
                  className="h-8 w-8"
                />
                <Typography>Upload Image</Typography>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;

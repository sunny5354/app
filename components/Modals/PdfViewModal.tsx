import React, { useEffect, useState } from "react";
import { View, Modal, Pressable, Image, Platform } from "react-native";
import { Entypo } from '@expo/vector-icons';
import pdfImg from "../../assets/icons/pdfIcon.png"
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

// Custom Imports
import { PdfViewProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import Typography from "../Typography/Typography";
import Button from "../Button";
import colors from "../../config/colors";
import { errorToast } from "../../lib/toast";
import { fetchFile } from "../../http/util/fetchFile";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation";
import { downloadFromUrl } from "../../lib/fileDownloadIOS";



const PdfViewModal: React.FC<PdfViewProps> = ({
  modalVisible,
  handleModalVisible,
  pdfObject,
  ...otherProps
}) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  // console.log(pdfObject);

  // const [fileUrl, setFileUrl] = useState("");

  // const fetchFileDataUrl = async () => {
  //   setIsBtnLoading(true);
  //   try {
  //     const result = await fetchFile(name);
  //     setFileUrl(result.fileUrl);
  //   } catch (error: any) {
  //     console.log(error.response.data.message);
  //     errorToast(error.response.data.message ?? "An error occurred");
  //   }
  //   setIsBtnLoading(false);
  // }

  const downloadFromUrl = async (url: string, fileName: string) => {
    const { uri, headers } = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName
    );
    save(uri);
  };
  const save = async (uri: string) => {
    shareAsync(uri);
    handleModalVisible();
  };

  // useEffect(() => {
  //   if (modalVisible) {
  //     fetchFileDataUrl();
  //   }
  // }, [modalVisible])

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
        <View className="w-[350px] mx-4 overflow-hidden h-64">
          {pdfObject !== null ? (<View className="flex-1 bg-white overflow-hidden px-2 py-4 rounded-xl">
            <Pressable className="absolute right-2 top-2 z-20" onPress={() => { handleModalVisible() }}>
              <Entypo name="circle-with-cross" size={20} color={colors.primaryRed} />
            </Pressable>
            <View className="justify-center items-center pt-1">
              <Image
                source={pdfImg}
                style={{ width: 100, height: 100 }}
                alt="pdf"
              />
              <Typography variant="xsm" class="text-center mt-3 mx-4">{pdfObject.name}</Typography>
            </View>
            <View className="flex-1 max-h-16 justify-center items-end  flex-row" style={{ gap: 10 }}>
              {Platform.OS === 'android' && <Button
                disabled={isBtnLoading}
                onPress={() => {
                  navigation.navigate("DownloadWeb", {
                    url: pdfObject.url,
                  });
                  handleModalVisible();
                }} my={0}>Download</Button>}
              {Platform.OS === 'ios' && <Button
                disabled={isBtnLoading}
                onPress={() => {
                  downloadFromUrl(pdfObject.url, "educationPdf")
                }} my={0}>Download</Button>}
              {/* <Button onPress={() => { handleModalVisible() }} variant="delete" my={0}>Delete</Button> */}
            </View>
          </View>)
            :
            (<View className="flex-1 bg-white overflow-hidden px-2 py-4 justify-center items-center rounded-xl">
              <Pressable className="absolute right-2 top-2 z-20" onPress={() => { handleModalVisible() }}>
                <Entypo name="circle-with-cross" size={20} color={colors.primaryRed} />
              </Pressable>
              <Typography>No File Uploaded</Typography>
            </View>)
          }
        </View>
      </View>
    </Modal>
  );
};

export default PdfViewModal;
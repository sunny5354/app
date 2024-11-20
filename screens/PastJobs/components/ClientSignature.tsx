import React, { useRef, useState } from "react";
import { View, Modal, Platform } from "react-native";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

// Custom Imports

import { LogMileageModalProps, signatureModalProps } from "../../../types/Modal";
import { cn } from "../../../lib/cn";
import BackHeader from "../../../components/Headers/BackHeader";
import Button from "../../../components/Button";
import { uploadImage } from "../../../http/util/uploadFile";



const ClientSignatureModal: React.FC<signatureModalProps> = ({
  modalVisible,
  handleSubmit,
  handleModalVisible,
  ...otherProps
}) => {

  const [sign, setSign] = useState<string | null>(null);

  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: string) => {
    console.log("here");
    setSign(signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    ref.current && ref.current.clearSignature();
  };

  const handleConfirm = async () => {
    console.log("end");
    ref.current && ref.current.readSignature();
    if (sign === null) {
      alert("Please draw sign");
      return;
    }
    try {
      const obj = {
        mimeType: "image/png",
        name: "client signature",
        uri: sign
      }
      const res = await uploadImage(obj);
      handleSubmit({
        _id: res.file._id,
        name: res.file.name,
        url: res.file.url
      });
      handleModalVisible();
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;


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
        <View className="flex-1 bg-white w-full">
          <BackHeader
            title="Client Signature"
            handlePress={handleModalVisible}
          />
          <View className="flex-1 bg-white w-full p-4">
            <View className="flex-1">
              <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleSignature}
                onEmpty={handleEmpty}
                onClear={handleClear}
                // autoClear={true}
                descriptionText={"Signuature"}
                webStyle={style}
              />
            </View>
            <View className="flex-1 flex-row justify-between items-start" style={{ gap: 20 }}>
              <Button
                onPress={() => {
                  handleConfirm()
                }}
                my={0}>Save</Button>
              <Button
                onPress={() => {
                  handleClear();
                  handleModalVisible()
                }}
                my={0} className="bg-primaryRed">Cancel</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClientSignatureModal;
import React, { useEffect, useState } from "react";
import { View, Modal, Platform, ScrollView } from "react-native";
import { ModalChildrenProps } from "../../types/Modal";
import { cn } from "../../lib/cn";
import BackHeader from "../Headers/BackHeader";
import DocumentInformation from "./components/DocumentInformation";
import { getDocumentDetails } from "../../http/documents/documents";
import { DocumentDataProps } from "../../types/documents";


const DocumentProfile: React.FC<ModalChildrenProps & { id: string, }> = ({
  modalVisible,
  handleModalVisible,
  id,
  ...otherProps
}) => {

  const [documentDetails, setDocumentDetails] = useState<DocumentDataProps | null>(null);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const res = await getDocumentDetails(id);
        // console.log(res);
        setDocumentDetails(res.documents);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    fetchDocumentDetails(); 
  }, [modalVisible])

  if (!documentDetails) return null;

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
            title="Agency Forms"
            handlePress={handleModalVisible}
          />
          <ScrollView>
            <View className="flex-1 bg-background w-full p-4">
              <DocumentInformation data={documentDetails} />             
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DocumentProfile;
import { Image, Platform, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'


import pdfIcon from "../../assets/icons/pdfIcon.png"
import Typography from '../Typography/Typography'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../types/navigation'
import { fetchFile } from '../../http/util/fetchFile'
import { errorToast } from '../../lib/toast'
import DeleteModal from '../Modals/DeleteModal'
import { UploadedDataProps } from '../../types/types'
import { deleteFile } from '../../http/util/deleteFile'
import { downloadFromUrl } from '../../lib/fileDownloadIOS'

const PdfViewCard = ({ _id,name,url, setUploadedDoc }: { _id:string,url:string,name: string, setUploadedDoc: Dispatch<SetStateAction<UploadedDataProps | null>> }) => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);


  // const [fileUrl, setFileUrl] = useState("");

  // const fetchFileDataUrl = async () => {
  //   setIsBtnLoading(true);
  //   try {
  //     const result = await fetchFile(_id);
  //     setFileUrl(result.fileUrl);
  //   } catch (error: any) {
  //     console.log("pdf fetch api =>", error.response.data.message);
  //     errorToast(error.response.data.message ?? "An error occurred");
  //   }
  //   setIsBtnLoading(false)
  // }

  const handleDelete = async () => {
    try {
      const result = await deleteFile(_id);
      console.log(result);
      // setFileUrl(result.fileUrl);
      setUploadedDoc(null);
      console.log(result);
    } catch (error: any) {
      console.log(error.response.data.message);
      errorToast(error.response.data.message ?? "An error occurred");
    }
  }
  // useEffect(() => {
  //   fetchFileDataUrl();
  // }, [])

  return (
    <View className='flex-1 justify-center items-center py-2 px-2 border-border border border-dashed rounded-xl' style={{ gap: 20 }}>
      <View className="justify-center items-center pt-1">
        <Image
          source={pdfIcon}
          style={{ width: 100, height: 100 }}
          alt="pdf"
        />
        <Typography variant="xsm" class="text-center mt-3 mx-4">{name}</Typography>
      </View>
      <View className="flex-1 max-h-16 justify-center items-end  flex-row" style={{ gap: 10 }}>
        {Platform.OS === 'android' && <Button
          disabled={isBtnLoading}
          onPress={() => {
            navigation.navigate("DownloadWeb", {
              url: url,
            });
          }} my={0}>Download</Button>}
        {Platform.OS === 'ios' && <Button
          disabled={isBtnLoading}
          onPress={() => {
            downloadFromUrl(url, "educationPdf")
          }} my={0}>Download</Button>}
        <Button onPress={() => { setDeleteModal(true) }} variant="delete" my={0}>Delete</Button>
      </View>
      <DeleteModal
        modalVisible={deleteModal}
        handleModalVisible={() => { setDeleteModal(false) }}
        handleDelete={handleDelete}
        label='PDF'
        text='Are you sure you want to delete your added education pdf'
      />
    </View>
  )
}

export default PdfViewCard
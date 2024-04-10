import { Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'



import Typography from '../Typography/Typography'
import Button from '../Button'
import { UploadCardProps, UploadedDataProps } from '../../types/types'
import { fetchDocument } from '../../lib/fetchDocument'
import { uploadFile, uploadImage } from '../../http/util/uploadFile'






const UploadCard: React.FC<UploadCardProps> = ({ img, reset, type, shortDesc, title, onPress }) => {

  const [uploadedDoc, setUploadedDoc] = useState<null | UploadedDataProps>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await fetchDocument(type);
      if (result.canceled) return;
      setIsUploading(true);
      if (type[0] === 'application/pdf') {
        try {
          const res = await uploadFile(result.assets[0]);
          //@ts-ignore
          onPress(res.file);
          setUploadedDoc(res.file);
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
      else {
        try {
          const res = await uploadImage(result.assets[0]);
          //@ts-ignore
          onPress(res.file);
          setUploadedDoc(res.file);
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsUploading(false);
  }

  useEffect(() => {
    setIsUploading(false);
    setUploadedDoc(null);
  }, [reset])

  if (isUploading) return (
    <View className='flex-1 py-5 justify-center items-center border-border border-2 m-2 border-dashed min-h-[240px] rounded-xl' style={{ gap: 10 }}>
      <View className='justify-center items-center' style={{ gap: 15 }}>
        <Typography variant='xl'>Uploading....</Typography>
      </View>
    </View>
  )

  if (uploadedDoc) {
    return (
      <View className='justify-center items-center'>
        <Typography>File Uploaded Successfully</Typography>
        <Typography variant='xsm'>Name: {uploadedDoc.name} </Typography>
      </View>
    )
  }

  return (
    <View className='flex-1 py-5 justify-between items-center border-border border-2 m-2 border-dashed min-h-[240px] rounded-xl' style={{ gap: 10 }}>
      <View className='justify-center items-center' style={{ gap: 15 }}>
        <Typography variant='xl' class='text-center'>{title}</Typography>
        <View className='h-36 w-36 border-dashed rounded-full flex-1 border-2 border-border items-center justify-center' style={{ gap: 10 }}>
          {img && <Image source={img} alt='pdf' className='h-10 w-10' />}
          <Typography variant='xsm' class='text-center mx-2'>{shortDesc}</Typography>
        </View>
        <Button onPress={handleUpload}>Upload</Button>
      </View>
    </View>
  )
}

export default UploadCard
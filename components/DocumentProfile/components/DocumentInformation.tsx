import { View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { backgroundShadow } from '../../backgroundShadow'
import { DocumentDataProps } from '../../../types/documents'
import Typography from '../../Typography/Typography'
import DocPdfViewModal from '../../Modals/DocPdfViewModal';

 
const InfoTypography = ({ label, value }: { label: string, value: string }) => {
  return (
    <View className='flex-row justify-between'>
      <View className='flex-1'>
        <Typography variant='sm' class='font-PoppinsMedium text-primaryGreen'>{label}</Typography>
      </View>
      <View className='flex-[1.5] justify-start items-start'>
        <Typography variant='sm'>{value}</Typography>
      </View>
    </View>
  )
}

const DocumentInformation = ({ data }: { data: DocumentDataProps }) => {
  const [pdfViewModal, setPdfViewModal] = useState(false);
  const [pdfObject, setPdfObject] = useState<DocumentDataProps | null>(null);
  const openPdfModal = (_pdfData: any) => {
    setPdfViewModal(true)
    setPdfObject(_pdfData)
  }
  return (
    <View>
      {data.length > 0 ? data.map((item) => {
        const pdfData = {
          _id: item.formDoc._id,
          name: item.formDoc.name,
          url: item.formDoc.url
        }
        return <View key={item._id} style={backgroundShadow.backgroundShadow}>
          <Typography class='font-PoppinsMedium' variant='sm'>{item.formname}</Typography>
          <View className='h-[1px] bg-border' />
          <View style={{ gap: 8 }}>
            <InfoTypography label='Purpose' value={item.purpose} />
            <InfoTypography label='Instruction' value={item.instruction} />
            <Pressable onPress={() => { openPdfModal(pdfData) }} className='bg-[#1B2850] px-6 py-2 flex justify-center items-center rounded-lg'>
              <Typography class='text-white font-PoppinsSemiBold'>Download</Typography>
            </Pressable>
          </View>
        </View>
      })
        :
        <View className='flex-1 justify-center items-center'>
          <Typography class='text-center'>No Agency Forms Found</Typography>
        </View>
      }
      <DocPdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={pdfObject}
      />
    </View>
  )
}
export default DocumentInformation
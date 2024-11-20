import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import Typography from '../../../../components/Typography/Typography'
import Pending from './Pending'
import Process from './Process'
import { BackgroundCheckProp } from '../../../../types/profile'
import { dateShowFormat } from '../../../../lib/dateFormatter'
import PdfViewModal from '../../../../components/Modals/PdfViewModal'

const Page2 = ({ data }: { data: BackgroundCheckProp }) => {

  if (data.status === 'Pending') return <Pending />
  if (data.status === 'Processing') return <Process />

  const [pdfViewModal, setPdfViewModal] = useState(false);


  return (
    <View className='flex-1 px-4 py-4'>
      <Typography class='font-PoppinsMedium'>OIG Background Check</Typography>
      <Typography class='mt-2 text-primaryRed'>Note : <Typography class='text-black'> To initiate your background check, it is imperative that you thoroughly complete all sections within the Profile section. Your cooperation in providing comprehensive information is essential for the efficient processing of the background check.</Typography></Typography>

      <View className='h-40 w-full bg-secondaryBlue rounded-xl relative mt-10'>
        <View className='px-3 mt-4' style={{ gap: 20 }}>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Status :</Typography>
            <Typography class='text-white'>{data.status}</Typography>
          </View>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Date of Verification :</Typography>
            <Typography class='text-white'>{dateShowFormat(data.verificationDate)}</Typography>
          </View>
          <View className='flex-row' style={{ gap: 10 }}>
            <Typography class='text-white'>Document :</Typography>
            <Pressable onPress={() => { setPdfViewModal(true) }}>
              <Typography class='text-white'>Download</Typography>
            </Pressable>
          </View>
        </View>
      </View>
      {data.certificate && <PdfViewModal
        modalVisible={pdfViewModal}
        handleModalVisible={() => { setPdfViewModal(false) }}
        pdfObject={data.certificate}
      />}
    </View>
  )
}

export default Page2
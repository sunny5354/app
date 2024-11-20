import { Image, View } from 'react-native'
import React, { Dispatch, SetStateAction} from 'react'


import { UploadedDataProps } from '../../types/types'

const ImageViewCard = ({ name,_id,url, setUploadedDoc }: { name: string,_id:string,url:string, setUploadedDoc: Dispatch<SetStateAction<UploadedDataProps | null>> }) => {


  return (
    <View className='flex-1 justify-center items-center py-2 px-2 border-border border border-dashed rounded-xl' style={{ gap: 20 }}>
      <View className="justify-center items-center pt-1">
        {url && <Image
          source={{ uri: url }}
          style={{ width: 300, height: 200 }}
          alt="pdf"
        />}
        {/* <Typography variant="xsm" class="text-center mt-3 mx-4">{name}</Typography> */}
      </View>
    </View>
  )
}

export default ImageViewCard
import { View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import Typography from '../../../components/Typography/Typography'
import { cn } from '../../../lib/cn'

type InfoCardProps = {
  img: ImageSourcePropType,
  title: string,
  value?: number,
  bg?:string,
} & React.ComponentProps<typeof View>;



const InfoCard = ({ img, title, value,bg }: InfoCardProps) => {
  return (
    <View className={cn('flex-1 flex-row justify-center items-center bg-primaryBgGreen p-3 rounded-lg',bg)} style={{ gap: 5 }}>
      <Image
        source={img}
        alt='iconss'
        height={20}
        width={20}
        className='w-12 h-16'
        resizeMode='contain'
      />
      <View className='flex-1'>
        <Typography class='text-2xl font-PoppinsSemiBold'>{value}</Typography>
        <Typography class='text-[10px]'>{title}</Typography>
      </View>
    </View>
  )
}

export default InfoCard
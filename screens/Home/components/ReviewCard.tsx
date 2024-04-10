import { Image, View } from 'react-native'
import React from 'react'
import { cn } from '../../../lib/cn'
import Typography from '../../../components/Typography/Typography'
import { ReviewDataProps } from '../../../types/types'
import { dateShowFormat } from '../../../lib/dateFormatter'
import star from "../../../assets/icons/Star.png"
import emptyStar from "../../../assets/icons/emptyStar.png"

const ReviewCard = ({ review }: { review: ReviewDataProps }) => {
  
  return (
    <View className={cn('flex-1 justify-center bg-slate-200 p-3 rounded-lg')} style={{ gap: 10 }}>
      <View className='flex-row items-center' style={{ gap: 20 }}>
        <Image
          source={{ uri: review.avatar.url }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View className='flex-1'>
          <View className='flex-row items-center'>
            {
              [1, 2, 3, 4, 5].map((_: number, i: number) => (
                <Image
                  key={i}
                  source={i < Math.floor(review.rating) ? star : emptyStar}
                  alt='Check Or Warning'
                  style={{ width: 20, height: 20, marginRight: 1 }}
                />
              ))
            }
          </View>
          <Typography class='text-primaryGreen flex-1 font-PoppinsSemiBold leading-6' variant='sm' >{review.name}</Typography>
          <Typography variant='xsm' >{dateShowFormat(review.date)}</Typography>
        </View>
      </View>

      <Typography variant='sm' class='flex-1 text-justify'>{review.message}</Typography>
    </View>
  )
}

export default ReviewCard
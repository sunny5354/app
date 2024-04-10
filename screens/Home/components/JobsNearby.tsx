import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'



import homeDoc from "../../../assets/Home/homeDoc.png";
import bgDoc from "../../../assets/Home/bgDoc.png";
import Typography from '../../../components/Typography/Typography';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types/navigation';
import { cn } from '../../../lib/cn';


const JobsNearby = ({ text }: { text: string }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const width = useWindowDimensions().width;
  return (
    <View className='bg-[#00D9A3] h-48 rounded-lg overflow-hidden justify-between items-center px-5 flex-row'>
      <View className='w-7/12 z-20' style={{ gap: 15 }}>
        <Typography variant='xl' class='text-white'>{text} Job Available Nearby</Typography>
        <View className='h-12 z-20'>
          <Button
            onPress={() => {
              navigation.navigate("Jobs")
              // console.log("cli")
            }}
            my={0}
            className='bg-[#009973] w-8/12 px-0'
          >
            Explore
          </Button>
        </View>
      </View>
      {/* <View> */}
      <Image
        className={cn('absolute h-48 -left-8 z-10',
        width < 370 && "-left-16",
        (width < 400 && width > 370 ) && "-left-10"
        )}
        source={homeDoc}
        alt='homeDoc'
        resizeMode='contain'
      />
      <Image
        className={cn('absolute h-48 -left-8',
        width < 370 && "-left-14",
        (width < 400 && width > 370 ) && "-left-10"
        )}
        source={bgDoc}
        alt='bgDoc'
        resizeMode='contain'
      />
      {/* </View> */}
    </View>
  )
}

export default JobsNearby
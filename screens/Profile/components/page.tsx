import { View } from 'react-native'
import React from 'react'
import ProfilePageCard from '../../../components/Cards/ProfilePageCard'
import { ProfilePageData } from '../../../data/data'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../../../types/navigation'


type PageProps = {
  id: number,
  title: string,
  complete: boolean,
  to: string
}

const Page = ({ pageData }: { pageData: PageProps[] }) => {
  // console.log(pageData[10]);
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View className='bg-white flex-1 rounded-t-3xl'>
      {
        pageData.map((v, i) => (
          <ProfilePageCard key={v.id} complete={v.complete} title={v.title} onPress={() => { navigation.navigate(`${v.to}`) }} />
        ))
      }
    </View>
  )
}

export default Page
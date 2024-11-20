import { View, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'


import { ScreenNavigationProp } from '../../types/navigation'
import Page from './components/page'
import ProfileCard from './components/ProfileCard'
import colors from '../../config/colors'
import StatusCard from './components/StatusCard'
import { LinearGradient } from 'expo-linear-gradient';
import { getProfile } from '../../http/user'
import Loading from '../Loading'
import { useIsFocused } from '@react-navigation/native'

const Profile = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const isFocues = useIsFocused();
  const [ProfilePageData, setProfilePageData] = useState([
    { id: 1, title: 'Account Information', complete: true, to: "Account" },
    { id: 2, title: "Personal Information", complete: true, to: "Personal" },
    { id: 3, title: "Educational Attainment", complete: false, to: "Education" },
    { id: 4, title: "Credentials/Licensing", complete: false, to: "Credential" },
    { id: 5, title: "Competency/Skillset ", complete: false, to: "SkillSet" },
    // { id: 6, title: "Work Information", complete: false, to: "WorkExperience" },
    { id: 7, title: "Job Preference", complete: false, to: "WorkPrefrence" },
  //  { id: 8, title: "Payment Account", complete: false, to: "Payment" },
    // { id: 9, title: "Licenses", complete: false, to: "License" },
   // { id: 10, title: "Covid-19 Screening", complete: false, to: "Covid" },
  //  { id: 11, title: "Tax Document", complete: false, to: "Tax" },
    { id: 12, title: "Background Check", complete: false, to: "BackgroundCheck" }
  ])

  const [profile, setProfile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const fetchProfile = async () => {
    try {
      const result = await getProfile();
      setProfile(result.profile);
      const updatedProfileData = ProfilePageData.map(item => {
        switch (item.title) {
          case "Account Information":
            return { ...item, complete: result.profile.status.account };
          case "Personal Information":
            return { ...item, complete: result.profile.status.personal };
          case "Educational Attainment":
            return { ...item, complete: result.profile.status.education };
          case "Credentials/Licensing":
            return { ...item, complete: result.profile.status.certification };
          case "Competency/Skillset ":
            return { ...item, complete: result.profile.status.skill };
          case "Work Information":
            return { ...item, complete: result.profile.status.experience };
          case "Job Preference":
            return { ...item, complete: result.profile.status.preference };
          case "Payment Account":
            return { ...item, complete: result.profile.status.payment };
          case "Licenses":
            return { ...item, complete: result.profile.status.license };
          case "Covid-19 Screening":
            return { ...item, complete: result.profile.status.covid };
          case "Tax Document":
            return { ...item, complete: result.profile.status.tax };
          case "Background Check":
            return { ...item, complete: result.profile.status.background };
          default:
            return item;
        }
      });
      setProfilePageData(updatedProfileData);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [refresh, isFocues])
  if (!profile) return <Loading />
  return (
    <>
      <StatusBar
        animated={true}
        barStyle={'default'}
        backgroundColor={colors.primaryGreen}
      />
      <View className='flex-1'>
        <ProfileCard setRefresh={setRefresh} profile={profile} />
        <StatusCard profile={profile} />
        <LinearGradient
          colors={['#067D68e3', '#4AC7AB']}
          start={{ x: -0.15, y: 0.8 }}
          className='flex-1'
        >
          <ScrollView className='flex-[1.1] w-full bg-white rounded-t-3xl'>
            {profile && <Page pageData={ProfilePageData} />}
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  )
}

export default Profile
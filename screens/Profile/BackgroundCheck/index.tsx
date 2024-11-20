import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';


import Page2 from './components/Page2';
import Page1 from './components/Page1';
import Typography from '../../../components/Typography/Typography';
import { cn } from '../../../lib/cn';
import BottomButton from '../../../components/BottomButton';
import { getBackgroundCheckInfo, startBackgroundCheck } from '../../../http/profile/background';
import { errorToast, successToast } from '../../../lib/toast';
import { BackgroundCheckProp } from '../../../types/profile';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types/navigation';
import { getStatus } from '../../../http/home';

const BackgroundCheck = () => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const [normalBackgroundCheck, setNormalBackgroundCheck] = useState<BackgroundCheckProp | null>(null);
  const [OIGBackgroundCheck, setOIGBackgroundCheck] = useState<BackgroundCheckProp | null>(null);

  const fetchBackgroundDetails = async () => {
    try {
      const res = await getBackgroundCheckInfo();
      // console.log(res.backgroundCheck);
      setNormalBackgroundCheck(res.backgroundCheck.Normal);
      setOIGBackgroundCheck(res.backgroundCheck.OIG);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const handleStart = async () => {
    try {
      const res = await startBackgroundCheck();
      successToast("Status Updates Successfully")
      fetchBackgroundDetails();
    } catch (error: any) {
      console.log(error.response.data.message);
      errorToast(error.response.data.message);
    }
  }

  const isFocused = useIsFocused();
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      console.log(res);
      setUserStatus(res.status);
      setRole(res.role);
      if (res.status === 'Active') {
      }
      else {
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  useEffect(() => {
    fetchBackgroundDetails();
  }, [])

  return (
    <View className='flex-1 relative'>
      <View className='justify-center items-center flex-row' style={{ gap: 5 }}>
        <Pressable onPress={() => {
          pagerRef.current?.setPage(0);
        }} className={cn('flex-1 justify-center items-center py-4 mx-1', page === 0 ? "border-b-2 border-primaryGreen" : "")}>
          <Typography variant='sm' class={cn(page === 0 ? "text-primaryGreen" : "")}>Background Check</Typography>
        </Pressable>
        <Pressable onPress={() => {
          pagerRef.current?.setPage(1);
        }} className={cn('flex-1 justify-center items-center py-4 mx-1 mr-3', page === 1 ? "border-b-2 border-primaryGreen" : "")}>
          <Typography variant='sm' class={cn(page === 1 ? "text-primaryGreen" : "")}>OIG Background Check</Typography>
        </Pressable>
      </View>

      <PagerView ref={pagerRef} style={styles.viewPager} initialPage={0}
        onPageSelected={(e) => {
          setPage(e.nativeEvent.position);
        }}
      >
        <View style={styles.page} key="1">
          {normalBackgroundCheck && <Page1 data={normalBackgroundCheck} />}
        </View>
        <View style={styles.page} key="2">
          {OIGBackgroundCheck && <Page2 data={OIGBackgroundCheck} />}
        </View>
      </PagerView>
      <BottomButton
        text={(normalBackgroundCheck && normalBackgroundCheck.status === 'Pending') ? "Submit Profile" : "Back"}
        onPress={() => {
          normalBackgroundCheck?.status === "Pending" ? handleStart() : navigation.goBack();
        }}
        disabled={role === "agency-clinician" && userStatus !== "Active"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    height: '100%',
    width: "100%",
    backgroundColor: 'white'
  },
});

export default BackgroundCheck;

import { Image, Platform, Pressable, ScrollView, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


import HomeHeader from './components/HomeHeader';
import Typography from '../../components/Typography/Typography';
import InfoCard from './components/InfoCard';
import appliedJob from "../../assets/Home/appliedJob.png"
import assignedJob from "../../assets/Home/assignedJob.png"
import qa from "../../assets/Home/qa.png"
import task from "../../assets/Home/task.png"
import ReviewCard from './components/ReviewCard';
import { useEffect, useState } from 'react';
import { errorToast } from '../../lib/toast';
import { fetchHomeServices, getStatus } from '../../http/home';
import Loading from '../Loading';
import { HomeDataProps } from '../../types/types';
import { ScreenNavigationProp } from '../../types/navigation';
import messageImg from "../../assets/Home/messageHome.png"
import LockPopup from '../../components/LockPopup';
import JobsNearby from './components/JobsNearby';
import { updatePushToken } from '../../http/user';


export default function App() {

  const isFocused = useIsFocused();
  const [homeData, setHomeData] = useState<HomeDataProps | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<ScreenNavigationProp>();


  const getHomeServices = async () => {
    setLoading(true);
    try {
      const res = await fetchHomeServices();
      // console.log("here",res);
      setHomeData(res.home);
    } catch (error: any) {
      errorToast(error.response.data.message ?? "Something went wrong");
    }
    setLoading(false);
  }

  const [statusVisible, setStatusVisible] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      // console.log(res);
      setUserStatus(res.status);
      getHomeServices();
      if (res.status === 'Active') {
        setStatusVisible(false);
      }
      else {
        setStatusVisible(true);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getUserStatus();
  }, [isFocused])

  useEffect(() => {
  }, [isFocused])


  // =========== Expo notifications logic here =======
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      try {
        const result = await updatePushToken(token);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token)
        setExpoPushToken(token);
    }
    );
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        const val = notification.request.content;
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFATION RESPONSE RECEIVED");
        // for navigation
        const dataObj = response.notification.request.content.data;
        // console.log(dataObj);
        if (dataObj.success) {
          // console.log(dataObj);
          navigation.navigate(dataObj.navigateScreen, {
            url: dataObj.url,
            id: dataObj.id,
          });
        }
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
  // ========================= to send Notifications =========================
  // async function scheduleNotificationHandler() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Welcome to ACTA",
  //       body: "Get all the latest updates about jobs",
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // }
  // useEffect(() => {
  //   scheduleNotificationHandler();
  //   async function sendPushNotification(expoPushToken: string) {
  //     const message = {
  //       to: expoPushToken,
  //       sound: "default",
  //       title: "Server Push",
  //       body: "Test notification by push by the server",
  //       data: { testData: "test data" },
  //     };

  //     await fetch("https://exp.host/--/api/v2/push/send", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Accept-encoding": "gzip, deflate",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(message),
  //     })
  //     // .then((data) => console.log(data)).catch((err) => console.log(err));
  //   }
  //   if (expoPushToken) {
  //     console.log("here");
  //     sendPushNotification(expoPushToken);
  //   }
  // }, [expoPushToken])

  if (loading) return <Loading />

  return (
    <View className='flex-1 bg-background'>
      {homeData?.avatar && <HomeHeader avatar={homeData?.avatar} />}
      {(userStatus && userStatus === "Active") ? <ScrollView>
        <View className='flex-1 px-2 py-5' style={{ gap: 10 }}>
          {homeData?.update !== 0 && <Pressable onPress={() => {
            navigation.navigate("AssignedJobs")
          }} className='bg-primaryPurple py-4 justify-center -mt-2 items-center rounded-lg'>
            <View className='justify-center items-center' style={{ gap: 2 }}>
              <Typography class='text-white' variant='xl'> You Have {homeData?.update} Jobs Assigned!</Typography>
              <Typography class='text-white' variant='xsm'>{homeData?.expireIn}</Typography>
            </View>
          </Pressable>}
          <View style={{ gap: 10 }}>
            <View className='flex-row justify-between' style={{ gap: 10 }}>
              <InfoCard
                img={assignedJob}
                title='Jobs Assigned'
                bg='bg-primaryLightBlue'
                value={homeData?.assignedJobs}
              />
              <InfoCard
                img={appliedJob}
                title='Jobs Applied'
                bg='bg-primaryLightPurple'
                value={homeData?.appliedJobs}
              />
            </View>
            <View className='flex-row justify-between' style={{ gap: 10 }}>
              <InfoCard
                img={qa}
                title='Pending QA'
                value={homeData?.pendingQA}
              />
              <InfoCard
                img={task}
                title='Jobs Scheduled'
                bg='bg-primarLightOrange'
                value={homeData?.scheduledJobs}
              />
            </View>
          </View>
          {homeData?.nearByJobs && <View className='relative'>
            <JobsNearby text={homeData?.nearByJobs} />
          </View>}
          <View className='flex-row justify-between' style={{ gap: 10 }}>
            <View className={'flex-1 justify-between bg-[#c2f4f4] px-3 py-4 rounded-lg'} style={{ gap: 10 }}>
              <Typography class='text-[#1CB6B6]' variant='xsm' >Earning this Month</Typography>
              <View>
                <Typography variant='xxl'>${homeData?.earning}</Typography>
                <Typography variant='xsm'>{homeData?.paidJobs}</Typography>
              </View>
            </View>
            <View className={'flex-1 justify-center items-center bg-[#F8274F] p-3 rounded-lg relative overflow-hidden'} style={{ gap: 1 }}>
              <Image
                source={messageImg}
                alt='messageIcon'
                style={{ width: 75, height: 75 }}
                className='absolute -right-2 -top-4'
              />
              <Typography variant='xxl' class='text-white text-3xl'>{homeData?.unread}</Typography>
              <Typography variant='xsm' class='text-white'>Unread Messages</Typography>
            </View>
          </View>
          <View style={{ gap: 20 }}>
            <Typography variant='xl'>Your Latest Review</Typography>
            {
              homeData?.reviews && homeData?.reviews.length > 0 ? (homeData?.reviews.map((review, index) => {
                return (
                  <ReviewCard key={index} review={review} />
                )
              }
              ))
                : (
                  <View>
                    <Typography>No Reviews </Typography>
                  </View>
                )
            }
          </View>
        </View>
      </ScrollView>
        : (
          <LockPopup />
        )
      }
    </View>
  );
}


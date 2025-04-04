import { View, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenNavigationProp } from '../../types/navigation'
import { notificationProp } from '../../types/types'
import { errorToast } from '../../lib/toast'
import { useIsFocused } from '@react-navigation/native'

import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Headers'
import { fetchNotificationlist, readNotification } from '../../http/notifications'
import { dateShowFormat } from '../../lib/dateFormatter'
import Typography from '../../components/Typography/Typography'

const Notification = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const isFocused = useIsFocused();
  const [listnoti,setListNoti] = useState([]);

  const getAllNotificationList = async () => {
    try {
      const res = await fetchNotificationlist();
      console.log("Notification List",res);
      setListNoti(res.notifications);
    } catch (error: any) {
      errorToast(error.response.data.message ?? "Something went wrong");
    }
  }

  const Handlereadmsg = async (id:string) => {
    try {
      const res = await readNotification(id);
      console.log("Message Read List",res);

    } catch (error: any) {
      errorToast(error.response.data.message ?? "Something went wrong");
    }
  }

  useEffect(() => {
    getAllNotificationList();
  }, [isFocused])

const NotificationItem = ({ id,title, activeStatus, description, time }:notificationProp) => (
  <TouchableOpacity className="bg-white" style={styles.notificationCard} onPress={() => Handlereadmsg(id)}>
    <MaterialIcons name={`${activeStatus == "1" ? "markunread" : "mark-email-read"}`} size={24} color="#4CAF50" style={styles.icon} />
    <View style={styles.notificationText}>
      <Text style={styles.notificationTitle}>
        <Typography>{title}</Typography>
      </Text>
      <Text style={styles.notificationDescription}>{description}</Text>
      <Text style={styles.notificationTime}>{dateShowFormat(time)}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View className='flex-1 bg-white'>
      <Header
        title='Notification'
      />
     <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      {
      listnoti?.length > 0 ?
      <FlatList
        data={listnoti} // @ts-ignore
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => ( // @ts-ignore
          <NotificationItem // @ts-ignore
            id={item?._id} // @ts-ignore
            title={item.title} // @ts-ignore
            activeStatus={item.activeStatus} // @ts-ignore
            description={item.description} // @ts-ignore
            time={item.time}
          />
        )}
        contentContainerStyle={styles.list}
      />
      :
        <View>
          <Typography>No notification has been found</Typography>
        </View>
      }  
      
    </View>
      </SafeAreaView>
    </View>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  notificationMsg: {
    fontSize: 12,
    color: 'silver'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
});
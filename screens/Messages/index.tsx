import { View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers'
import { ScreenProps } from '../../types/navigation'
import MessageCard from './components/MessageCard'
import Input from '../../components/Input'
import { data } from '../../data/data'
import { getStatus } from '../../http/home'
import { useIsFocused } from '@react-navigation/native'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button'
import LockPopup from '../../components/LockPopup'
import img from '../../assets/Profile/Profile.png'

import {
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const messages = [
  {
    id: '1',
    name: 'Ganesh Negi',
    message: 'Hello there!',
    time: '10:22 am',
    avatar: 'https://placekitten.com/200/200', // Replace with actual image URLs
    unread: 5,
  },
  {
    id: '2',
    name: 'Sunny Kumar',
    message: 'If you don’t mind, we can be...',
    time: '10:00 am',
    avatar: 'https://placekitten.com/201/201',
    unread: 2,
  },
  {
    id: '3',
    name: 'Tianna Mooren',
    message: 'Hey, John!!',
    time: '20 June',
    avatar: 'https://placekitten.com/202/202',
    unread: 0,
  },
  {
    id: '4',
    name: 'Kimberly Jones',
    message: 'At least we go with this one.',
    time: '19 June',
    avatar: 'https://placekitten.com/203/203',
    unread: 0,
  },
  {
    id: '5',
    name: 'Aisha Smith',
    message: 'See you tomorrow',
    time: '15 June',
    avatar: 'https://placekitten.com/204/204',
    unread: 0,
  },
  {
    id: '6',
    name: 'Hoshiyo Fukuzawa',
    message: 'Sure...',
    time: '9 June',
    avatar: 'https://placekitten.com/205/205',
    unread: 0,
  },
  {
    id: '7',
    name: 'Aaliyah Williams',
    message: 'Hi there, How are you?',
    time: '9 June',
    avatar: 'https://placekitten.com/206/206',
    unread: 3,
  },
  {
    id: '8',
    name: 'Aaliyah Williams',
    message: 'Hi there, How are you?',
    time: '9 June',
    avatar: 'https://placekitten.com/206/206',
    unread: 3,
  },
  {
    id: '9',
    name: 'Aaliyah Williams',
    message: 'Hi there, How are you?',
    time: '9 June',
    avatar: 'https://placekitten.com/206/206',
    unread: 3,
  },
];

const Messages = ({ navigation }: ScreenProps) => {

  const renderItem = ({ item }:any) => ( 
    <TouchableOpacity style={styles.messageItem} onPress={() => {
      navigation.navigate("MessageScreen");
    }}>
      <Image
        source={img}
        alt='user img'
        style={styles.avatar} 
        className='rounded-full'
      />
      <View style={styles.messageContent}>
        <Typography variant='ssxl'><Text style={styles.name}>{item.name}</Text></Typography>
        <Typography variant='sm'><Text style={styles.messageText}>{item.message}</Text></Typography>
      </View>
      <View style={styles.messageMeta}>
      <Typography variant='sm'><Text style={styles.time}>{item.time}</Text></Typography>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Typography variant='sm'><Text style={styles.unreadText}>{item.unread}</Text></Typography>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const isFocused = useIsFocused();
  const [statusVisible, setStatusVisible] = useState(false);
  const [userStatus, setUserStatus] = useState("Active");
  const getUserStatus = async () => {
    try {
      const res = await getStatus();
      setUserStatus(res.status);
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


  return (
    
    <View className='flex-1 bg-background'>
      <Header
        title='Message'
      />
      {(userStatus && userStatus === "Active") ?  <ScrollView horizontal={false} style={{flex: 1}}>
      <ScrollView
      horizontal={true}
      contentContainerStyle={{width: '100%', height: '100%'}}>
        <View style={styles.container} className='p-2'>
          <View style={styles.header}>
            <Ionicons name="search-outline" size={20} color="black" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search User..."
              placeholderTextColor="#ddd"
            />
          </View>
              
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messageList}
            nestedScrollEnabled={true}
          />
        </View>
        </ScrollView>
      </ScrollView>
        :
        <LockPopup />
      }
    </View>
  )
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'font-PoppinsSemiBold'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'font-PoppinsSemiBold',
    padding: 5,
    borderWidth: 1, borderColor: 'silver', borderRadius: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#fff',
    fontFamily:'font-PoppinsSemiBold',
    borderRadius: 10,
    padding: 8,
    color: '#000',
  },
  newMessages: {
    padding: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: 'font-PoppinsSemiBold'
  },
  messageList: {
    paddingHorizontal: 10,
    fontFamily: 'font-PoppinsSemiBold'
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    fontFamily: 'font-PoppinsSemiBold',
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'font-PoppinsSemiBold'
  },
  name: {
    fontSize: 16
  },
  messageText: {
    color: '#666',
    marginTop: 5
  },
  messageMeta: {
    alignItems: 'flex-end',
    fontFamily: 'font-PoppinsSemiBold'
  },
  time: {
    fontSize: 12,
    color: '#aaa'
  },
  unreadBadge: {
    marginTop: 5,
    backgroundColor: 'green',
    borderRadius: '50%',
    paddingHorizontal: 9,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'font-PoppinsSemiBold'
  },
  newMessageButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fa5757',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
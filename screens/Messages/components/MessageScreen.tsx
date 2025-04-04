import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native'
import React from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Img from '../../../assets/Profile/Profile.png'

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MessageScreenHeader from './MessageScreenHeader'
import { ScreenProps } from '../../../types/navigation'
import Input from '../../../components/Input'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import colors from '../../../config/colors'
import { cn } from '../../../lib/cn'
import Typography from '../../../components/Typography/Typography';

const messages = [
  {
    id: '1',
    type: 'received',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing?',
    time: '10:22 am',
  },
  {
    id: '2',
    type: 'sent',
    text: 'Eaque ipsa quae ab illo inventore consectetur adipisci.',
    time: '10:22 am',
  },
  {
    id: '3',
    type: 'sent',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit.',
    time: '10:22 am',
  },
];

const MessageScreen = ({ navigation }: ScreenProps) => {

  const renderItem = ({ item }:any) => (
    <View
      style={[
        item.type === 'sent' ? styles.messageBubble : styles.rmessageBubble,
        item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Typography variant='sm'>
        <Text style={[
        item.type === 'sent' ? styles.messageText : styles.rmessageText,
      ]}>{item.text}</Text>
      </Typography>
      <Typography variant='smb'>
        <Text style={[
        item.type === 'sent' ? styles.timeText : styles.rtimeText,
        ]}>{item.time}</Text>
      </Typography>
     
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={Img}
          alt='user img'
          style={styles.avatar} 
          className='rounded-full'
        />
        <View style={styles.headerInfo}>
          <Typography variant='smb'><Text style={styles.contactName}>Annie Robinson</Text></Typography>
          <Typography variant='sm'><Text style={styles.status}>Online</Text></Typography>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.iconButton}>
          <SimpleLineIcons name="paper-clip" size={24} color="#40B1B6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40B1B6',
    padding: 10,
    paddingTop: 20
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerInfo: {
    flex: 1
  },
  contactName: {
    color: '#fff',
    fontSize: 16
  },
  status: {
    color: '#fff',
    fontSize: 12,
  },
  chatContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginVertical: 5,
    padding: 10,
  },
  rmessageBubble: {
    maxWidth: '70%',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginVertical: 5,
    padding: 10,
  },
  receivedMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#02123C',
    alignSelf: 'flex-end',
    color: 'white'
  },
  messageText: {
    color: 'white',
  },
  rmessageText: {
    color: 'black',
  },
  timeText: {
    fontSize: 10,
    color: 'white',
    marginTop: 5,
    textAlign: 'right',
  },
  rtimeText: {
    fontSize: 10,
    color: 'black',
    marginTop: 5,
    textAlign: 'right',
  },
  statusIcon: {
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  iconButton: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#40B1B6',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
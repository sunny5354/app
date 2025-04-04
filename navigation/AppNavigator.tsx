import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Feather,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
// Custom Imports
import { RootStackParamList } from "../types/navigation";
import colors from "../config/colors";
import Home from "../screens/Home";
import Jobs from "../screens/Jobs";
import Schedule from "../screens/Schedule";
import Messages from "../screens/Messages";
import Menu from "../screens/Menu";
import Notification from "../screens/Notification";
import { View, Text, StyleSheet } from 'react-native';
import { fetchNotificationlist } from "../http/notifications";

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {

    const [notificationCount, setNotificationCount] = useState(0);

    const getAllNotificationList = async () => {
      try {
        const res = await fetchNotificationlist();
        console.log("Notification List",res);
        if(res.notifications) {
            var count = 0; // @ts-ignore
            res.notifications?.map((item:any) => {
              item.activeStatus == 1 ? count++ : count
            });
            console.log("count", count);
            setNotificationCount(count); 
        }
      } catch (error: any) {
        console.log(error.response.data.message ?? "Something went wrong");
      }
    }

    useEffect(() => {
      getAllNotificationList();
    }, [])
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primaryGreen,

                tabBarStyle: {
                    height: 70,
                    padding: 15,
                    paddingHorizontal: 10,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingBottom: 10,
                    // backgroundColor:'transparent'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="home" size={size} color={color} />
                    ),
                })}
            />
            <Tab.Screen
                name="Jobs"
                component={Jobs}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="location-pin" size={size} color={color} />
                    ),
                })}
            />
            <Tab.Screen
                name="Schedule"
                component={Schedule}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calendar-plus-o" size={size} color={color} />
                    ),
                })}
            />
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="message1" size={size} color={color} />
                    ),
                })}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        
                        <View style={{ position: 'relative' }}>
                        <AntDesign name="notification" size={size} color={color} />
                        {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{notificationCount}</Text>
                        </View>
                        )}
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                       
                        <MaterialIcons
                            name="menu"
                            color={color}
                            size={size}
                        />
                                                
                    ),
                })}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    badge: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: '#FF5722',
      borderRadius: 10,
      minWidth: 20,
      paddingHorizontal: 5,
      paddingVertical: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
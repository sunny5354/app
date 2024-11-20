import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Feather,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Custom Imports
import { RootStackParamList } from "../types/navigation";
import colors from "../config/colors";
import Home from "../screens/Home";
import Jobs from "../screens/Jobs";
import Schedule from "../screens/Schedule";
import Messages from "../screens/Messages";
import Menu from "../screens/Menu";

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
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

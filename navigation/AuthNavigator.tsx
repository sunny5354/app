import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom Imports
import { RootStackParamList } from "../types/navigation";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import Reset from "../screens/Reset";
import Forgot from "../screens/Forgot";
import Register from "../screens/Register";
import RegisterProfile from "../screens/Register/RegisterProfile";
import { Button, Text } from "react-native";
import OTP from "../screens/OTP";
const Stack = createNativeStackNavigator<RootStackParamList>();


const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                animation: "slide_from_right",
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen options={{
                headerShown: true,
                headerBackVisible: false,
            }} name="RegisterProfile" component={RegisterProfile} />
            <Stack.Screen name="Reset" component={Reset} />
            <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;

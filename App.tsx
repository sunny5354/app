import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

// custom imports
import Offline from "./screens/Offline";
import "./translation/i18n"; // Import and initialize i18n
import AuthNavigator from "./navigation/AuthNavigator";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import LocationContextProvider from "./store/LocationContext";
import AllNavigator from "./navigation/AllNavigator";
import colors from "./config/colors";
import Toast from "react-native-toast-message";
import LockContextProvider, { LockContext } from "./store/LockContext";
import Lock from "./screens/Lock";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true
        };
    },
});

SplashScreen.preventAutoHideAsync();

function Navigation() {
    const { token, logout } = useContext(AuthContext);
    const { loggedIn } = useContext(LockContext);
    // console.log("token", token);
    useEffect(() => {
        const validateToken = async () => {

        };
        validateToken();
    }, []);

    // if (!loggedIn) return <Lock />

    return (
        <NavigationContainer>
            <View className="z-40">
                <Toast />
            </View>
            {!token ? <AuthNavigator /> : <AllNavigator />}
        </NavigationContainer>
    );
}

const Root = () => {
    const authCtx = useContext(AuthContext);
    const [appReady, setAppReady] = useState(false);
    const [fontsLoaded] = useFonts({
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    });
    useEffect(() => {
        async function fetchToken() {
            if (authCtx.token) {
                // console.log("yha bhi check hua",authCtx.token);
            }
            setAppReady(true);
            await SplashScreen.hideAsync();
        }
        fetchToken();
    }, [fontsLoaded, authCtx.token]);

    if (!fontsLoaded) return null;
    if (!appReady) return null;
    return <Navigation />;
};

export default function App() {
    const netinfo = useNetInfo();

    return (
        <LockContextProvider>
            <AuthContextProvider>
                <LocationContextProvider>
                    <SafeAreaView style={{ paddingBottom: Platform.OS === 'ios' ? 12 : 0, paddingTop: Platform.OS === 'ios' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
                        <StatusBar
                            animated={true}
                            barStyle={'dark-content'}
                            backgroundColor={"white"}
                        />
                        {netinfo.isInternetReachable ? <Root /> : <Offline />}
                    </SafeAreaView>
                </LocationContextProvider>
            </AuthContextProvider>
        </LockContextProvider>
    );
}

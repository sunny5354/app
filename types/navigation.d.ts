import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DownloadWeb from "../components/WebView/DownloadWeb";


export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Welcome: undefined;
    Main: undefined;
    Reset: undefined;
    Forgot: undefined;
    Register: undefined;
    RegisterProfile: undefined;
    Menu: undefined,
    Profile: undefined,
    Personal: undefined,
    Account: undefined,
    Education: undefined,
    ChangePassword: undefined,
    WorkPrefrence: undefined,
    Credential: undefined,
    SkillSet: undefined,
    WorkExperience: undefined,
    OTP: undefined,
    Visits: undefined,
    Jobs: undefined,
    Schedule: undefined,
    Messages: undefined,
    Payment: undefined,
    License: undefined,
    Covid: undefined,
    BackgroundCheck: undefined,
    DownloadWeb: undefined,
    Tax: undefined,
    JobInfoScreen: undefined,
    AppliedJobs: undefined,
    AssignedJobs: undefined,
    PointOfCare: undefined,
    AppliedJobInfoScreen:undefined,
    AssignedJobInfoScreen:undefined,
    PointOfCareInfoScreen:undefined,
    MessageScreen:undefined,
    JobTypeInfoScreen:undefined,
    PastJobs:undefined,
    PastJobInfoScreen:undefined
};

export type ScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    Main,
    Home,
    Login,
    Welcome,
    Reset,
    Forgot,
    Register,
    RegisterProfile,
    Menu,
    Profile,
    Personal,
    Account,
    Education,
    ChangePassword,
    DownloadWeb
>;

export type ScreenRouteProp = NativeStackScreenProps<
    RootStackParamList,
    Main,
    Home,
    Login,
    Welcome,
    Reset,
    Forgot,
    Register,
    RegisterProfile,
    Menu,
    Profile,
    Personal,
    Account,
    Education,
    ChangePassword,
    DownloadWeb
>;

export type ScreenProps = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};


// type HomeScreenNavigationProp = BottomTabNavigationProp<
//     HomeScreenParams,
//     Home
// >;
// type ProfileScreenNavigationProp = BottomTabNavigationProp<
//     ProfileScreenParams,
//     Profile
// >;
// type OrderListScreenNavigationProp = BottomTabNavigationProp<
//     OrderListScreenParams,
//     OrderList
// >;
// type DeliveryScreenNavigationProp = BottomTabNavigationProp<
//     DeliveryScreenParams,
//     Delivery
// >;

// type HomeScreenRouteProp = RouteProp<HomeScreenParams, Home>;
// type ProfileScreenRouteProp = RouteProp<ProfileScreenParams, Profile>;
// type OrderListScreenRouteProp = RouteProp<OrderListScreenParams, OrderList>;
// type DeliveryScreenRouteProp = RouteProp<DeliveryScreenParams, Delivery>;


// export type HomeScreenProps = {
//     navigation:HomeScreenNavigationProp,
//     route:HomeScreenRouteProp
// }
// export type ProfileScreenProps = {
//     navigation:ProfileScreenNavigationProp,
//     route:ProfileScreenRouteProp
// }
// export type OrderListScreenProps = {
//     navigation:OrderListScreenNavigationProp,
//     route:OrderListScreenRouteProp
// }
// export type DeliveryScreenProps = {
//     navigation:DeliveryScreenNavigationProp,
//     route:DeliveryScreenRouteProp
// }

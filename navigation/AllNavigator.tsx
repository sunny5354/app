import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom Imports
import { RootStackParamList } from "../types/navigation";
import Profile from "../screens/Profile";
import PersonalInformation from "../screens/Profile/PersonalInformation";
import AccountInformation from "../screens/Profile/AccountInformation";
import EducationalInformation from "../screens/Profile/EducationalInformation";
import colors from "../config/colors";
import AppNavigator from "./AppNavigator";
import Typography from "../components/Typography/Typography";
import ChangePassword from "../screens/Profile/ChangePassword";
import Reset from "../screens/Reset";
import Forgot from "../screens/Forgot";
import WorkPrefrence from "../screens/Profile/WorkPrefrence";
import Credential from "../screens/Profile/Credential";
import SkillSet from "../screens/Profile/SkillSet";
import WorkExperience from "../screens/Profile/WorkExperience";
import Payment from "../screens/Profile/Payment";
import Licenses from "../screens/Profile/Licenses";
import Covid from "../screens/Profile/Covid";
import BackgroundCheck from "../screens/Profile/BackgroundCheck";
import OTP from "../screens/OTP";
import DownloadWeb from "../components/WebView/DownloadWeb";
import TaxDocs from "../screens/Profile/TaxDocs";
import JobInfoScreen from "../screens/Jobs/InfoScreen";
import AppliedJobs from "../screens/AppliedJobs";
import OnCall from "../screens/OnCall";
import Earnings from "../screens/Earnings";
import HelpSupport from "../screens/HelpSupport";
import AssignedJobs from "../screens/AssignedJobs";
import PointOfCare from "../screens/PointOfCare";
import AppliedJobInfoScreen from "../screens/AppliedJobs/InfoScreen";
import AssignedJobInfoScreen from "../screens/AssignedJobs/InfoScreen";
import PointOfCareInfoScreen from "../screens/PointOfCare/InfoScreen";
import MessageScreen from "../screens/Messages/components/MessageScreen";
import JobTypeInfoScreen from "../screens/Schedule/InfoScreen";
import PastJobs from "../screens/PastJobs";
import PastJobInfoScreen from "../screens/PastJobs/InfoScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const AllNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                animation: "slide_from_right",
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'rgba(255,255,255,.1)'
                }
            }}
        >
            <Stack.Screen name="Main" component={AppNavigator} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Reset" component={Reset} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="DownloadWeb" component={DownloadWeb} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="JobInfoScreen" component={JobInfoScreen} />
            <Stack.Screen name="JobTypeInfoScreen" component={JobTypeInfoScreen} />
            <Stack.Screen name="PointOfCareInfoScreen" component={PointOfCareInfoScreen} />
            <Stack.Screen name="AppliedJobInfoScreen" component={AppliedJobInfoScreen} />
            <Stack.Screen name="AssignedJobInfoScreen" component={AssignedJobInfoScreen} />
            <Stack.Screen name="PastJobInfoScreen" component={PastJobInfoScreen} />
            <Stack.Screen name="OnCall" component={OnCall} />
            <Stack.Screen name="Earnings" component={Earnings} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="AppliedJobs" component={AppliedJobs} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="AssignedJobs" component={AssignedJobs} />
            <Stack.Screen name="PointOfCare" component={PointOfCare} />
            <Stack.Screen name="PastJobs" component={PastJobs} />
            <Stack.Screen name="SkillSet" component={SkillSet} options={{
                headerShown: true,
                headerTitle: "",
                headerBackVisible: false,
                headerLeft: () => {
                    return <Typography class="text-white font-PoppinsSemiBold text-lg">Competency/Skillset</Typography>
                },
                headerStyle: {
                    backgroundColor: colors.primaryGreen
                }
            }}
            />

            <Stack.Screen name="WorkExperience" component={WorkExperience} options={{
                headerShown: true,
                headerTitle: "",
                headerBackVisible: false,
                headerLeft: () => {
                    return <Typography class="text-white font-PoppinsSemiBold text-lg">Work Experience</Typography>
                },
                headerStyle: {
                    backgroundColor: colors.primaryGreen
                }
            }}
            />
            <Stack.Screen name="Personal"
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    headerTitle: 'Personal Information',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff'
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={PersonalInformation} />
            <Stack.Screen name="WorkPrefrence"
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    headerTitle: 'Job Prefrence',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff'
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={WorkPrefrence} />
            <Stack.Screen name="Account"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Account Information</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={AccountInformation} />
            <Stack.Screen name="BackgroundCheck"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Background Check</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={BackgroundCheck} />
            <Stack.Screen name="Payment"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Payment Account</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={Payment} />
            <Stack.Screen name="License"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Licenses</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={Licenses} />
            <Stack.Screen name="Covid"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Covid</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={Covid} />
            <Stack.Screen name="Tax"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Tax Document</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={TaxDocs} />
            <Stack.Screen name="Credential"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <Typography class="text-white font-PoppinsSemiBold text-lg">Credentials/Licensing</Typography>
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={Credential} />
            <Stack.Screen name="Education"
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    headerTitle: 'Educational Attainment',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff'
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryGreen
                    }
                }}
                component={EducationalInformation} />
        </Stack.Navigator>
    );
};

export default AllNavigator;

import * as Location from "expo-location";


export const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        return false;
    }
    return true;
};

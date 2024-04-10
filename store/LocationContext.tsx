import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LocationContextProps {
    latitude: number;
    longitude: number;
    setLocationValue: (latitude:number,longitude:number) => void;
}

export const LocationContext = createContext<LocationContextProps>({latitude:29.5952319,longitude:76.1180773,setLocationValue:()=>{}});

const LocationContextProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [latitude, setLatitude] = useState<number>(29.5952319);
    const [longitude, setLongitude] = useState<number>(76.1180773);

    const setLocationValue = async (latitude:number,longitude:number) => {
        try {
            const jsonValue = JSON.stringify({latitude:latitude,longitude:longitude})
            await AsyncStorage.setItem('@location', jsonValue);
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (e) {
            // saving error
        }
    }

    useEffect(()=>{
        const getLocationValue = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@location');
                if(jsonValue != null){
                    // console.log("location fetched",jsonValue);
                    
                    const value = JSON.parse(jsonValue);
                    // console.log(value.latitude)
                    setLatitude(value.latitude);
                    setLongitude(value.longitude);
                    // console.log("location fetched",value.latitude,value.longitude)
                }
            } catch(e) {
                // error reading valu
            }
        }
        getLocationValue();
    },[])
    
    const value: LocationContextProps = {latitude: latitude,longitude: longitude,setLocationValue:setLocationValue};

    return (
        <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
    );
};

export default LocationContextProvider;

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ss from "../assets/ss.png"
import MapView, {
  PROVIDER_GOOGLE,
  Marker
} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as Location from "expo-location";




const FakeMap = ({ location }: { location: string }) => {
  // return (
  //   <View
  //     className='h-80 w-full rounded-lg overflow-hidden'
  //   >
  //     <Image
  //       source={ss}
  //       alt='Map Image'
  //       className='h-80 w-full'
  //       resizeMode='contain'
  //     />
  //   </View>
  // )
  const mapRef = React.useRef<MapView>(null);

  const [lat, setLat] = useState(37.78825);
  const [long, setLong] = useState(-122.4324);
  const [myLat, setMyLat] = useState(37.788);
  const [myLong, setMyLong] = useState(-122.432);

  const fetchLocation = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBtLciMleXFQeWJ51FkfwPOFa5umnVmny8`;
    const res = await axios.get(url);
    setLat(res.data.results[0].geometry.location.lat); 
    setLong(res.data.results[0].geometry.location.lng);
    mapRef.current?.animateToRegion(
      {
        latitude: res.data.results[0].geometry.location.lat,
        longitude: res.data.results[0].geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };
  const selectCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setMyLat(location.coords.latitude);
    setMyLong(location.coords.longitude);
  };

  useEffect(() => {
    fetchLocation();
    selectCurrentLocation();
  }, [])

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ height: 400 }}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
          title='Patient Location'
        />
        <Marker
          coordinate={{
            latitude: myLat,
            longitude: myLong,
          }}
          title='Patient Location'
        />
        {/* <MapViewDirections
          origin={{ latitude: lat, longitude: long }}
          destination={{ latitude: myLat, longitude: myLong }}
          // apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        /> */}
      </MapView>
    </View>
  )
}

export default FakeMap
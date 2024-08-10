import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import { ScreenProps } from "../../types/navigation";

export default function DownloadWeb({ navigation, route }: ScreenProps) {

    const { url } = route.params;
    const [progress, setProgress] = useState(0);
    const webview = useRef(null);


    useEffect(() => {
        if (progress === 1) {
            navigation.goBack();
           
        }
    }, [progress])

    return (
        <View style={styles.container}>
            <WebView
                ref={webview}
                style={styles.container2}
                source={{ uri: url }}
                javaScriptEnabled={true}
                onLoadProgress={(e) => { console.log(e.nativeEvent.progress * 100); setProgress(e.nativeEvent.progress) }}
                startInLoadingState
                onError={(event) => alert(`Please close and restart the app!`)}
                setSupportMultipleWindows={false}
                onMessage={(e) => {
                    console.log(e);
                }}
                incognito={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "2%",
        flex: 1,
    },
    container2: {
        padding: "10%",
        width: "100%",
        height: "100%",
        flex: 1,
    }
});

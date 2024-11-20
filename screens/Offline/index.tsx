import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

// Custom Imports
import Screen from "../../components/Screen";
import offlineImg from "../../assets/offline/offline.png";

export default function Offline() {
    return (
        <Screen>
            <View style={styles.screen}>
                <View>
                </View>
                <View style={styles.container}>
                    <Text>No Internet Available</Text>
                    <Image
                        style={{ width: 100, height: 100, marginVertical: 50 }}
                        source={offlineImg}
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: "5%",
        flex: 1,
    },
    container: {
        flex: 1,
        padding: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
});

import { Platform, SafeAreaView, StyleSheet,} from 'react-native'
import React from 'react'

type ScreenProps = {
    children:React.ReactNode,
    
}


const Screen:React.FC<ScreenProps> = ({children}) =>{
    return (
        <SafeAreaView className="bg-primaryCream flex-1 p-4">{children}</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:"#fff",
        paddingTop:Platform.OS === 'android' ? 40 :0,
        height:'100%',
    }
})

export default Screen;
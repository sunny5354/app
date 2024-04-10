import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'


//custom imports
import { DropDownProps } from '../../types/types';
import colors from '../../config/colors';

const DropDown:React.FC<DropDownProps> = ({value,setValue,items,label,dropDownDirection,listModeType,style})=> {
    const [open, setOpen] = useState(false);

    const [press,setPress] = useState(false);
    return (
        <View style={[styles.container,press && {elevation:100,zIndex:100}]}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                multiple={false}
                dropDownDirection={dropDownDirection ? "TOP":"BOTTOM"}
                listMode={listModeType ?  'MODAL' : 'SCROLLVIEW'}
                scrollViewProps={{
                    decelerationRate: "fast"
                }}
                mode='SIMPLE'
                modalTitle={label}
                modalAnimationType='slide'
                modalContentContainerStyle={styles.modalContentContainerStyle}
                modalTitleStyle={styles.modalTitleStyle}
                listItemLabelStyle={styles.listItemLabelStyle}
                listItemContainerStyle={styles.listItemContainerStyle}
                selectedItemLabelStyle={styles.selectedItemLabelStyle}
                placeholder={label}
                style={[styles.DROP_DOWN,style]}
                ArrowUpIconComponent={({style}) => <AntDesign name="up" size={20} color={colors.primaryGreen} />}
                ArrowDownIconComponent={({style}) => <AntDesign name="down" size={20} color={colors.primaryGreen} />}
            />                   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        marginVertical:20,
        zIndex:100
    },
    DROP_DOWN: {
        borderWidth:1,
        borderColor:colors.primaryGreen,
        borderRadius:10,
        zIndex:100,
    },
    DROP_DOWN_CONTAINER: {
        backgroundColor:'white',
        borderColor: 'white',
        borderRadius: 10,
        width: '100%',
        borderWidth: 2,
        marginTop:5,
        padding:1,
        zIndex:100,
    },
    listItemContainerStyle:{
        borderBottomWidth:1,
        marginVertical:10,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    listItemLabelStyle:{
        marginHorizontal:5,
        fontFamily:'Poppins',
    },
    modalContentContainerStyle:{
        backgroundColor:'white'
    },
    modalTitleStyle:{
        color:colors.primaryGreen,
        fontFamily:'Poppins'
    },
    selectedItemLabelStyle:{
        color:colors.primaryGreen
    },
    listMessageTextStyle:{
        height: 40
    },

});


export default DropDown;
import { StyleSheet, View } from "react-native";
import React from "react";
import RadioForm from "react-native-simple-radio-button";
import { useTranslation } from "react-i18next";

// Custom Imports
import colors from "../../config/colors";
import Typography from "../Typography/Typography";

type RadioGroupProps = {
    label:string,
    value : number | string,
};

type CompanyRadioGroupProps = {
    title:string;
    radio_props: RadioGroupProps[];
    handleCompanyValue: (value: number | string ) => void;
    companyValue: number | string | boolean;
};

const CompanyRadioGroup:React.FC<CompanyRadioGroupProps> = ({title,radio_props,handleCompanyValue,companyValue}) => {
    const { t } = useTranslation();

    return (
        <View>
            <Typography class="bg-white border font-Poppins text-sm border-primaryDarkGreen rounded-xl w-full justify-center items-center py-3 px-3 ">
                {(title)}
            </Typography>
            <RadioForm
                radio_props={radio_props}
                onPress={(value) => handleCompanyValue(value)}
                initial={0}
                buttonSize={12}
                buttonColor={colors.primaryLightBlack}
                selectedButtonColor={colors.primaryDarkGreen}
                formHorizontal={false}
                animation={false}
                style={styles.compo}
                labelStyle={{fontFamily:"Poppins"}}
            />
        </View>
    );
};

export default CompanyRadioGroup;

const styles = StyleSheet.create({
    compo:{
        marginHorizontal:5,
        padding:5,
        gap:5,
        backgroundColor:"#fff",
        fontFamily:'Poppins',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }
});

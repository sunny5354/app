import { View } from "react-native";
import React from "react";
import Typography from "../Typography/Typography";
import ProductCard from "../Cards/ProductCard";


type FeaturedProductSectionProps = {
    title: string;
    sunCarbon?: boolean;
};



const FeaturedProductSection:React.FC<FeaturedProductSectionProps> = ({title,sunCarbon}) => {
    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center ">
                <Typography variant="xl">{title}</Typography>
                <Typography variant="sm">See All</Typography>
            </View>
            <View className="flex-row justify-between" style={{gap:5}}>
                <ProductCard sunCarbon={sunCarbon} title="1" />
                <ProductCard sunCarbon={sunCarbon} title="1" />
            </View>
            <View className="flex-row justify-between" style={{gap:5}}>
                <ProductCard sunCarbon={sunCarbon} title="1" />
                <ProductCard sunCarbon={sunCarbon} title="1" />
            </View>
        </View>
    );
};

export default FeaturedProductSection;

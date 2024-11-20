import { TextInput, View,Platform } from 'react-native'
import React from 'react'

// Custom Imports
import colors from '../../config/colors'
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';

type TextArea = {
    className?: string;
    width?: string;
    isError?: boolean;
    error?: string;
    numberOfLines?: number;
} & React.ComponentProps<typeof TextInput>;


const TextArea:React.FC<TextArea> = ({className,width,isError,numberOfLines,error,...otherProps})=> {
    return (
        <View className={cn('my-2 w-full rounded-md',width)}>
            <TextInput
                selectionColor={colors.primaryGreen}
                className={cn(`bg-primaryCreamLight placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm  rounded-xl w-full items-start py-2 px-3 border border-border placeholder:text-black justify-start ${Platform.OS === 'ios' && 'min-h-[300px]'}`,
                className,
                isError && "border border-red-500"
                )}
                multiline={true}
                textAlignVertical='top'
                placeholderTextColor={"#000"}
                numberOfLines={numberOfLines ? numberOfLines : 10}
                {...otherProps}
                />
                {isError && <Typography variant='xsm' class='text-red-500 ml-2' >{error}</Typography>}
        </View>
    )
}

export default TextArea;
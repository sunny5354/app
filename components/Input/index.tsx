import { TextInput, View } from 'react-native'
import React, { useState } from 'react'

// Custom Imports
import colors from '../../config/colors'
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';

type InputProps = {
    label?:string;
    classView?:string;
    className?: string;
    width?: string;
    isError?: boolean;
    error?: string;
} & React.ComponentProps<typeof TextInput>;


const Input:React.FC<InputProps> = ({classView,label,className,width,isError,error,onBlur,...otherProps})=> {

    const [isFocus,setIsFocus] = useState(false);

    return (
        <View className={cn('my-2 w-full relative',width,classView)}>
            {label && <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white pl-1 pr-3'>{label}</Typography>}
            <TextInput
                selectionColor={colors.primaryGreen}
                className={cn(`bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-center items-center py-3 px-3`,
                className,
                isError && "border-red-500",
                isFocus ? 'border-primaryGreen border-2' : "border-[1px] border-black"
                )}
                placeholderTextColor={colors.border}
                onFocus={()=>{setIsFocus(true)}}
                onBlur={()=>{setIsFocus(false);onBlur}}
                {...otherProps}
                />
                {isError && <Typography variant='xsm' class='text-red-500 ml-2' >{error}</Typography>}
        </View>
    )
}

export default Input;
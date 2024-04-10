import { Image, Pressable, TextInput, View } from 'react-native'
import React, { useState } from 'react'

// Custom Imports
import colors from '../../config/colors'
import { cn } from '../../lib/cn';
import Typography from '../Typography/Typography';
import hide from "../../assets/icons/hide.png"
import show from "../../assets/icons/show.png"

type InputProps = {
  label: string;
  className?: string;
  width?: string;
  isError?: boolean;
  error?: string;
  secureText?:string;
} & React.ComponentProps<typeof TextInput>;


const PasswordInput: React.FC<InputProps> = ({ label, className, width, isError, error,secureText, ...otherProps }) => {
  const [secureTextEntry,setSecureTextEntry] = useState(true);
  const handleSecureTextEntry = ()=>{
    setSecureTextEntry((prevState)=>!prevState);
  }
  return (
    <>
      <View className={cn('my-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row', width,isError && "border-red-500")} style={{gap:1}}>
        <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white'>{label}</Typography>
        <TextInput
          selectionColor={colors.primaryGreen}
          className={cn(`placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm placeholder:text-black flex-1 mr-2`,
            className
          )}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.border}
          {...otherProps}
        />
        <Pressable onPress={handleSecureTextEntry}>
          <Image 
            source={secureTextEntry ? hide : show}
            alt='Password'
            className='w-7 h-5'
          />
        </Pressable>
      </View>
      {isError 
      ?
      <Typography variant='xsm' class='text-red-500 ml-2' >{error}</Typography>
      :
      <Typography variant='xsm' >{secureText ?? ""}</Typography>
      }
    </>
  )
}

export default PasswordInput;
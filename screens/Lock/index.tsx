import { View, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard, TextInput, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'


import { LockContext } from '../../store/LockContext'
import Typography from '../../components/Typography/Typography';
import logo from "../../assets/logo.png"
import Button from '../../components/Button';
import { _four_items } from '../../data/data';
import colors from '../../config/colors';

const InputComp = ({ onPress }: { onPress: (num: string) => void }) => {
  let inputs: any = [];
  let values: any = [];
  const handleChangeText = (text: string, i: number) => {
    values[i] = text;
  }

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => {


    if (e.nativeEvent.key !== "Backspace" && i <= 2) {
      inputs[i + 1].focus();
      return;
    }

    if (e.nativeEvent.key === "Backspace" && i > 0) {
      inputs[i - 1].focus();
      return;
    }
  };
  const handleValue = async () => {
    const filteredValues = values.filter((i: any) => i !== '');
    if (filteredValues.length < 4) {
      alert("Please enter all values");
      return;
    }
    const str = filteredValues[0] + filteredValues[1] + filteredValues[2] + filteredValues[3];
    console.log(str);
    onPress(str);
    handleClear()

    Keyboard.dismiss();
  }

  const handleClear = async()=>{
    inputs.forEach((val:any)=>{
      val.clear();
    })
  }

  useEffect(() => {
    if (inputs.length > 1) {
      inputs[0].focus();
    }
  }, [])

  return (
    <View className='justify-center'>
      <View className='flex-row justify-between items-center my-5 py-1 px-5 border border-primaryGreen rounded-full' style={{ gap: 0 }}>
        {
          _four_items.map((i: any, k: any) => (
            <TextInput
              key={k}
              ref={(e) => {
                if (e)
                  inputs[k] = e;
              }}
              placeholder='—'
              className='rounded-lg text-xl p-2 justify-center items-center text-center placeholder:text-3xl w-14'
              maxLength={1}
              placeholderTextColor={colors.primaryGreen}
              onChangeText={(text) => { handleChangeText(text, k) }}
              // selectionColor={'transparent'}
              selectionColor={colors.primaryGreen}
              keyboardType='number-pad'
              onKeyPress={(e) => onKeyPress(e, k)}
            />
          ))
        }
      </View>
      <View className='h-14'>
        <Button onPress={handleValue}>Submit</Button>
      </View>
    </View>

  )
}


const Lock = () => {



  const lockCtx = useContext(LockContext);
  useEffect(() => {
  }, [lockCtx.errorLogin])

  if (!lockCtx.pin) return (
    <View className='flex-1 justify-center items-center'>
      <View className='flex-1 justify-center items-center'>
        <Image
          source={logo}
          className='h-24 w-32'
          resizeMode='contain'
        />
      </View>
      <View className='flex-[2]'>
        <Typography variant='xl' class='text-center'>Set up your PIN</Typography>
        <InputComp onPress={(val: string) => {
          lockCtx.setNewPin(val)
        }} />
      </View>
    </View>
  )

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='flex-1 justify-center items-center'>
        <Image
          source={logo}
          className='h-24 w-32'
          resizeMode='contain'
        />
      </View>
      <View className='flex-[2]'>
        <Typography variant='xl' class='text-center'>Enter your PIN</Typography>
        <InputComp onPress={(val: string) => lockCtx.authenticate(val)} />
        {/* <Button onPress={()=>{lockCtx.removePin()}}>Remove</Button> */}
      </View>
    </View>
  )
}

export default Lock
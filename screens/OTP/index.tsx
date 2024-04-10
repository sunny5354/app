import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { _four_items } from '../../data/data';
import colors from '../../config/colors';
import Typography from '../../components/Typography/Typography';
import BottomButton from '../../components/BottomButton';
import { sendEmailCode, verifyEmailCode } from '../../http/auth';
import { ScreenNavigationProp, ScreenRouteProp } from '../../types/navigation';
import { sendAccountEmailCode, sendAccountPhoneCode, verifyAccountAuthPhoneCode, verifyAccountEmailCode, verifyAccountPhoneCode } from '../../http/profile/account';
import Toast from 'react-native-toast-message';



const OTP = ({ navigation, route }: { navigation: ScreenNavigationProp, route: ScreenRouteProp }) => {

  const inputs: any = [];
  const values: any = [];
  const handleChangeText = (text: string, i: number) => {
    values[i] = text;
  }

  const { isEmail, isPhone, isAuthEmail, phoneNumber, email,isAuthPhone } = route.params;

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

  const successToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'OTP sent successfully',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }

  const errorToast = (text: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }


  const resendOTP = async () => {
    if (isAuthEmail) {
      try {
        const res = await sendEmailCode();
        console.log("result email send otp =>", res);
        successToast();
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      return;
    }
    else if (isEmail) {
      try {
        const res = await sendAccountEmailCode();
        console.log("result email send otp =>", res);
        successToast();
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      return;
    }
    else if (isPhone) {
      try {
        const res = await sendAccountPhoneCode(phoneNumber);
        console.log("result email send otp =>", res);
        successToast();
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
      return;
    }
  }


  const handleValue = async () => {
    const filteredValues = values.filter((i: any) => i !== '');
    if (filteredValues.length < 4) {
      alert("Please enter all values");
      return;
    }
    const str = filteredValues[0] + filteredValues[1] + filteredValues[2] + filteredValues[3];
    // console.log(str);
    if (isAuthEmail) {
      try {
        const result = await verifyEmailCode(str);
        console.log('verify email otp result=> ', result);
        if (result) {
          navigation.replace("RegisterProfile");
        }
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
    else if (isEmail) {
      try {
        const result = await verifyAccountEmailCode(str);
        console.log('verify email otp result=> ', result);
        if (result) {
          navigation.goBack();
        }
      } catch (error: any) {
        console.log(error.response.data.message);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
    else if (isPhone) {
      try {
        const result = await verifyAccountPhoneCode(str);
        console.log('verify phone otp result=> ', result);
        if (result) {
          navigation.goBack();
        }
      } catch (error: any) {
        console.log(error.response);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
    else if (isAuthPhone) {
      try {
        const result = await verifyAccountAuthPhoneCode(str);
        console.log('verify phone otp result=> ', result);
        if (result) {
          navigation.goBack();
        }
      } catch (error: any) {
        console.log(error.response);
        errorToast(error.response.data.message ?? "Error Occured");
      }
    }
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (inputs.length > 1) {
      inputs[0].focus();
    }
  }, [])


  return (
    <View className='flex-1 relative'>
      <View className='flex-1 bg-white pt-20 items-center px-8' style={{ gap: 30 }}>
        <View className='justify-center items-center' style={{ gap: 10 }}>
          {(isEmail || isAuthEmail) && <Typography class='text-center text-2xl font-PoppinsSemiBold'>{"Verifying your Email !"}</Typography>}
          {(isPhone || isAuthPhone) && <Typography class='text-center text-2xl font-PoppinsSemiBold'>{"Verifying your Phone !"}</Typography>}
          {(isEmail || isAuthEmail) && <Typography class='text-center'>We have sent an OTP on your email {email}</Typography>}
          {(isPhone || isAuthPhone) && <Typography class='text-center'>We have sent an OTP on your phone {phoneNumber}</Typography>}
        </View>
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
                className='rounded-lg text-xl p-2 justify-center items-center text-center placeholder:text-3xl  w-14'
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
        <Pressable onPress={() => { resendOTP() }} className='max-h-20'>
          <Typography class='text-primaryGreen underline'>Resend OTP?</Typography>
        </Pressable>
      </View>
      <BottomButton
        text='Confirm'
        onPress={() => { handleValue() }}
      />
    </View>

  )
}

export default OTP
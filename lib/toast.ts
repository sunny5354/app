import Toast from "react-native-toast-message"


export const successToast = (text: string) => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: text,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  })
}

export const errorToast = (text: string) => {
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

export const infoToast = (text: string) => {
  Toast.show({
    type: 'info',
    position: 'top',
    text1: text,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  })
}

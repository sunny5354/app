import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LockContextProps {
  pin: string | null,
  loggedIn: boolean,
  errorLogin: boolean,
  setNewPin: (newPin: string) => void,
  authenticate: (pinValue: string) => void;
  removePin: () => void;
}

export const LockContext = createContext<LockContextProps>({
  pin: null,
  loggedIn: false,
  errorLogin: false,
  setNewPin: () => { },
  authenticate: () => { },
  removePin: () => { }
});

const LockContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pin, setPin] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorLogin, setErrorLogIn] = useState(false);

  const setNewPin = async (newPin: string) => {
    await AsyncStorage.setItem("pin", newPin);
    setPin(newPin);
  }

  const authenticate = async (pinValue: string) => {
    if (pinValue == pin) {
      setLoggedIn(true);
      setErrorLogIn(false);
    }
    else {
      console.log("error")
      setErrorLogIn(true);
    }
  };
  const removePin = async () => {
    await AsyncStorage.removeItem("pin");
    setPin(null);
  }

  const refreshToken = async () => {
    const pin = await AsyncStorage.getItem("pin");
    if (pin) setPin(pin);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const value: LockContextProps = {
    pin: pin,
    loggedIn: loggedIn,
    errorLogin: errorLogin,
    setNewPin: setNewPin,
    authenticate: authenticate,
    removePin: removePin
  };

  return (
    <LockContext.Provider value={value}>{children}</LockContext.Provider>
  );
};

export default LockContextProvider;

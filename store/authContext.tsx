import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../http/axiosInstance";
import { imagePdfFileTypeProps } from "../types/types";


type UserProps = {
    _id: string;
    fullName: string;
    email: string;
    avatar: imagePdfFileTypeProps;
    role: string;
}

interface AuthContextProps {
    user: UserProps | null; // You can replace 'any[]' with a more specific type
    tempUser: any[];
    token: string;
    tempToken: string;
    isAuthenticated: boolean;
    authenticate: (token: string, usr: UserProps) => void;
    updateUser: (user: UserProps) => void;
    tempAuthenticate: (token: string, usr: any[]) => void;
    validateTempToUser: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    tempUser: [],
    token: "",
    tempToken: "",
    isAuthenticated: false,
    authenticate: () => { },
    updateUser: () => { },
    tempAuthenticate: () => { },
    validateTempToUser: () => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string>("");
    const [tempAuthToken, setTempAuthToken] = useState<string>("");
    const [user, setUser] = useState<UserProps | null>(null);
    const [tempUser, setTempUser] = useState<any[]>([]);

    const authenticate = async (token: string, usr: UserProps) => {
        setAuthToken(token);
        setUser(usr);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(usr));
    };
    const updateUser = async (usr: UserProps) => {
        setUser(usr);
        await AsyncStorage.setItem("user", JSON.stringify(usr));
    }
    const tempAuthenticate = async (token: string, usr: any[]) => {
        setTempAuthToken(token);
        await AsyncStorage.setItem("tempToken", token);
        await AsyncStorage.setItem("tempUser", JSON.stringify(usr));
    };

    const validateTempToUser = async () => {
        const token = await AsyncStorage.getItem("tempToken");
        const usr = await AsyncStorage.getItem("tempUser");
        if (!token) return;
        if (!usr) return;
        else {
            authenticate(token, JSON.parse(usr));
            // await AsyncStorage.setItem("token", token);
            // await AsyncStorage.setItem("user", JSON.stringify(user));
            // setAuthToken(token);
            // setUser(JSON.parse(user!));
        }
    }


    const logout = async () => {
        setAuthToken("");
        setUser(null);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
    };

    const refreshToken = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");
        if (!token) return;
        else {
            setAuthToken(token);
            setUser(JSON.parse(user!));
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const result = await axiosInstance.get("/users/me");
                if (typeof result === "boolean" && result === true) {
                    logout();
                }
                // console.log("logged in user App.tsx ====>",result.data);
            } catch (error: any) {
                // console.log("error App.tsx => ", error.response.data);
            }
        };
        validateToken();
        refreshToken();
    }, []);

    const value: AuthContextProps = {
        token: authToken,
        tempToken: tempAuthToken,
        tempUser: tempUser,
        user: user,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        updateUser: updateUser,
        tempAuthenticate: tempAuthenticate,
        validateTempToUser: validateTempToUser,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;

import axiosInstanceAuth from "./axiosInstanceAuth";

export const registerUser = async (fullName: string, email: string, password: string, confirmPassword: string) => {
  const result = await axiosInstanceAuth.post('/auth/register', {
    fullName:fullName,
    email:email,
    password:password,
    confirmPassword:confirmPassword
  });
  return result.data;
}

export const LoginUser = async (email: string, password: string) => {
  const res = await axiosInstanceAuth.post("/auth/login", {
    email: email,
    password: password,
  })
  return res.data;
}


export const forgotPassword = async (email: string) => {
  const res = await axiosInstanceAuth.post("/auth/password/forgot", { email:email })
  return res.data;
}


export const resetPassword = async (email: string, password: string, confirmPassword: string, code: number) => {
  console.log(email, password, confirmPassword, code);
  const res = await axiosInstanceAuth.put("/auth/password/reset", {
    email: email,
    code: code,
    password: password,
    confirmPassword: confirmPassword,
  })
  return res.data;
}



export const sendPhoneCode = async (phone: string) => {
  const res = await axiosInstanceAuth.post("/auth/verify/phone/code", { phone: phone })
  console.log(res.data);
  return res.data;
}
export const verifyPhoneCode = async (otp: string) => {
  const res = await axiosInstanceAuth.post("/auth/verify/phone", { code: otp })
  return res.data;
}
export const sendEmailCode = async () => {
  const res = await axiosInstanceAuth.get("/auth/verify/email/code")
  return res.data;
}
export const verifyEmailCode = async (otp: string) => {
  const res = await axiosInstanceAuth.post("/auth/verify/email/", { code: +otp })
  return res.data;
}
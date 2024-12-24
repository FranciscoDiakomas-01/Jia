/* eslint-disable no-unused-vars */

import { getUserbyId } from "./users";

export async function updateMyProfile(body) {
    //validation
    if(body?.name.length <= 1 || body?.lastname.length <= 1 || !validateEmail(body?.email)){
        return false
    }
     try {
       const api = await fetch("http://localhost:3000/user", {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           authorization: localStorage.getItem("token"),
         },
         body: JSON.stringify(body),
       });

       const response = await api.json()
       return response?.data == "updated"
     } catch (error) {
       return false;
     }
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export async function resetPassword(body) {
    //validation
    console.log(body)
    if(!body?.newPassword.length >= 8|| !validateEmail(body?.email)){
        return false
    }
     try {
       const api = await fetch("http://localhost:3000/resetpassword", {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           authorization: localStorage.getItem("token"),
         },
         body: JSON.stringify(body),
       });

       const response = await api.json()
       console.log(response);
       return response?.data == "updated"
     } catch (error) {
       return false;
     }
}

export async function isLogged() {
  const response = await getUserbyId(localStorage.getItem("uuid"));
  return response?.data?.userdata.id ? true : false;
}
/* eslint-disable no-unused-vars */

export async function updateMyProfile(body) {
    //validation
    if(body?.name.length <= 1 || body?.lastname.length){
        return false
    }

    console.log(body)

     try {
       const API = await fetch(`http://localhost:3000/user`, {
         headers: {
           "Content-Type": "application/json",
           authorization: localStorage.getItem("token"),
         },
         method: "PUT",
         body: JSON.stringify(body),
       });
       const response = await API.json();
       console.log(response.data)
       return response?.data != "updated";
     } catch (error) {
       return false;
     }
}
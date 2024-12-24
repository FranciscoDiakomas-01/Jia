export async function getUsers(page = 1, limit = 10) {
    try {
         const API = await fetch(`https://jiabackend.onrender.com/users?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization" : localStorage.getItem("token")
            },
        });
    return await API.json()
    } catch (error) {
        return error
    }
}

export async function getUserbyId(id) {
  try {
    const API = await fetch(`https://jiabackend.onrender.com/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const respone = await  API.json();
    return respone
  } catch (error) {
    return error;
  }
}

export async function getUsersbyName(page = 1, limit = 10 , name) {
    try {
         const API = await fetch(
           `https://jiabackend.onrender.com/user/filter/${name}?page=${page}&limit=${limit}`,
           {
             headers: {
               "Content-Type": "application/json",
               authorization: localStorage.getItem("token"),
             },
           }
         );
    return await API.json()
    } catch (error) {
        return error
    }
}
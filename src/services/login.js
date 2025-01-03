
export async function login(email , password) {
    
    if (!email || !password || password?.length < 8 || !validateEmail(email)) {
        return false
    } else {
        const body = {
          email: email,
          password: password,
        };
        const API = await fetch("https://jiabackend.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const response = await API.json()
        return await response
    }
}



export async function singn(email , password , name , lastname) {
    
    if ( name?.length <= 1 || lastname?.length <= 1 || !email || !password || password?.length < 8 || !validateEmail(email)) {
        return false
    } else {
        const body = {
          email: email,
          password: password,
          name: name,
          lastname: lastname,
        };
        const API = await fetch("https://jiabackend.onrender.com/singin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const response = await API.json()
        return await response
    }
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
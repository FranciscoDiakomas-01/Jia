export async function getUsers(page = 1, limit = 10) {
    try {
         const API = await fetch(`http://localhost:3000/users?page=${page}&limit=${limit}`, {
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
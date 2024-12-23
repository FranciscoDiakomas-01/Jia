/* eslint-disable no-unused-vars */



export async function createComment(body) {
  try {
    const API = await fetch(`http://localhost:3000/comment`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await API.json();
    return response?.data == "created"
  } catch (error) {
    return false;
  }
}
export async function getCommentByPostId(postid , page = 1) {
    try {
        const API = await fetch(`http://localhost:3000/comment/${postid}?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });
    return await API.json()
    } catch (error) {
        return error
    }
   
}

export function isMyComent(commentUserId){

    const userId = localStorage.getItem("uuid");
    return commentUserId == userId
}


export async function deleteComment(commentId , postid = -1) {
    try {
        const API = await fetch(`http://localhost:3000/comment/${commentId}?post=${postid}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          method : 'DELETE'
        });
        const response = await API.json()
        console.log(response)
        return response?.data != "deleted";
    } catch (error) {
        return false
    }
   
}

export async function updatecommetnById(commentId , body) {
  
    try {
        const API = await fetch(`http://localhost:3000/comment/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          method: "PUT",
          body: JSON.stringify(body),
        });
        const response = await API.json()
        console.log(body, response);
        return response?.data == "updated";
    } catch (error) {
        return false
    }
   
}
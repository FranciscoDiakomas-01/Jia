/* eslint-disable no-unused-vars */

export async function getPosts(page = 1, limit = 10) {
  try {
    const API = await fetch(
      `http://localhost:3000/posts?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return await API.json();
  } catch (error) {
    return error;
  }
}
export async function getPostsByNameOrDescription(
  seacrh,
  page = 1,
  limit = 10
) {
  try {
    if (!seacrh || String(seacrh).length == 0) {
      return false;
    }
    const API = await fetch(
      `http://localhost:3000/posts/${seacrh}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return await API.json();
  } catch (error) {
    return error;
  }
}

export async function createPost(body) {
  try {
    const API = await fetch(`http://localhost:3000/post`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(body),
    });
     const response = await API.json();
     console.log(response)
     return response.data == "created";
  } catch (error) {
    return error;
  }
}

export async function updatePost(body) {
  try {
    const API = await fetch(`http://localhost:3000/post`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "PUT",
      body: JSON.stringify(body),
    });
    const response = await API.json();
    return response.data == "updated";
  } catch (error) {
    return error;
  }
}
export async function getPostById(postid) {
  try {
    const API = await fetch(`http://localhost:3000/post/${postid}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    return await API.json();
  } catch (error) {
    return error;
  }
}

export async function getPostByUserId(userid, page = 1, limit = 8) {
  try {
    const API = await fetch(
      `http://localhost:3000/postbyuser/${userid}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return await API.json();
  } catch (error) {
    return error;
  }
}
export async function like(postid) {
  try {
    const API = await fetch(`http://localhost:3000/like`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        postid: postid,
      }),
    });
    const response = await API.json();
    return await response;
  } catch (error) {
    return error;
  }
}

export async function deslike(postid) {
  try {
    const API = await fetch(`http://localhost:3000/deslike`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "DELETE",
      body: JSON.stringify({
        postid: postid,
      }),
    });
    const response = await API.json();
    return await response;
  } catch (error) {
    return error;
  }
}

export async function deletePost(postid) {
  try {
    const API = await fetch(`http://localhost:3000/post/${postid}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "DELETE",
      body: JSON.stringify({
        postid: postid,
      }),
    });
    const response = await API.json();
    return response;
  } catch (error) {
    return error;
  }
}

export function resetFilter(setFilter, setReload, setPage) {
  setFilter((prev) => "");
  setPage((prev) => 1);
  setReload((prev) => !prev);
  return;
}

export function isMyPost(userIdPost) {
  const myid = localStorage.getItem("uuid");
  if (myid == userIdPost) {
    return true;
  }
  return false;
}

/* eslint-disable react-hooks/exhaustive-deps */

import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaPaperPlane,
  FaRegEdit,
  FaRegHeart,
  FaRegTrashAlt,
} from "react-icons/fa";
import {deletePost, getPostById, isMyPost } from "../../services/posts";
import { useNavigate } from "react-router-dom";
import {
  createComment,
  deleteComment,
  getCommentByPostId,
  isMyComent,
} from "../../services/comment";
import { toast, ToastContainer } from "react-toastify";
export default function PostDetails() {
  const [post, setPost] = useState();
  const [comment, setComment] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const postid = sessionStorage.getItem("postid");
  const [lastPage, setLasPage] = useState();
  const [page, setPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const nav = useNavigate();
  
  useEffect(() => {

    setLoad(true);
    if (!postid || postid == null || postid == undefined) {
      nav("/");
      return;
    }

    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 10,
    });
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await getPostById(postid);
      if (!response?.data?.data?.postid) {
        toast.error("Este post foi eliminado!" , {theme : 'dark'});
        setTimeout(()=>{
          nav("/")
        },2000)
        return;
      }else{
        setPost(response?.data.data);
      }
      
    }
    async function getComment() {
      const comentget = await getCommentByPostId(postid, page);
      if (page == 1) {
        setComment(comentget?.data?.data);
        setPage(comentget?.data?.page);
        setLasPage(comentget?.data?.laspage);
        return;
      } else {
        const prevData = Array(...comment).concat(comentget?.data?.data);
        setComment(prevData)
        return;
      }
    }
    const interval = setInterval(()=>{
       getComment(); 
       getData();
    }, 1000)
   
   
    return () => {
      clearInterval(interval)
    };
  }, [page]);

  async function create(text, postid) {
    if (!text) {
      return;
    }
    const body = {
      postid,
      text,
    };
   await createComment(body);
  }
  return (
    <article id="postDetails">
      <ToastContainer style={{
        zIndex : '9999999999'
      }}/>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <aside>
            <span>
              <p
                onClick={() => {
                  sessionStorage.setItem("userid", post?.userid);
                  nav("/userProfile");
                }}
                style={{ backgroundImage: post?.postbg }}
              >
                {String(
                  post?.username?.at(0) + post?.userlastname?.at(0)
                ).toUpperCase()}
              </p>
              <i>
                {post?.username + " " + post?.userlastname} /
                {post?.useremail + " "}
                <small>{post?.postdate}</small>
              </i>

              <div style={{ backgroundImage: post?.postbg }}>
                {post?.posttitle?.slice(0, 50)}
              </div>
              <article>
                {post?.is_liked ? (
                  <FaHeart style={{ color: "var(--pink)" }} />
                ) : (
                  <FaRegHeart />
                )}
              </article>
              <b style={{ cursor: "pointer" }}>
                {post?.comment} Comentário(s) & {post?.likes} Curtida(s)
              </b>
              <h2>#{post?.posttitle}</h2>
              <p>{post?.posttext}</p>
            </span>
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await create(newComment, post?.postid);
                  setNewComment("");
                }}
              >
                <input
                  autoFocus
                  placeholder={"Entre com o seu comentário"}
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <FaPaperPlane
                  onClick={async (e) => {
                    e.preventDefault();
                    await create(newComment, post?.postid);
                    setNewComment("");
                  }}
                />
              </form>
              <article>
                {Array.isArray(comment) && comment?.length > 0 ? (
                  <>
                    {comment?.map((c) => (
                      <figure key={c.commentid}>
                        <span>
                          <div
                            style={{
                              backgroundImage:
                                c.userid == post.userid && post?.postbg,
                            }}
                          >
                            {c.username?.at(0) + c.userlastname?.at(0)}
                          </div>
                          <aside>
                            <b>{c.username + " " + c.userlastname}</b>
                            <p>
                              {isMyPost(post.userid) || isMyComent(c.userid) ? (
                                <span>
                                  <FaRegTrashAlt
                                    onClick={async () => {
                                      await deleteComment(
                                        c.commentid,
                                        post.postid
                                      );
                                    }}
                                  />
                                </span>
                              ) : null}
                              {isMyComent(c.userid) ? (
                                <span>
                                  <FaRegEdit />
                                </span>
                              ) : null}
                            </p>
                          </aside>
                        </span>
                        <figcaption>{c.text}</figcaption>
                      </figure>
                    ))}
                    {page < lastPage && (
                      <button
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        ver mais
                      </button>
                    )}
                  </>
                ) : (
                  <h1>Sem comentários</h1>
                )}
              </article>
            </div>
          </aside>
          {isMyPost(post?.userid) && (
            <figcaption>
              <button onClick={async() => {
                setLoad(true)
                await deletePost(post?.postid)
                setTimeout(()=>{
                  nav("/")
                },1000)
              }}>Eliminar</button>
              <button>Editar</button>
            </figcaption>
          )}
        </>
      )}
    </article>
  );
}
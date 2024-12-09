/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaPaperPlane,  FaRegEdit, FaRegHeart , FaRegTrashAlt} from "react-icons/fa";
import { deletePost, getPostById, isMyPost } from "../../services/posts";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function PostDetails() {
  const[post , setPost] = useState({})
  const comment = [
 
    {
      userid: 10,
      text: "Grande kotah 🤞🤞❤️❤️❤️",
      username: "Francisco",
      userlasname: "Diakomas",
      email: "fdk@gmail.com",
    }
  ];
  const [isLoad, setLoad] = useState(true);
  const [isLoad1, setLoad1] = useState(true);
  const postid = sessionStorage.getItem("postid");
  const nav = useNavigate()
  useEffect(() => {
    setLoad(true);
    if (!postid || postid == null || postid == undefined) {
      nav("/")
      return
    }
    async function getData() {
      const response = await getPostById(postid)
      console.log(response?.data.data)
      setPost((prev) => response?.data.data);
    }
    getData()
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 10,
    });
    setTimeout(() => {
      setLoad(false);
    }, 2000);

    setTimeout(() => {
      setLoad1(false);
    }, 4000);
  }, []);

  return (
    <article id="postDetails">
      <ToastContainer></ToastContainer>
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
                  post.username?.at(0) + post.userlastname?.at(0)
                ).toUpperCase()}
              </p>
              <i>
                {post.username + " " + post.userlastname} / {post?.useremail}{" "}
              </i>
              {post?.postimage ? (
                <img src={post.postimage} />
              ) : (
                <div style={{ backgroundImage: post?.postbg }}>
                  {post.posttitle?.slice(0, 50)}
                </div>
              )}
            </span>

            <div>
              <article>
                {isLoad1 ? (
                  <Loader />
                ) : (
                  <>
                    {Array.isArray(comment) &&
                      comment?.length > 0 &&
                      comment?.map((c) => (
                        <figure key={c.id}>
                          <span>
                            <div>
                              {c.username?.at(0) + c.userlasname?.at(0)}
                            </div>
                            <aside>
                              <b>
                                {c.username +
                                  " " +
                                  c.userlasname}
                              </b>
                              {isMyPost(post.userid) && (
                                <span>
                                  <FaRegTrashAlt />
                                </span>
                              )}
                            </aside>
                          </span>
                          <figcaption>{c.text}</figcaption>
                        </figure>
                      ))}
                  </>
                )}
              </article>
              <form>
                <input autoFocus placeholder={"Entre com o seu comentário"} />
                <FaPaperPlane />
              </form>
            </div>
          </aside>
          <figcaption>
            <h2>#{post.posttitle}</h2>
            <p>{post.posttext}</p>
            <article>
              {post?.is_liked ? (
                <FaHeart style={{ color: "var(--pink)" }} />
              ) : (
                <FaRegHeart />
              )}
            </article>
            <b style={{ cursor: "pointer" }}>
              {post?.comment} Comentários & {post?.likes} Curtidas
            </b>
            {isMyPost(post.userid) && (
              <article>
                  <button onClick={async () => {
                    
                    toast.success("Deletado com sucesso!", {
                      theme: "dark",
                      position: "bottom-left",
                    });
                    await deletePost(post.postid);
                    
                    setLoad(true);
                    setTimeout(() => {
                    
                    nav("/")
                  },2000)
                }}>Deletar</button>
                <button>Editar</button>
              </article>
            )}
          </figcaption>
        </>
      )}
    </article>
  );
}

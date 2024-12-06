/* eslint-disable no-unused-vars */
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPaperPlane,  FaRegEdit, FaRegHeart , FaRegTrashAlt} from "react-icons/fa";
export default function PostDetails() {
  const post = {
    id: 1,
    title: "Bem Vindo ao meu mundo das maravilhas",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam assumenda, perferendis veniam aut unde praesentium maiores nisi delectus distinctio omnis, earum dolores! Itaque consectetur, suscipit incidunt ipsa ipsum deleniti.",
    likes: 30,
    comments: 40,
    userId: 10,
  };
  const comment = [
 
    {
      userid: 10,
      text: "Grande kotah 🤞🤞❤️❤️❤️",
      username: "Francisco",
      userlasname: "Diakomas",
      email: "fdk@gmail.com",
    },
    
    {
      userid: 10,
      text: "Grande kotah 🤞🤞❤️❤️❤️",
      username: "Francisco",
      userlasname: "Diakomas",
      email: "fdk@gmail.com",
    },
    {
      userid: 10,
      text: "Grande kotah 🤞🤞❤️❤️❤️",
      username: "Francisco",
      userlasname: "Diakomas",
      email: "fdk@gmail.com",
    },
    {
      userid: 10,
      text: "Grande kotah 🤞🤞❤️❤️❤️",
      username: "Francisco",
      userlasname: "Diakomas",
      email: "fdk@gmail.com",
    },
  ];
  const [isLoad, setLoad] = useState(true);
  const [isLoad1, setLoad1] = useState(true);
  const [answer , setAnswer] = useState(false)
  const [placeholder, setPlaceHolder] = useState("Adicione um Comentário");
  useEffect(() => {
    if (answer == true) {
        setLoad1(true)
        setTimeout(() => {
            setLoad1(false);
        }, 2000);
          return
    }
    setLoad(true);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 10,
    });
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [answer]);

  return (
    <article id="postDetails">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <FaArrowLeft
            onClick={() => {
              history.back();
            }}
          />
          <aside>
            <span>
              {post?.cover ? (
                <img src={post.cover} />
              ) : (
                <div>{post.title?.slice(0, 50)}</div>
              )}
            </span>

            <div>
              {answer ? (
                <article>
                  <nav>
                    <FaArrowLeft
                      onClick={() => {
                        setAnswer((prev) => false);
                      }}
                    />
                    <h1>Responsendo...</h1>
                  </nav>
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
                                <b>{c.username + " " + c.userlasname}</b>
                                <i>{c.email}</i>
                                <i>7 Respostas</i>
                                <span>
                                  <FaRegTrashAlt />
                                  <FaRegEdit
                                    onClick={() => {
                                      setPlaceHolder(
                                        (prev) =>
                                          "Response o comentário do usuário"
                                      );
                                      setAnswer((prev) => true);
                                    }}
                                  />
                                </span>
                              </aside>
                            </span>
                            <figcaption>{c.text}</figcaption>
                          </figure>
                        ))}
                    </>
                  )}
                </article>
              ) : (
                <>
                  {Array.isArray(comment) &&
                    comment?.length > 0 &&
                    comment?.map((c) => (
                      <figure key={c.id}>
                        <span>
                          {c?.cover ? (
                            <img src={c?.cover} />
                          ) : (
                            <div>
                              {c.username?.at(0) + c.userlasname?.at(0)}
                            </div>
                          )}
                          <aside>
                            <b>{c.username + " " + c.userlasname}</b>
                            <i>{c.email}</i>
                            <i>7 Respostas</i>
                            <span>
                              <FaRegTrashAlt />
                              <FaRegEdit
                                onClick={() => {
                                  setPlaceHolder(
                                    (prev) => "Response o comentário do usuário"
                                  );
                                  setAnswer((prev) => true);
                                }}
                              />
                            </span>
                          </aside>
                        </span>
                        <figcaption>{c.text}</figcaption>
                      </figure>
                    ))}
                </>
              )}
              <form>
                <input placeholder={placeholder} />
                <FaPaperPlane />
              </form>
            </div>
          </aside>
          <figcaption>
            <h2>#{post.title}</h2>
            <p>{post.description}</p>
            <article>
              <button>
                <FaRegHeart />
              </button>
            </article>
            <b style={{ cursor: "pointer" }}>
              {post.comments} Comentários & {post.likes} Curtidas
            </b>
            <article>
              <button>Deletar</button>
              <button>Editar</button>
            </article>
          </figcaption>
        </>
      )}
    </article>
  );
}

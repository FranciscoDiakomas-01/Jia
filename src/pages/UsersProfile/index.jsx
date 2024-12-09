
import "./index.css";
import profile from "../../assets/bg2.jpg";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import file1 from "../../assets/bg2.jpg";
import Loader from "../../components/Loader";
import {FaRegComment, FaRegHeart } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
export default function UsersProfile() {
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate();
  const posts = [
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 10,
      comments: 20,
      profile,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 m",
      content:
        "Óla pessoal hoje vamos falar sobre a minha trajectoria no dubai",
    },
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 140,
      comments: 40,
      profile: file1,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 d",
      content: "Óla pessoal",
    },
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 140,
      comments: 40,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 d",
      content: "Óla pessoal",
    },
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 10,
      comments: 20,
      profile,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 m",
      content:
        "Óla pessoal hoje vamos falar sobre a minha trajectoria no dubai",
    },
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 140,
      comments: 40,
      profile: file1,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 d",
      content: "Óla pessoal",
    },
    {
      id: crypto.randomUUID(),
      title: "Descobrindo o mundo",
      likes: 140,
      comments: 40,
      userName: "Francisco Diakomas",
      userEmail: "francisco@gmail.com",
      date: "1 d",
      content: "Óla pessoal",
    },
  ];
  const user = {
    followers: 100,
    posts: 1000,
    followings: 400,
    name: "Francisco",
    lastname: "Diakomas",
    email: "franciscodiakomas@gmail.com",
    facebook: "https://facebook.com",
    isntagram: "https://facebook.com",
    bio: "Meu pefil posta muita coisa sobre a computação e tudo mais ❤️❤️",
    profile
  };
  useEffect(() => {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: -10000000000,
      });
    setLoad(true);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 50,
    });
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <section id="usersProfile">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <span data-aos="zoom-out-left">
            {user.profile ? (
              <img src={user.profile} />
            ) : (
              <div id="profile">
                {user.name.at(0) + " " + user.lastname.at(0)}
              </div>
            )}
            <aside>
              <h1>{user.name + " " + user.lastname}</h1>
              <i>{user.email}</i>
              <p>{user.bio}</p>
            </aside>
          </span>
          <section>
            {Array.isArray(posts) &&
              posts?.length > 0 &&
              posts?.map((post) => (
                <figure key={post.id} data-aos="slide-up" onClick={() => {
                  nav("/postDetails")
                }}>
                  {post?.profile ? (
                    <>
                      <img src={post.profile} alt="" />
                    </>
                  ) : (
                    <>
                      <div>{post?.content}</div>
                    </>
                  )}
                  <p>
                    {post.content?.slice(0, 10)}{" "}
                    <a
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      ver mais
                    </a>
                    ...
                  </p>
                  <article>
                    <button>
                      <FaRegHeart />
                    </button>
                    <button>
                      <FaRegComment />
                    </button>
                  </article>
                  <p style={{ cursor: "pointer" }}>
                    {post.comments} Comentários & {post.likes} Curtidas{" "}
                  </p>
                </figure>
              ))}
          </section>
        </>
      )}
    </section>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./index.css";
import { FaHeart, FaRegComment, FaSearch, FaSync } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  deslike,
  getPosts,
  getPostsByNameOrDescription,
  like,
  resetFilter,
} from "../../services/posts";
import { toast } from "react-toastify";
import { shuffleArray } from "../../services/util";
export default function Main() {
  const [posts, setPost] = useState([]);
  const [reload, setReload] = useState(false);
  const nav = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLasPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (page == 1) {
      window.scrollTo({
        behavior: "smooth",
        top: -100000000000,
        left: 0,
      });
    }
   
    setTimeout(() => {
      setLoad(false);
    }, 4000);
    async function get() {
      if (filter.length != 0) {
        const response = await getPostsByNameOrDescription(filter, page, 10);
        if (page != 1) {
          const newList = response?.data.data;
          setPost((prev) => [...prev, ...newList]);
          setLasPage((prev) => response?.data.laspage);
          return;
        }
        setPost((prev) => response?.data?.data);
        setLasPage((prev) => response?.data.laspage);
        return;
      }
      const response = await getPosts(page, 10);
      if (page != 1) {
        const newList = response?.data.data;
        setPost((prev) => [...prev, ...newList]);
        setLasPage((prev) => response?.data.laspage);
        return;
      } else {
        if (response?.data.data?.length == 0) {
          toast.info("Ainda não há pulicações!", {
            theme: "dark",
            position: "top-left",
          });
          return;
        }
        setPost((prev) => shuffleArray(response?.data?.data));
        setLasPage((prev) => response?.data.laspage);
        return;
      }
    }
    get();
  }, [reload, page]);

  useEffect(() => {
    const Observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        //
        setTimeout(() => {
          if (page == lastPage) {
            setPage((pev) => lastPage);
            return;
          } else if (lastPage > page) {
            const newPage = page + 1;
            setPage(newPage);
            return;
          }
        }, 1000);
      }
    });
    Observer.observe(document.getElementById("sentinela"));
    return () => Observer.disconnect();
  }, [reload, lastPage, page]);

  return (
    <section id="main">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPage((prev) => 1);
                setReload((prev) => !prev);
              }}
            >
              <div>
                <input
                  placeholder="Pesquise aqui"
                  onChange={(e) => {
                    setFilter((prev) => e.target.value);
                  }}
                  value={filter}
                />
                <button>
                  <FaSearch />
                </button>
              </div>
              {filter.length != 0 && (
                <button
                  onClick={() => {
                    resetFilter(setFilter, setReload, setPage);
                  }}
                >
                  <FaSync />
                </button>
              )}
            </form>
          </div>
          <section>
            {Array.isArray(posts) &&
              posts?.length > 0 &&
              posts?.map((post, index) => (
                <figure key={index} data-aos="slide-up">
                  <span
                    onClick={() => {
                      sessionStorage.setItem("visitId", post?.userid);
                      nav("/userProfile");
                    }}
                  >
                    <p
                      style={{
                        backgroundImage: post?.postbg,
                      }}
                    >
                      {post?.username?.at(0)?.toUpperCase() +
                        post?.userlastname?.at(0)?.toUpperCase()}
                    </p>
                    <div>
                      <b>{post?.username + " " + post?.userlastname}</b>
                      <small>{post?.postdate}</small>
                    </div>
                  </span>

                  <div
                    onClick={() => {
                      sessionStorage.setItem("postid", post.postid);
                      nav("/postDetails");
                    }}
                    style={{
                      backgroundImage: post?.postbg,
                    }}
                  >
                    {post?.posttitle}
                  </div>
                  <p
                    onClick={() => {
                      sessionStorage.setItem("postid", post.postid);
                      nav("/postDetails");
                    }}
                  >
                    {post.posttext?.slice(0, 100)}{" "}
                    <a
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      ver mais
                    </a>
                    ...
                  </p>
                  <article>
                    <button>
                      {post?.is_liked ? (
                        <FaHeart
                          style={{ color: "var(--pink)" }}
                          onClick={async () => {
                            if (post.likes == 0) {
                              return;
                            }
                            setPost((prev) => [
                              ...prev,
                              (prev[index].is_liked = false),
                            ]);
                            const oldPosts = [...posts];
                            setPost(oldPosts);
                            await deslike(post?.postid);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={async () => {
                            setPost((prev) => [
                              ...prev,
                              (prev[index].is_liked = true),
                            ]);
                            const oldPosts = [...posts];
                            setPost(oldPosts);
                            await like(post?.postid);
                          }}
                        />
                      )}
                    </button>
                    <button>
                      <FaRegComment />
                    </button>
                  </article>
                  <p style={{ cursor: "pointer" }}>
                    {post.comment} Comentário(s) & {post.likes} Curtidas(s)
                  </p>
                </figure>
              ))}
          </section>
        </>
      )}
      <section
        style={{
          height: isLoad && "100dvh",
        }}
      ></section>
      <p id="sentinela">
        {posts?.length != 0 && <>{lastPage != page && <Loader />}</>}
      </p>
    </section>
  );
}

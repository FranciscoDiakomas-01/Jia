import "./index.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getPostByUserId } from "../../services/posts";
import Loader from "../../components/Loader";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserbyId } from "../../services/users";
export default function UsersProfile() {
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate();

  const [page, setPage] = useState(1);
  const [lasPage, setLastPage] = useState();
  const [myPost, setMyPost] = useState([]);
  const [user , setUser] = useState()
  const [userId , setUserId] = useState(sessionStorage.getItem("visitId") ? sessionStorage.getItem("visitId") : localStorage.getItem("uuid"))
  useEffect(() => {
    const interval = setInterval(()=>{
      setUserId(sessionStorage.getItem("visitId") ? sessionStorage.getItem("visitId") : localStorage.getItem("uuid"))
    }, 100)
    async function get() {
      const userget = await getUserbyId(userId)
      const response = await getPostByUserId(userId, page, 8);
      setMyPost(response?.data?.data);
      setUser(userget?.data)
      setLastPage(response?.data?.laspage);
    }
    get();
    setLoad(true);
    
    setTimeout(() => {
      setLoad(false);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [page , userId]);

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
      offset: 40,
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
          <span>
            <div id="profile">{user?.name.at(0) + "" + user?.lastname.at(0)}</div>
            <aside>
              <h1>{user?.name + " " + user?.lastname}</h1>
              <i>{user?.email}</i>
              <p>{user?.bio}</p>
            </aside>
          </span>
          <section>
            {Array.isArray(myPost) &&
              myPost?.length > 0 &&
              myPost?.map((post) => (
                <figure
                  key={post.id}
                  data-aos="slide-up"
                  onClick={() => {
                    sessionStorage.setItem("postid", post.postid);
                    nav("/postDetails");
                  }}
                >
                  <div
                    onClick={() => {
                      nav("/postDetails");
                    }}
                    style={{
                      backgroundImage: post?.postbg,
                    }}
                  >
                    {post?.posttitle?.slice(0, 100)}...
                  </div>
                  <p>
                    {post.posttitle?.slice(0, 100) + " "}
                    <a
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      ver detalhes
                    </a>
                    ...
                  </p>
                  <article>
                    <button>
                      {" "}
                      {post?.is_liked ? (
                        <FaHeart style={{ color: "var(--pink)" }} />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <button>
                      <FaRegComment />
                    </button>
                  </article>
                  <p style={{ cursor: "pointer" }}>
                    {post.comment} Comentários & {post.likes} Curtidas{" "}
                  </p>
                </figure>
              ))}
          </section>
        </>
      )}
      <footer>
        <p>
          {page} de {lasPage}
        </p>
        <div>
          <button
            onClick={() => {
              if (page <= 1) {
                return;
              } else {
                setPage((prev) => prev - 1);
              }
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              if (page == lasPage) {
                return;
              } else {
                setPage((prev) => prev + 1);
              }
            }}
          >
            {">"}
          </button>
        </div>
      </footer>
    </section>
  );
}

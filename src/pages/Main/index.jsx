import './index.css'
import { FaRegComment, FaSearch } from "react-icons/fa";
import profile from '../../assets/profile.jpg'
import { FaRegHeart } from "react-icons/fa6";
import file1 from '../../assets/bg2.jpg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
export default function Main() {
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
];
  const nav = useNavigate()
  const [isLoad, setLoad] = useState(true);
useEffect(() => {
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
   <section id="main">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         <div>
           <form>
             <div>
               <input placeholder="Pesquise pelo título da postagem" />
               <button>
                 <FaSearch />
               </button>
             </div>
           </form>
         </div>
         <section>
           {Array.isArray(posts) &&
             posts?.length > 0 &&
             posts?.map((post) => (
               <figure key={post.id} data-aos="slide-up">
                 <span
                   onClick={() => {
                     nav("/userProfile");
                   }}
                 >
                   {post?.profile ? (
                     <>
                       <img src={post.profile} alt="" />
                     </>
                   ) : (
                     <>
                       <p>{post.userName?.slice(0, 3)}</p>
                     </>
                   )}
                   <div>
                     <b>{post.userName}</b>
                     <small>{post?.date}</small>
                   </div>
                 </span>
                 {post?.profile ? (
                   <>
                     <img
                       src={post.profile}
                       alt=""
                       onClick={() => {
                         nav("/postDetails");
                       }}
                     />
                   </>
                 ) : (
                   <>
                     <div
                       onClick={() => {
                         nav("/postDetails");
                       }}
                     >
                       {post?.content}
                     </div>
                   </>
                 )}
                 <p
                   onClick={() => {
                     nav("/postDetails");
                   }}
                 >
                   {post.content?.slice(0, 100)}{" "}
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
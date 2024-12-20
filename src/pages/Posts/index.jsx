
import './index.css'
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { getPostByUserId } from '../../services/posts';
export default function Posts() {
  const [isLoad, setLoad] = useState(true)
  const nav = useNavigate()
  const [page , setPage] = useState(1)
  const [lasPage , setLastPage] = useState();
  const [myPost , setMyPost] = useState([])
  useEffect(() => {
      async function get() {
        const userId = localStorage.getItem("uuid")
        const response = await getPostByUserId(userId, page, 8);
        setMyPost(response?.data?.data)
        setLastPage(response?.data?.laspage);
      }
      get()
      setLoad(true);
      AOS.init({
        duration: 800, 
        easing: "ease-in-out", 
        once: false, 
        offset: 100, 
      });
      setTimeout(() => {
        setLoad(false)
      },2000)
    }, [page]);

 return (
   <section id="post">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         <nav>
           <p>Meus Post</p>
           <button
             onClick={() => {
               nav("/createPost");
             }}
           >
             Novo Post
           </button>
         </nav>
         {Array.isArray(myPost) && myPost?.length > 0 ? (
           <>
             <article>
               {myPost.map((post) => (
                 <figure
                   key={post.postid}
                   data-aos="flip-right"
                   onClick={() => {
                     sessionStorage.setItem("postid", post.postid);
                     nav("/postDetails");
                   }}
                 >
                   <div style={{ backgroundImage: post?.postbg }}>
                     {post?.posttitle?.slice(0, 10)}...
                   </div>
                   <figcaption>
                     <span>
                       <div>
                         <FaRegComment />
                         <h1>{post.comment}</h1>
                       </div>
                       <div>
                         {post.is_liked ? (
                           <FaHeart style={{ color: "var(--pink)" }} />
                         ) : (
                           <FaRegHeart />
                         )}
                         <h1>{post.likes}</h1>
                       </div>
                     </span>
                     <p>{post?.posttext?.slice(0, 60)}...</p>
                     <p>Clique para ver mais detalhes</p>
                   </figcaption>
                 </figure>
               ))}
             </article>
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
           </>
         ) : (
           <h1>Sem Postagens</h1>
         )}
       </>
     )}
   </section>
 );
}
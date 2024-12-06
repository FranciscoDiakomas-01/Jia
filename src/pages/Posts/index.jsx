
import './index.css'
import cover from '../../assets/bg2.jpg'
import { FaRegComment, FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect , useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
export default function Posts() {
  const [isLoad, setLoad] = useState(true)
  const nav = useNavigate()
  useEffect(() => {
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
    }, []);

 const postsBanners = [
   {
     id: 1,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     cover,
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
   {
     id: 2,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     cover,
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
   {
     id: 3,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     cover,
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
   {
     id: 1,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
   {
     id: 2,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     cover,
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
   {
     id: 3,
     content:
       "ola mundoola muola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundoola mundondo",
     cover,
     comment: 10,
     likes: 20,
     bg: "var(--blue)",
   },
 ];
 return (
   <section id="post">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         <nav>
           <p>Meus Post</p>
           <form>
             <div>
               <input placeholder="Pesquise as sua postagens pelo título" />
               <button>
                 <FaSearch />
               </button>
             </div>
           </form>
           <button
             onClick={() => {
               nav("/createPost");
             }}
           >
             Novo Post
           </button>
         </nav>
         <article>
           {Array.isArray(postsBanners) &&
             postsBanners?.length > 0 &&
             postsBanners.map((post) => (
               <figure key={post.id} data-aos="flip-right">
                 {post?.cover ? (
                   <img src={post.cover}></img>
                 ) : (
                   <div style={{ backgroundColor: post?.bg }}>
                     {post?.content?.slice(0, 10)}...
                   </div>
                 )}
                 <figcaption>
                   <div>
                     <FaRegComment />
                     <h1>{post.comment}k</h1>
                   </div>
                   <div>
                     <FaRegHeart />
                     <h1>{post.likes}k</h1>
                   </div>
                 </figcaption>
               </figure>
             ))}
         </article>
       </>
     )}
   </section>
 );
}
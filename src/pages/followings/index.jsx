import './index.css'
import profile from "../../assets/profile.jpg";
import { FaSearch, FaRegPaperPlane } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
export default function Followings() {
     
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
 const users = [
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
     isFollowing: true,
     follwers: 100,
     posts: 10,
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com",
     isFollowing: false,
     profile,
     follwers: 999,
     posts: 999,
   },
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
     isFollowing: true,
     follwers: 1,
     posts: 3,
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com",
     isFollowing: false,
     profile,
     follwers: 0,
     posts: 0,
   },
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
     isFollowing: true,
     follwers: 100,
     posts: 10,
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com",
     isFollowing: false,
     profile,
     follwers: 999,
     posts: 999,
   },
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
     isFollowing: true,
     follwers: 1,
     posts: 3,
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com",
     isFollowing: false,
     profile,
     follwers: 0,
     posts: 0,
   },
 ];
 return (
   <section id="followings">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         <div>
           <form>
             <div>
               <input placeholder="Pesquise os seus admiradores pelo nome" />
               <button>
                 <FaSearch />
               </button>
             </div>
           </form>
         </div>
         <article>
           {users?.length > 0 &&
             users?.map((user, index) => (
               <figure key={index} data-aos="fade-right">
                 <span>
                   {user?.profile ? (
                     <img src={user?.profile} />
                   ) : (
                     <div>{user?.name?.at(0) + user?.lasname?.at(0)}</div>
                   )}
                   <p>{user?.name + user?.lasname}</p>
                   <i>{user?.email}</i>
                 </span>
                 <aside>
                  <span> <div>
                     <p>{user.follwers}k</p>
                     <b>Seguidores</b>
                   </div>
                   <div>
                     <p>{user.posts}</p>
                     <b>Publicações</b>
                   </div></span>
                   <span>
                     <button
                       style={{
                         backgroundColor: "var(--pink)",
                       }}
                     >
                       <HiOutlinePaperClip />
                       <p>Parar de seguir</p>
                     </button>
                     <button>
                       <FaRegPaperPlane />
                       <p>Visitar</p>
                     </button>
                   </span>
                 </aside>
               </figure>
             ))}
         </article>
       </>
     )}
   </section>
 );
}
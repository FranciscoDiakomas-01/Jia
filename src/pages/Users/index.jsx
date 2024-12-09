import './inde.css'
import { FaSearch, FaRegPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
export default function Users() {
    
  
  const nav = useNavigate();
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {
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
  }, []);
 const users = [
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com",
   },
   {
     id: 1,
     name: "Francisco",
     lasname: "Diakomas",
     email: "fdk@gmail.com",
   },
   {
     id: 1,
     name: "Pedro",
     lasname: "Miguel",
     email: "pedro@gmail.com"
   },
 ];   
 return (
   <section id="followers">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         <div>
           <form>
             <div>
               <input placeholder="Pesquise pelo nome" />
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
                   <div>{user?.name?.at(0) + user?.lasname?.at(0)}</div>
                   <p>{user?.name + user?.lasname}</p>
                   <i>{user?.email}</i>
                 </span>
                   <button
                     onClick={() => {
                       nav("/userProfile");
                     }}
                   >
                     <FaRegPaperPlane />
                     <p>Visitar</p>
                   </button>
               </figure>
             ))}
         </article>
       </>
     )}
   </section>
 );
}
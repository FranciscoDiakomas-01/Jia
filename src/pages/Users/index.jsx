import './inde.css'
import { FaSearch, FaRegPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { getUsers } from '../../services/users';
export default function Users() {
    
  const [users , setUsers] = useState([])
  const nav = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function get() {
      const response = await getUsers(page, 40);
      setUsers(response?.data?.data)
    }
    get()
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
                   <div>{user?.name?.at(0).toUpperCase() + user?.lastname?.at(0)}</div>
                   <p>{user?.name + user?.lastname}</p>
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
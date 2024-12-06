import { useNavigate } from 'react-router-dom';
import './index.css'
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader'
import AOS from 'aos';
export default function Notify() {

  const notifications = [
    {
      id: 1,
      type: "comment",
      userInfo: {
        name: "José",
        latname: "Carvalho",
      },
      created_at: new Date().toLocaleDateString(),
      viewed: false,
      postid: 1,
    },
    {
      id: 1,
      type: "post",
      userInfo: {
        name: "Miguel",
        latname: "Otávio",
      },
      created_at: new Date().toLocaleDateString(),
      viewed: true,
      postid: 2,
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
   <section id="notifications">
     {isLoad ? (
       <Loader />
     ) : (
       <>
         {" "}
         <h1>Notificações</h1>
         {notifications?.length > 0 &&
           Array.isArray(notifications) &&
           notifications.map((notify) => (
             <figure
               key={notify.id}
               data-aos="fade-left"
               style={{
                 backgroundColor:
                   !notify.viewed && "rgba(255, 255, 255, 0.115)",
               }}
             >
               <div>
                 {notify.userInfo.name?.at(0).toUpperCase() +
                   notify.userInfo.latname?.at(0).toUpperCase()}
               </div>
               <p>{notify.userInfo.name + " " + notify.userInfo.latname}</p>
               <i>{notify.created_at}</i>
               <p>
                 {notify.type == "comment"
                   ? "Comentou na sua publicação"
                   : "Fez uma nova publicação"}
               </p>
               <button
                 style={{
                   backgroundColor: notify.viewed && "var(--blue)",
                 }}
                 onClick={() => {
                   nav("/postDetails");
                   console.log(notify.postid);
                 }}
               >
                 {notify.viewed ? "Visto" : "Ver"}
               </button>
             </figure>
           ))}
       </>
     )}
   </section>
 );
}
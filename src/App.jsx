/* eslint-disable react-hooks/exhaustive-deps */
import { Link , Outlet, useNavigate} from "react-router-dom";
import "./App.css";
import logo from './assets/logo.png'
import { FaUsers, FaComment, FaUser, FaHome } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { isLogged } from "./services/acount";
export function App() {
  const [active, setActive] = useState(0)
    useEffect(() => {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: false,
        offset: 150,
      });
      async function isLog() {
        const is = await isLogged();

        if(is){
          console.log(is)
          return
        }else{
          localStorage.clear()
          sessionStorage.clear()
          nav("/login")
          return
        }
      }
      setInterval(() => {
        isLog()
      }, 5000)
      
    }, []);
  const nav = useNavigate()
  const navigations = [
    {
      title: "Inicial",
      path: "/",
      icon: <FaHome />,
    },
    {
      title: "Pessoas",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      title: "Postagens",
      path: "/posts",
      icon: <FaComment />,
    },

    {
      title: "Meu Perfil",
      path: "/userProfile",
      icon: <FaUser />,
    },
    {
      title: "Configurações",
      path: "/acount",
      icon: <LuSettings />,
    }
  ];
  return (
    <main id="app">
      <ToastContainer
        style={{
          zIndex: "999999999999999999999999999999999",
        }}
      ></ToastContainer>
      <div id="logo">
        <img src={logo} alt="logo" onClick={()=>{
          nav("/")
        }}/>
      </div>
      <nav id="navBar">
        <img src={logo} alt="logo" />
        <ol>
          {navigations.map((nav, index) => (
            <Link
              to={nav.path}
              style={{
                color: active == index && "var(--green)",
                opacity: active == index && 1,
              }}
              key={index}
              onClick={() => {
                if (index == 3) {
                  sessionStorage.clear();
                }
                window.scrollTo({
                  behavior: "smooth",
                  left: 0,
                  top: -10000000000,
                });
                setActive(index);
              }}
            >
              {nav.icon}
              <p>{nav.title}</p>
            </Link>
          ))}
        </ol>
        <button
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            nav("/login");
          }}
        >
          Sair
        </button>
      </nav>
      <section>
        <Outlet />
      </section>

      <nav id="mobilenav">
        <ol>
          {navigations.map((nav, index) => (
            <Link
              to={nav.path}
              style={{
                color: active == index && "var(--pink)",
                opacity: active == index ? 1 : 0.6
              }}
              key={index}
              onClick={() => {
                if (index == 3) {
                  sessionStorage.clear();
                }
                window.scrollTo({
                  behavior: "smooth",
                  left: 0,
                  top: -10000000000,
                });
                setActive(index);
              }}
            >
              {nav.icon}
            </Link>
          ))}
        </ol>
      </nav>
    </main>
  );
}

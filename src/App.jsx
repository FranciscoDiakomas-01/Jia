/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";
import Loader from "./components/Loader";
import { FaUsers, FaComment, FaUser, FaHome } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";
import Login from "./pages/Login";
import "aos/dist/aos.css";
import { isLogged } from "./services/acount";
export function App() {

  const [active, setActive] = useState(0);
  const [logged, setLogged] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    
    setIsLoad(true)
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 150,
    });
    async function isLog() {
      const is = isLogged();
      if (is) {
        setLogged(prev => true);
        return;
      } else {
        setLogged(prev => false);
        if (String(window.location.pathname).includes("singin")) {
          return;
        }
        nav("/login");

        return;
      }
    }
    isLog();
    setTimeout(() => {
      setIsLoad(false);
    }, 400);
    setInterval(() => {
      isLog();
    }, 100000);
  }, []);


  const nav = useNavigate();
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
    },
  ];
  return (
    <main id="app">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          { logged ? (
            <>
              <ToastContainer
                style={{
                  zIndex: "999999999999999999999999999999999",
                }}
              ></ToastContainer>
              <div id="logo">
                <img
                  src={logo}
                  alt="logo"
                  onClick={() => {
                    nav("/");
                  }}
                />
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
                    return
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
                        opacity: active == index ? 1 : 0.6,
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
            </>
          ) : (
            <Login />
          )}
        </>
      )}
    </main>
  );
}

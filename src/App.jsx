import { Link , Outlet, useNavigate} from "react-router-dom";
import "./App.css";
import logo from './assets/logo.png'
import { FaUsers, FaComment, FaUser, FaHome, FaBell } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
export function App() {
  const [active, setActive] = useState(0)
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
    },
    {
      title: "Notificações",
      path: "/notifications",
      icon: <FaBell />,
    },
  ];
  return (
    <main id="app">
      <ToastContainer
        style={{
          zIndex: "999999999999999999999999999999999",
        }}
      ></ToastContainer>
      <div id="logo">
        <span >
          <FaBell onClick={()=>{
            nav("/notifications");
          }}/>
          <sup>10</sup>
        </span>
        <img src={logo} alt="logo" />
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
              {index == navigations.length - 1 && <sup>2</sup>}
              {nav.icon}
              <p>{nav.title}</p>
            </Link>
          ))}
        </ol>
        <button
          onClick={() => {
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
                opacity: active == index ? 1 : 0.6,
                display : index == navigations.length - 1 && "none"
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

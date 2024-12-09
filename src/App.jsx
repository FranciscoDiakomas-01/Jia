import { Link , Outlet, useNavigate} from "react-router-dom";
import "./App.css";
import logo from './assets/logo.png'
import { FaUsers, FaComment, FaBell, FaUser } from "react-icons/fa";
import { BsUiChecksGrid } from "react-icons/bs";
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
      icon: <BsUiChecksGrid />,
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
      title: "Notificações",
      path: "/notifications",
      icon: <FaBell />,
    },
    {
      title: "Configurações",
      path: "/acount",
      icon: <LuSettings />,
    },
  ];
  return (
    <main id="app">
      <ToastContainer></ToastContainer>
      <nav>
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
        <button onClick={() => {
          nav("/login")
        }}>Sair</button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

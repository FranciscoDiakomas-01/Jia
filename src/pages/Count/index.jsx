import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { FiLock } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
export default function Acount() {
  const [isLoad, setLoad] = useState(true);
  const [active, setActive] = useState(0);
  useEffect(() => {
    setLoad(true);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 150,
    });
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  return (
    <article id="createPost">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <nav>
            <button
              style={{
                color: active == 0 && "var(--green)",
                opacity: active == 0 && 1,
              }}
              onClick={() => {
                setActive(0);
              }}
            >
              Meus Dados
            </button>
            <button
              style={{
                color: active == 1 && "var(--green)",
                opacity: active == 1 && 1,
              }}
              onClick={() => {
                setActive(1);
              }}
            >
              Minha Senha
            </button>
          </nav>

          {active == 0 ? (
            <form data-aos="fade-left">
              <div>
                <FaRegUser />
                <label htmlFor="name">Nome</label>
                <input id="name" placeholder="Entre com o seu nome" required />
              </div>
              <div>
                <FaRegUser />
                <label htmlFor="lastname">Sobrenome</label>
                <input
                  id="lastname"
                  placeholder="Entre com o seu sobrenome"
                  required
                />
              </div>
              <div>
                <IoText />
                <label htmlFor="bio">Biografia</label>
                <input id="bio" placeholder="Entre com o sua biografia" />
              </div>
              <div>
                <MdOutlineAttachEmail />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  placeholder="Entre com o seu email"
                  required
                  type="email"
                />
              </div>
              <div>
                <FiLock />
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  placeholder="Entre com o sua senha"
                  type="password"
                  required
                />
              </div>
              <button>Salvar Alterações</button>
            </form>
          ) : (
            <form data-aos="fade-left">
              <div>
                <FiLock />
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  placeholder="Entre com o sua senha"
                  type="password"
                  required
                />
              </div>{" "}
              <div>
                <FiLock />
                <label htmlFor="newPass">Nova Senha</label>
                <input
                  id="newPass"
                  placeholder="Entre com o sua senha"
                  type="password"
                  required
                />
              </div>
              <button>Salvar Alterações</button>
            </form>
          )}
        </>
      )}
    </article>
  );
}

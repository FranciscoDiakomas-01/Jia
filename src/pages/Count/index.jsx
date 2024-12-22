import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { FiLock } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserbyId} from '../../services/users'
import { MdOutlineAttachEmail } from "react-icons/md";
import { updateMyProfile } from "../../services/acount.js";
export default function Acount() {
  const [isLoad, setLoad] = useState(true);
  const [active, setActive] = useState(0);
  const [user , setUser] = useState()
  const [reset, setResest] = useState({
    email : "",
    password : "",
    newPassword : ""
  })
  useEffect(() => {
    async function get() {
      const data = await getUserbyId(localStorage.getItem("uuid"));
      setUser(data?.data)
    }
    get()
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
  useEffect(()=>{
    setResest({
      email: "",
      password: "",
      newPassword: "",
    });
  },[active])
  return (
    <article id="acount">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <nav>
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
          </nav>

          {active == 0 ? (
            <form data-aos="fade-left" onSubmit={async(e)=>{
              e.preventDefault()

              const body = {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                bio: user.bio,
              };
              const response = await updateMyProfile(body)
              console.log(response)
            }}>
              <div>
                <FaRegUser />
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  placeholder="Entre com o seu nome"
                  required
                  value={user.name}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
              </div>
              <div>
                <FaRegUser />
                <label htmlFor="lastname">Sobrenome</label>
                <input
                  id="lastname"
                  placeholder="Entre com o seu sobrenome"
                  required
                  value={user.lastname}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, lastname: e.target.value }));
                  }}
                />
              </div>
              <div>
                <IoText />
                <label htmlFor="bio">Biografia</label>
                <input
                  id="bio"
                  placeholder="Entre com o sua biografia"
                  value={user.bio}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, bio: e.target.value }));
                  }}
                />
              </div>
              <div>
                <MdOutlineAttachEmail />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  placeholder="Entre com o seu email"
                  required
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, email: e.target.value }));
                  }}
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
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, password: e.target.value }));
                  }}
                />
              </div>
              <button>Salvar Alterações</button>
            </form>
          ) : (
            <form data-aos="fade-left">
              <div>
                <MdOutlineAttachEmail />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  placeholder="Entre com o seu email"
                  required
                  type="email"
                  value={reset?.email}
                  onChange={(e) => {
                    setResest((prev) => ({ ...prev, email: e.target.value }));
                  }}
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
                  value={reset?.password}
                  onChange={(e) => {
                    setResest((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <FiLock />
                <label htmlFor="newPass">Nova Senha</label>
                <input
                  id="newPass"
                  placeholder="Entre com o sua senha"
                  type="password"
                  required
                  value={reset?.newPassword}
                  onChange={(e) => {
                    setResest((prev) => ({ ...prev, newPassword: e.target.value }));
                  }}
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

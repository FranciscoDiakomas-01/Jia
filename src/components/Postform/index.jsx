import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function PostForm() {
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate()
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
          <FaArrowLeft
            onClick={() => {
              nav("/posts");
            }}
          />
          <form data-aos="fade-left">
            <label htmlFor="title">Título</label>
            <input id="title" placeholder="Título da publicação" />
            <label htmlFor="link">Link da midia</label>
            <input
              id="link"
              placeholder="Inclua uma midia , imagem , video (opcional)"
            />
            <label htmlFor="desc">Descrição</label>
            <textarea name="desc" placeholder="Oque estás a pensar?"></textarea>
            <button>Publicar</button>
          </form>
        </>
      )}
    </article>
  );
}

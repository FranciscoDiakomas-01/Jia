/* eslint-disable no-unused-vars */
import "./index.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createPost } from "../../services/posts";
export default function PostForm() {
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate()
  const [name, setName] = useState("");
  const [isAdding , setAdd] = useState(false)
  const [description, setDescription] = useState("");
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  
  return (
    <article id="createPost">
      <ToastContainer style={{
        zIndex : '999999999999999999999999999999'
      }}/>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <FaArrowLeft
            onClick={() => {
              nav("/posts");
            }}
          />
          <form
            data-aos="fade-left"
            onSubmit={async(e) => {
              e.preventDefault();
              if (!name || !description) {
                setAdd(false)
                toast.error("Prencha todos os Campos!", {theme : 'dark' , position : 'bottom-right'})
                return
              } else {
                const body = {
                  title: name,
                  text: description,
                };
                setName(prev => "")
                setDescription(prev => "")
                setAdd(true)
                const response = await createPost(body)
                if (response) {
                   toast.success("Publicado com sucesso!", {
                     theme: "dark"
                   });
                  setTimeout(() => {
                    setAdd(false)
                  }, 2000)
                  return
                } else {
                  setAdd(false);
                  toast.error("Erro ao cadastrar", {
                    theme: "dark",
                    position: "bottom-right",
                  });
                  return;
                }
              }
            }}
          >
            <label htmlFor="title">Título</label>
            <input
              id="title"
              value={name}
              placeholder="Título da publicação"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="desc">Descrição</label>
            <textarea
              value={description}
              name="desc"
              placeholder="Oque estás a pensar?"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <button
              disabled={isAdding ? true : false}
              style={{
                opacity: isAdding && "0.3",
              }}
            >
                {!isAdding ? <p>Publicar</p> : <div>
                  <span></span>
                </div>}
            </button>
          </form>
        </>
      )}
    </article>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {updatePost , getPostById } from "../../services/posts";
export default function PostEditForm() {
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate()
  const [name, setName] = useState("");
  const [isAdding , setAdd] = useState(false)
  const [description, setDescription] = useState("");
  const postid = sessionStorage.getItem("postid")
  useEffect(() => {
    setLoad(true);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 150,
    });
     async function getData() {
       const response = await getPostById(postid);
       setName(response?.data.data.posttitle);
       setDescription(response?.data.data.posttext);
     }
     getData()
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  
  return (
    <article id="createPost">
      <ToastContainer
        style={{
          zIndex: "999999999999999999999999999999",
        }}
      />
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <FaArrowLeft
            onClick={() => {
              history.back()
            }}
          />
          <form
            data-aos="fade-left"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!name || !description) {
                setAdd(false);
                toast.error("Prencha todos os Campos!", {
                  theme: "dark",
                  position: "bottom-right",
                });
                return;
              } else {
                const body = {
                  title: name,
                  text: description,
                  postid: postid,
                };
                setAdd(true);
                const response = await updatePost(body);
                if (response) {
                  toast.success("Alterado com sucesso!", {
                    theme: "dark",
                  });
                  setTimeout(() => {
                    setAdd(false);
                    history.back()
                  }, 2000);
                  return;
                } else {
                  setAdd(false);
                  toast.error("Erro ao Alterar", {
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
              {!isAdding ? (
                <p>Publicar</p>
              ) : (
                <div>
                  <span></span>
                </div>
              )}
            </button>
          </form>
        </>
      )}
    </article>
  );
}

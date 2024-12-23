/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import { updatecommetnById } from "../../services/comment";
import { toast, ToastContainer } from "react-toastify";

export default function CommentEditForm({ close, text }) {
    
  const [comment, setComment] = useState(text);
  const  commentid = sessionStorage.getItem("commentid")
  async function updateComment() {
    if (comment == text) {
        close(false)
      return "no changes";
    }
    if (String(comment).length == 0) {
      return false;
    } else {
      console.log(commentid)
      const body = {
        text: comment,
      };
      const api = await updatecommetnById(commentid , body);
      if(api){
        setTimeout(()=>{
            close(false)
        },1000)
        return
      }else{
        toast.error("Erro ao alterar", {theme : 'dark'})
      }
    }
  }

  return (
    <div id="EditComment">
      <ToastContainer style={{ zIndex: "9999999999999999999999" }} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateComment();
        }}
      >
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
        >
          {comment}
        </textarea>
        <button>{text == comment ? "Cancelar" : "Salvar"}</button>
      </form>
    </div>
  );
}

/* eslint-disable no-unused-vars */
import './index.css'
import logo from '../../assets/logo.png'
import {  useState } from 'react';
import { login } from '../../services/login';
import { useNavigate } from 'react-router-dom';
export default function Login() {
const [email , setEmail] = useState("")
const [password, setPassowrd] = useState("");
const [isLoading, setIsLoading] = useState(false)
const nav = useNavigate()
 return (
   <section id="login">
     <form
       onSubmit={async (e) => {
         e.preventDefault();
         const response = await login(email, password);
         if (response == false) {
            document.getElementById("response").textContent ="Email ou a senha é inválida";
             return
         }
         
         setIsLoading((prev) => true);
         if (response?.data == "sucess") {
           localStorage.clear()
           localStorage.setItem("token" , response?.token)
           localStorage.setItem("uuid", response?.id);
           setTimeout(() => {
             setIsLoading((prev) => false);
             setTimeout(() => {
               nav("/");
             }, 1000);
           }, 2000);
         } else {
           setTimeout(() => {
             setIsLoading((prev) => false);
            document.getElementById("response").textContent = "";
           }, 3000);
           return;
         }
       }}
     >
       <img src={logo} />
       <label>Email</label>
       <input
         type="email"
         required
         autoFocus
         value={email}
         placeholder="exeplo@gmail.com"
         style={{
           outline: email.length == "" && "solid 1px var(--pink)",
         }}
         onChange={(e) => {
           document.getElementById("response").textContent ="";
           setEmail((prev) => e.target.value);
         }}
       />
       <label>Senha</label>
       <input
         style={{
           outline: password.length == "" && "solid 1px var(--pink)",
         }}
         value={password}
         onChange={(e) => {
           document.getElementById("response").textContent = "";
           setPassowrd((prev) => e.target.value);
         }}
         type="password"
         required
         placeholder="sua senha"
       />
       <button
         disabled={!isLoading ? false : true}
         style={{
           opacity: !isLoading ? 1 : 0.2,
         }}
       >
         {!isLoading ? (
           <p>Entrar</p>
         ) : (
           <div>
             <span></span>
           </div>
         )}
       </button>
        <p id="response"></p>
       <a onClick={()=>{
        nav("/singin")
       }}>Ainda não tens uma conta ? criar.</a>
     </form>
   </section>
 );
}
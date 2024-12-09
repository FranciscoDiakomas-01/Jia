/* eslint-disable no-unused-vars */
import './index.css'
import logo from '../../assets/logo.png'
import { useState } from 'react';
import { login, singn, validateEmail } from '../../services/login';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
const [email , setEmail] = useState("")
const [password, setPassowrd] = useState("");
const [name, setName] = useState("");
const [lastname, setLastname] = useState("");
const [isLoading, setIsLoading] = useState(false)
const [step , setStep]  = useState(1)
const nav = useNavigate()
 return (
   <section id="login">
     <form
       onSubmit={async (e) => {
         //check Steps
         e.preventDefault();
         if (step == 1) {
           if (name?.length >= 2 && lastname?.length >= 2) {
             setStep(2);
             return;
           } else {
             document.getElementById("response").textContent =
               "Nome & Sobrenome devem conter mais de 1 caracteres";
           }
         } else if (step == 2) {
           if (validateEmail(email) && password?.length >= 8) {
             setIsLoading(true);
             const response = await singn(email, password, name, lastname);
             if (response?.data == "created") {
               setTimeout(() => {
                 setIsLoading((prev) => false);
                 
                 localStorage.clear()
                 localStorage.setItem("token", response?.token)
                 localStorage.setItem("uuid", response?.id);
                 setTimeout(() => {
                   nav("/");
                 }, 1000);
               }, 2000);
             } else {
                 document.getElementById("response").textContent = "Este email esta em uso tente outro";
                 setName(prev => "")
                 setEmail(prev => "")
                 setLastname(prev => "")
                 setPassowrd(prev => "")
                 setTimeout(() => {
                     setStep(prev => 1)
                 }, 1500);
                 return
             }
             return;
           } else {
             document.getElementById("response").textContent = "Sua senha ou email é inválida";
           }
         }
       }}
     >
       <img src={logo} />
       <aside>{step}</aside>
       {step == 1 ? (
         <article>
           <label>Nome</label>
           <input
             type="text"
             required
             value={name}
             placeholder="Entre com o seu nome"
             style={{
               outline: name.length == "" && "solid 1px var(--pink)",
             }}
             onChange={(e) => {
               document.getElementById("response").textContent = "";
               setName((prev) => e.target.value);
             }}
           />
           <label>Sobrenome</label>
           <input
             style={{
               outline: lastname.length == "" && "solid 1px var(--pink)",
             }}
             value={lastname}
             onChange={(e) => {
               document.getElementById("response").textContent = "";
               setLastname((prev) => e.target.value);
             }}
             type="text"
             required
             placeholder="Entre com o seu sobrenome"
           />
         </article>
       ) : (
         <article>
           <label>Email</label>
           <input
             type="email"
             required
             value={email}
             placeholder="Entre com o seu email"
             style={{
               outline: email.length == "" && "solid 1px var(--pink)",
             }}
             onChange={(e) => {
               document.getElementById("response").textContent = "";
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
             type="text"
             required
             placeholder="Entre com a sua senha"
           />
         </article>
       )}

       <button
         disabled={!isLoading ? false : true}
         style={{
           opacity: !isLoading ? 1 : 0.2,
         }}
       >
         {isLoading ? (
           <div>
             <span></span>
           </div>
         ) : (
           <>{step == 1 ? <p>Seguinte</p> : <p>Criar conta</p>}</>
         )}
       </button>
       <p id="response"></p>
       <a
         onClick={() => {
           nav("/login");
         }}
       >
         Já tens uma conta ? entrar.
       </a>
     </form>
   </section>
 );
}
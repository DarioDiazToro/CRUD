
 import modalHtml from './render-modal.html?raw';
 import './render-modal.css';
 import { User } from '../../models/users';
 import { getUserById } from '../../uses-cases/get-user-by-id';
import { saveUser } from '../../uses-cases/save-user';
  

 export let modal, form,mensaje,mensajeDos;
 let loadedUser = {};




  export const showModal = async(id)=>{
    modal?.classList.remove("hide-modal");
    if(!id) return;
    loadedUser = {};
    const user = await getUserById(id);
     setFormValues(user);
   };

   export const hideModal =()=>{
     modal?.classList.add("hide-modal");
     form?.reset();
     mensaje.innerHTML = "";
     mensajeDos.innerHTML = "";
   };

   /**
    * 
    * @param {User} user 
    */
   const setFormValues = (user)=>{
     form.querySelector('[name="firstName"]').value = user.firstName;
     form.querySelector('[name="lastName"]').value = user.lastName;
     form.querySelector('[name="balance"]').value = user.balance;
     form.querySelector('[name="isActive"]').checked = user.isActive;

     loadedUser = user;

   };

 /**
  * @param {HTMLDivElement} element
  * @param {{userLike}=>Promise<void>} callback
  */

  
 export const renderModal = (element,callback)=>{

    if(modal) return;

    modal = document.createElement("div");
    modal.innerHTML  = modalHtml;
    modal.className = "container-modal hide-modal";
    element.append(modal);
    form = modal.querySelector("form");
    mensaje = modal.querySelector(".parrafo-uno");
    mensajeDos = modal.querySelector(".parrafo-dos");

    
    modal.addEventListener("click",(event)=>{
         if(event.target.className !== "container-modal") return;
          hideModal();
    });   

    form.addEventListener("submit",async(event)=>{
       event.preventDefault();

       const formData = new FormData(form);
       const userLike = {...loadedUser};

       for(const [key,value] of formData){
        
        if(key === "balance"){
            userLike[key] = Number(value);
          continue;
        };
        if(key === "isActive"){
           userLike[key] = (value === "on")?true:false;
          continue;
        };
          userLike[key] = value;

       };

        if(userLike["firstName"] === ""){
            mensaje.innerHTML = "por favor llenar este campo";
           return;
        };
       mensaje.innerHTML = "";

       if( Number(userLike["firstName"])){
            mensaje.innerHTML = "no se permiten numeros";
            return;
       };
       mensaje.innerHTML = "";

       if(userLike["lastName"] === ""){
          mensajeDos.innerHTML = "por favor llenar este campo";
           return;
         };
       mensajeDos.innerHTML = "";


      if( Number(userLike["lastName"])){
        mensajeDos.innerHTML = "no se permiten numeros";
           return;
       };
       mensajeDos.innerHTML = "";

      //  console.log(userLike);

      // changeProperty(userLike);

        //TODO: guardar Usuario
       await  callback(userLike);
        hideModal();
    });

    element.append(modal);
    // changeProperty();
 };




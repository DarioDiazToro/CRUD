
 import {   showModal } from '../render-modal/render-modal';
 import './render-add-button.css';


 /**
  * 
  * @param {HTMLDivElement} element 
  */
 export const renderAddButton =(element)=>{

    const floatingButton = document.createElement("button");
     floatingButton.innerText = "+";
     floatingButton.classList.add("float-button");
     element.append(floatingButton);

    floatingButton.addEventListener("click",()=>{
        showModal();
    });
 };




 import usersStore, { state } from "../../store/users-store";
import { renderTable } from "../render-table/renderTable";
   import "./render-buttons.css";

 /**
  * 
  * @param {HTMLDivElement} element 
  */

 export const renderButtons =(element)=>{

    const nextButton = document.createElement("button");
         nextButton.innerHTML = " Next >";

    const previousButton = document.createElement("button");
         previousButton.innerHTML = " < previous";

    const currentPageLabel = document.createElement("span");
       currentPageLabel.id = "current-page";
       currentPageLabel.innerText = usersStore.getCurrentPage();

       element.append(previousButton,currentPageLabel,nextButton);

       nextButton.addEventListener("click",async()=>{
          await usersStore.loadNextPage();
          currentPageLabel.innerText = usersStore.getCurrentPage();
           renderTable(element);
       });

       previousButton.addEventListener("click",async()=>{    
           await usersStore.loadPreviusPage();          
          currentPageLabel.innerText = usersStore.getCurrentPage();
          renderTable(element);
       });
 };


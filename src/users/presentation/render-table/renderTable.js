import usersStore from "../../store/users-store";
import { deleteUserById } from "../../uses-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import './renderTable.css';

let table;
 const createTable = ()=>{
    const table = document.createElement("table");
    const tableHeaders = document.createElement("thead");
    tableHeaders.innerHTML = `
                   <tr> 
                      <th>#ID</th>
                      <th>Balance</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Active</th>
                      <th>Actions</th>
                   </tr>
     `
     const tableBody = document.createElement("tbody");
      table.append(tableBody,tableHeaders);
      return table;
 };

  /**
   * 
   * @param {MouseEvent} event 
   * @returns 
   */
 const tableSelectListener = async(event)=>{

   const element = event.target.closest(".select-id");
   if(!element) return;

   const id = element.getAttribute("data-id");
    showModal(id);
 };

 const tableDeleteListener = async(event)=>{
   const element = event.target.closest(".deleted-id");
   if(!element) return;

   const id = element.getAttribute("data-id");
     try {
      await deleteUserById(id);
      await usersStore.reloadPage();
      document.querySelector("#current-page").innerText = usersStore.getCurrentPage();
      renderTable();
   } catch (error) {
      console.log(error);
    alert("No se pudo eliminar");
   };
 };


 /**
  * 
  * @param {HTMLDivElement} element 
  */

 export const renderTable =  (element)=>{

    const users =  usersStore.getUsers();

    if(!table){
        table = createTable();
        element.append(table)

        // TODO: listeners de la tabla
       table.addEventListener("click", (event) =>tableSelectListener(event));
       table.addEventListener("click",(event) =>tableDeleteListener(event))
    };

    let tableHTML = "";
    users.forEach((user)=>{

        tableHTML +=`
       <tr> 
         <td>${user.id}</td>
         <td>${user.balance}</td>
         <td>${user.firstName}</td>
         <td>${user.lastName}</td>
         <td>${user.isActive}</td>
         <td>
           <a href ="#/" class="select-id" data-id="${user.id}">Select <a/>
           <a href ="#/" class="deleted-id" data-id="${user.id}">Delete <a/>
         </td>
      </tr>
        `
    });

    table.querySelector("tbody").innerHTML = tableHTML;
 };
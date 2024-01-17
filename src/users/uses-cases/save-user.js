 import { localhostUserToModel } from "../mappers/user-localhost.mapper";
 import { userModelTolocalHost } from "../mappers/user-to-localhost.mapper";
 import { User } from "../models/users";
 import modalHtml from '../presentation/render-modal/render-modal.html?raw';
 import { modal } from "../presentation/render-modal/render-modal";
import usersStore from "../store/users-store";



 /**
  * 
  * @param {Like<User>} userLike 
  */
export const saveUser = async(userLike)=>{
       const user = new User(userLike);
      
       const userToSave = userModelTolocalHost(user);
       let userUpdated;
       
       if(user.id){
        userUpdated = await updateUser(userToSave);

       }else{
         userUpdated = await createUser(userToSave);
      };




      return localhostUserToModel(userUpdated);
 };


  /**
   * 
   * @param {Like<User>} user 
   */
 export const createUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;
 };


 
  /**
   * 
   * @param {Like<User>} user 
   */
  export const updateUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL }/users/${user.id}`;
    const res = await fetch(url,{
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const updatedUser = await res.json();

    return updatedUser;
 };



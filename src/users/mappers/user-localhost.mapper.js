import { User } from "../models/users";

 /**
  * 
  * @param {Like<User>} localhosterUser 
  * @returns {User}
  */
  export const localhostUserToModel = (localhosterUser)=>{
     const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,

     } = localhosterUser;

    return new  User({
        avatar,
        balance,
        firstName:first_name,
        gender,
        id,
        isActive,
        lastName:last_name,
    });
  };
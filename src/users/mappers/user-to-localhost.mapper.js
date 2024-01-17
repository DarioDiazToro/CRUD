
 import {User} from "../models/users"
/**
 * 
 * @param {User} user 
 */

 export const userModelTolocalHost =(user)=>{

    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName
    } = user;

    return {
        avatar,
        balance,
        first_name:firstName,
        gender,
        id,
        isActive,
        last_name:lastName
      }
 };
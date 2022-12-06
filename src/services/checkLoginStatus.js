import {  getLocal } from './localStorage';

export const checkLoginStatus = () => {
    let currentUser = getLocal('account');
    console.log(currentUser)
    return currentUser !== null;
}
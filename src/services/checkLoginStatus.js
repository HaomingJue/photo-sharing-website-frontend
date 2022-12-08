import {  getLocal } from './localStorage';

export const checkLoginStatus = () => {
    let currentUser = getLocal('account');
    return currentUser !== null;
}
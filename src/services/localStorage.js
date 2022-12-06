export const getLocal = () => {
    return JSON.parse(localStorage.getItem('account'));
}

export const setLocal = (username) => {
    localStorage.setItem('account', JSON.stringify(username));
}

export const clearLocal = () => {
    localStorage.removeItem('account');
}
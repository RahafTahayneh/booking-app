export const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    window.location.reload();
}
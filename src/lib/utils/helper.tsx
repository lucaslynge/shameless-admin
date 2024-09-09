export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
};
export const getUser:any = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user');
    }
    return null;
};
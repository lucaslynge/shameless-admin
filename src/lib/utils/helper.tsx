import dateFormat from 'dateformat'
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

export const dateFormated:any=(date:any)=>{
  return dateFormat(date,'dd-mm-yyyy')
}
 
export const convertImageUrlToBlob=async(imageUrl:any)=>{
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error('Failed to fetch image');
  return await response.blob();
}
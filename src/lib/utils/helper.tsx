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

export const generateSlug=(text: string)=>{
  return text?.toLowerCase() // Convert to lowercase
    ?.replace(/[^a-z0-9\s-]/g, "") // Remove special characters (keep letters, numbers, spaces, and hyphens)
    ?.trim() // Trim whitespace from both ends
    ?.replace(/\s+/g, "-") // Replace spaces with hyphens
    ?.replace(/-+/g, "-"); // Replace multiple hyphens with a single one
}
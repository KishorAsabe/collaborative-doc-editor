// Function to check if the user is authenticated
export const checkAuthentication = () => {

  const token = localStorage.getItem("authToken");
  
  return !!token;
};

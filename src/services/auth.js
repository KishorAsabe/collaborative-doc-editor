
// Function to check if the user is authenticated
export const checkAuthentication = () => {
    // Assuming you have a token stored in localStorage
    const token = localStorage.getItem("authToken");
  
    // If a token is present, consider the user authenticated
    return !!token;
  };
  
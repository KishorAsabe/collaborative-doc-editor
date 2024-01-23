const API_BASE_URL = "http://localhost:3001";

export const signup = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();

    console.log("SIGNUP API RESPONSE............", responseData);
    if (!responseData) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();

    console.log("LOGIN API RESPONSE............", responseData);

    if (responseData.success) {
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userData", JSON.stringify(responseData.user));
    } else {
      throw new Error(responseData.message); 
    }
  } catch (error) {
    console.error("Error during login API call:", error.message);
    throw error;
  }
};

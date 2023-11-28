import { api } from "../utils/config";

//register user

const registerUser = async (user) => {
  try {
    const response = await api.post("/users/register", user);

    if (response.data._id) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const loginUser = async (user) => {
  try {
    const response = await api.post("/users/login", user);

    if (response.data._id) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

export const authService = {
  registerUser,
  loginUser,
  logoutUser,
};

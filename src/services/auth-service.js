import { API } from "./urls";

export const login = async (platform, email, pwd) => {
  try {
    let response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
      body: JSON.stringify({
        email,
        password: pwd,
      }),
    });

    let json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const register = async (platform, newUser) => {
  try {
    let response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
      body: JSON.stringify(newUser),
    });

    let json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

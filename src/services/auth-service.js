import { LOGIN_API, USER_REGISTER_API } from "./urls";

export const login = async (platform, email, pwd) => {
  try {
    let response = await fetch(LOGIN_API, {
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
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const register = async (platform, newUser) => {
  try {
    let response = await fetch(USER_REGISTER_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
      body: JSON.stringify(newUser),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

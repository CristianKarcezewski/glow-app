import { GET_USER_BY_ID } from "./urls";
import { UPDATE_USER } from "./urls";

export const getUserById = async (platform, authorization, userId) => {
  try {
    let response = await fetch(GET_USER_BY_ID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (platform, authorization, user) => {
   console.log("Update Teste", user);
  try {
    let response = await fetch(UPDATE_USER, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(user),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};
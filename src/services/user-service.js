import { GET_USER_BY_ID } from "./urls";

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

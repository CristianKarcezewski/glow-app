import { USER_ADDRESSES } from "./urls";

export const loadUserAddresses = async (platform, authorization) => {
  try {
    let response = await fetch(USER_ADDRESSES, {
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

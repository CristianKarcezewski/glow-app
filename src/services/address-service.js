import { USER_ADDRESSES, REGISTER_ADDRESS } from "./urls";

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

export const registerAddress = async (platform, authorization, address) => {
  try {
    let response = await fetch(REGISTER_ADDRESS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(address),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

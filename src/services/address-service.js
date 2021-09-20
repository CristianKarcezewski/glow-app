import {
  USER_ADDRESSES,
  REGISTER_USER_ADDRESS,
  UPDATE_ADDRESS,
  REMOVE_USER_ADDRESS,
} from "./urls";

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

export const registerUserAddress = async (platform, authorization, address) => {
  try {
    let response = await fetch(REGISTER_USER_ADDRESS, {
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

export const updateAddress = async (platform, authorization, address) => {
  try {
    let response = await fetch(UPDATE_ADDRESS, {
      method: "PUT",
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

export const removeUserAddress = async (platform, authorization, addressId) => {
  try {
    let response = await fetch(`${REMOVE_USER_ADDRESS}/${addressId}`, {
      method: "DELETE",
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

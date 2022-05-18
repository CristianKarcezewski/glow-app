import {
  GET_ADDRESS_USER,
  GET_ADDRESS_COMPANY,
  REGISTER_USER_ADDRESS,
  REGISTER_COMPANY_ADDRESS,
  UPDATE_ADDRESS,
  REMOVE_USER_ADDRESS,
  REMOVE_COMPANY_ADDRESS,
  FIND_BY_GEOLOCATION,
} from "./urls";

export const loadUserAddresses = async (platform, authorization) => {
  try {
    let response = await fetch(GET_ADDRESS_USER, {
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

export const loadCompanyAddresses = async (platform, authorization) => {
  try {
    console.log("LoadCompanyaddress");
    let response = await fetch(GET_ADDRESS_COMPANY, {
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
export const registerCompanyAddress = async (
  platform,
  authorization,
  address
) => {
  try {
    let response = await fetch(REGISTER_COMPANY_ADDRESS, {
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

export const removeCompanyAddress = async (
  platform,
  authorization,
  addressId
) => {
  try {
    let response = await fetch(`${REMOVE_COMPANY_ADDRESS}/${addressId}`, {
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

export const findAddressByGeolocation = async (
  platform,
  authorization,
  address
) => {
  try {
    let response = await fetch(FIND_BY_GEOLOCATION, {
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

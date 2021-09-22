import { 
  PROVIDER_GET_ALL,
  PROVIDER_REGISTER,
  PROVIDER_GET_BY_ID
  } from "./urls";

export const registerProvider = async (platform, authorization, address) => {
  try {
    let response = await fetch(PROVIDER_REGISTER, {
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
export const getAllProvider = async (platform) => {
  try {
    let response = await fetch(PROVIDER_GET_ALL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};
export const getProviderById = async (platform, authorization, providerId) => {
  try {
    let response = await fetch(`${PROVIDER_GET_BY_ID}/${providerId}`, {
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

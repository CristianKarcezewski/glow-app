import {
  PROVIDER_REGISTER,
  GET_COMPANY_BY_USER,
  UPDATE_PROVIDER,
  SEARCH_PROVIDER,
} from "./urls";

export const getCompanyByUser = async (platform, authorization) => {
  try {
    let response = await fetch(GET_COMPANY_BY_USER, {
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

export const registerProvider = async (platform, authorization, provider) => {
  try {
    let response = await fetch(PROVIDER_REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(provider),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const updateProvider = async (platform, authorization, provider) => {
  try {
    let response = await fetch(UPDATE_PROVIDER, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(provider),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const searchProvider = async (platform, authorization, filter) => {
  try {
    let response = await fetch(SEARCH_PROVIDER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(filter),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

import { PROVIDER_REGISTER, GET_COMPANY_BY_USER } from "./urls";

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

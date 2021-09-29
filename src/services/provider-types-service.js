import { GET_PROVIDER_TYPES } from "./urls";

export const getProviderTypes = async (platform) => {
  try {
    let response = await fetch(GET_PROVIDER_TYPES, {
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

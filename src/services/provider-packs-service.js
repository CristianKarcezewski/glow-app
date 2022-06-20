import { GET_PROVIDER_PACKS } from "./urls";

export const getProviderPacks = async (platform, authorization) => {
  try {
    let response = await fetch(GET_PROVIDER_PACKS, {
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
